"use strict";

const resourceFromAbsolutePath = require("../../../../server/resource-from-absolute-path");
const dirContents = require("./dir-contents");
const path = require("path");

const marked = require("marked");
marked.setOptions({
  langPrefix: "line-numbers language-",
});

const CodeSSR = require("../code.js");

class MarkdownSSR extends CodeSSR {
  inlines = {
    jsBlocks: false,
    jsTutor: false,
    parsons: false,
    mermaid: false,
    quiz: false,
    tests: false,
    literate: false,
  };
  constructor({ config, resource }) {
    super({ config, resource });

    this.content = resource.content;
    this.inlines.jsBlocks = /^(([ \t]*`{3,4})([js|javascript])([\s\S]+?)(^[ \t]*\2))/gim.test(
      this.content
    );
    this.inlines.jsTutor = /(<!--[ \t]*tutor[ \t]*-->)/gim.test(this.content);
    this.inlines.parsons = /(<!--[ \t]*parsons[ \t]*-->)/gim.test(this.content);
    // https://github.com/regexhq/gfm-code-block-regex/blob/master/index.js
    this.inlines.mermaid = /^(([ \t]*`{3,4})(mermaid)([\s\S]+?)(^[ \t]*\2))/gim.test(
      this.content
    );
    this.inlines.quiz = false; // not yet

    const base = this.resource.info.base.toLowerCase();
    this.inlines.tests = /.test./i.test(base) || /.spec./i.test(base);
    this.inlines.literate = /.js.md$/i.test(base);

    this.config.inlines = this.inlines;
  }

  styles() {
    let superStyles = super.styles();

    superStyles += `<link rel="stylesheet" href="${this.config.sharedStatic}/gh-styles.css">`;
    if (this.inlines.jsBlocks) {
      superStyles += ` <link rel="stylesheet" href="${this.config.sharedStatic}/prism/style.css">`;
    }
    return superStyles;
  }

  scriptsHead() {
    let superScriptsHead = super.scriptsHead();

    if (this.inlines.jsBlocks) {
      superScriptsHead += `<script src='${this.config.sharedStatic}/prettier/standalone.js'></script>
      <script src='${this.config.sharedStatic}/prettier/parser-babel.js'></script>
      <script src='${this.config.sharedStatic}/wc-code-along.js'></script>`;
    }
    return superScriptsHead;
  }

  configOptions() {
    return "";
  }

  panel() {
    return "";
  }

  async code() {
    let content = this.content;
    const dirRegex = /(<!--[ \t]*begin[ \t]*dir[ \t]*-->)([\s\S]*)(<!--[ \t]*end[ \t]*dir[ \t]*-->)/gim;
    if (dirRegex.test(content)) {
      const absolutePath = path.join(
        this.resource.info.root,
        this.resource.info.dir
      );
      console.log(absolutePath);
      const virtualDirectory = await resourceFromAbsolutePath({
        absolutePath,
        cwd: this.resource.info.root,
        localConfigs: this.config.locals,
      });
      const thisFile = path.join(
        this.resource.info.root,
        this.resource.info.dir,
        this.resource.info.base
      );
      virtualDirectory.content.children = virtualDirectory.content.children.filter(
        (i) => path.join(i.root, i.dir, i.base) !== thisFile
      );
      const dirToc = dirContents({
        dirElement: virtualDirectory.content,
        top: true,
        defaults: this.config.locals,
      });
      content = content.replace(
        dirRegex,
        `<!-- BEGIN DIR -->\n<ul style="list-style-type: none;">${dirToc}</ul>\n<!-- END DIR -->`
      );
    }

    if (this.inlines.mermaid) {
      content = content.replace(
        /```mermaid([\s\S]*?)```/gim,
        (_, mermaidGraph) => `<div class="mermaid">${mermaidGraph}</div>`
      );
    }

    return `<hr><hr>
    <main class="markdown-body">${marked(content)}</main>`;
  }

  scriptsBody() {
    let superScriptsBody = super.scriptsBody();
    if (this.inlines.jsBlocks) {
      superScriptsBody += `<script src='${this.config.sharedStatic}/lib/strip-comments.js'></script>
      <script src="${this.config.sharedStatic}/prism/script.js" data-manual></script>
      <script src="${this.config.sharedStatic}/prism/toolbar.js"></script>`;
    }

    if (this.inlines.parsons) {
      superScriptsBody += `<script src="${this.config.sharedStatic}/parsonizer/component.js"></script>
      <script src="${this.config.sharedStatic}/parsonizer/jquery.min.js"></script>
      <script src="${this.config.sharedStatic}/parsonizer/lis.js"></script>
      <script src="${this.config.sharedStatic}/parsonizer/jquery-ui.min.js"></script>
      <script src="${this.config.sharedStatic}/parsonizer/jquery.ui.touch-punch.min.js"></script>
      <script src="${this.config.sharedStatic}/parsonizer/parsons.js"></script>`;
    }

    if (this.inlines.tests) {
      superScriptsBody += `<script src='${this.config.ownStatic}/dependencies/describe-it.js'></script>
      <script>
        define('chai',
          ["${this.config.ownStatic}/dependencies/chai-and-chai-dom.js"],
          function (require, exports, beta) {
            return require;
          }
        );
      </script>`;
    }

    if (this.inlines.mermaid) {
      superScriptsBody += `<script src='${this.config.sharedStatic}/mermaid/index.js'></script>`;
    }

    return superScriptsBody;
  }
}

module.exports = MarkdownSSR;