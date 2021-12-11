"use strict";

const fs = require("fs");
const path = require("path");

const util = require("util");
const readFilePromise = util.promisify(fs.readFile);
const readDirPromise = util.promisify(fs.readdir);

const marked = require("marked");

const renderStepped = async (resource, config) => {
  const name = resource.info.base.replace(/-./g, (x) => x[1].toUpperCase());

  const basePath = path.join(
    resource.info.root,
    resource.info.dir,
    resource.info.base
  );

  let jsDoc;
  const jsDocPath = path.join(basePath, "jsdoc.js");
  if (fs.existsSync(jsDocPath)) {
    jsDoc = await readFilePromise(jsDocPath, "utf-8");
  }

  let readme = null;
  const readmePath = path.join(basePath, "README.md");
  if (fs.existsSync(readmePath)) {
    readme = await readFilePromise(readmePath, "utf-8");
  }

  let renderedReadme = "";
  if (readme !== null) {
    marked.setOptions({
      baseUrl: `./${`${resource.info.dir}/${resource.info.base}`
        .split(path.sep)
        .join("/")}`,
      langPrefix: "line-numbers language-",
    });

    renderedReadme = `<div class='markdown-body'>${marked(readme)}</div>`;
  }

  const steps = [];
  const stepsPath = path.join(basePath);
  if (fs.existsSync(stepsPath) && fs.lstatSync(stepsPath).isDirectory()) {
    const stepFileNames = await readDirPromise(stepsPath);
    const stepCodes = await Promise.all(
      stepFileNames.map((fileName) =>
        readFilePromise(path.join(stepsPath, fileName), "utf-8")
      )
    );
    stepFileNames
      .filter((fileName) => fileName.endsWith(".js"))
      .forEach((fileName, index) => {
        const name = fileName
          .replace(/-./g, (x) => x[1].toUpperCase())
          .replace(".js", "");
        steps.unshift({
          fileName,
          name,
          code: stepCodes[index].split("__name__").join(name),
        });
      });
  }

  steps.reverse();

  const steppercise = {
    name,
    // https://dev.to/mattkenefick/snippets-in-javascript-converting-pascalcase-to-kebab-case-36ed
    folderName: name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    jsDoc,
    readme,
    steps,
    log: `./${resource.info.base}/log.js`.split(path.sep).join("/"),
    locals: config.locals,
  };

  return `
<!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" data-name="vs/editor/editor.main" href="${
      config.sharedStatic
    }/monaco/min/vs/editor/editor.main.css">

    <script src="${config.sharedStatic}/prettier/standalone.js"></script>
    <script src="${config.sharedStatic}/prettier/parser-babel.js"></script>
    <script type="module">
      import { walk } from "${config.sharedStatic}/estree-walker/index.js";
      window.walk = walk;
    </script>
    <script src="${config.sharedStatic}/astravel.min.js"></script>

    <script src='${config.sharedStatic}/parsonizer/jquery.min.js'></script>
    <script src='${config.sharedStatic}/parsonizer/jquery-ui.min.js'></script>
    <script src='${
      config.sharedStatic
    }/wc-trace-table/configurable-button.js' type='module'></script>

    <script type='module' src='${
      config.sharedComponents
    }/run-it/index.js'></script>

    <script type='module' src='${
      config.sharedComponents
    }/open-in/index.js'></script>

    <script type='module' src='${
      config.sharedComponents
    }/lens-it/index.js'></script>

    <script type='module' src='${
      config.sharedStatic
    }/ask/component/ask-me.js'></script>
    </head>

    <!-- <script src="${
      config.sharedStatic
    }/prism/script.js" data-manual></script>
    <script src="${config.sharedStatic}/prism/toolbar.js"></script> -->
  <body>
    ${renderedReadme}
    <hr>
    <div style='display: flex; flex-direction: row;'>
      ${config.locals.save ? `<button id='save-button'>save</button> ||` : ""}
      <div id='step-buttons' style='display: flex; flex-direction: row;'>
        ${steppercise.steps
          .map(
            (step) =>
              `<button class='step-button' id='${steppercise.steps.indexOf(
                step
              )}'>${step.fileName}</button>`
          )
          .join("")}
      </div>
      <!-- for now no adding new steps from the browser -->
      <!-- <button id='new-step-button'>+</button> -->
    </div>
    <hr>
    <div style='display: flex; flex-direction: row;'>
      <button id='format-button'>format</button>
      <text style='padding-left: 0.25em; padding-right: 0.25em;'>||</text>
      <lens-it id="lens-it-el" buttons="highlight, parsons, variables, flowchart, blanks, study"></lens-it>
    </div>
    <div style='display: flex; flex-direction: row;'>
      <run-it id='run-it-button'
        ${config.locals.run && config.locals.run.debug ? "debug" : ""}
        ${
          config.locals.run && config.locals.run.type === "module"
            ? "module"
            : ""
        }
        ${
          config.locals.run && config.locals.run.text
            ? `text="${config.locals.run.text}"`
            : ""
        }
        ${
          config.locals.run &&
          config.locals.run.loopGuard &&
          config.locals.run.loopGuard.active
            ? "loop-guard"
            : ""
        }
      ></run-it>
      <trace-it event></trace-it>
      <trace-table-button ${config.locals.table || ""}></trace-table-button>
      <ask-me></ask-me>
      ${config.locals.openIn ? "<open-in id='open-in-button'></open-in>" : ""}
    </div>
    <div id='docs-container'></div>
    <hr>
    <div id='editor-container' style='height: 95vh'></div>
    <script type='module'>
      window.config = JSON.parse(decodeURI("${encodeURI(
        JSON.stringify(steppercise)
      )}"));
    </script>



    <script>var require = { paths: { 'vs': '${
      config.sharedStatic
    }/monaco/min/vs' } };</script>
    <script src="${config.sharedStatic}/monaco/min/vs/loader.js"></script>
    <script src="${
      config.sharedStatic
    }/monaco/min/vs/editor/editor.main.nls.js"></script>
    <script src="${
      config.sharedStatic
    }/monaco/min/vs/editor/editor.main.js"></script>

    <script src='${config.sharedStatic}/lib/monaco-ext-to-language.js'></script>

    <script src='${config.sharedStatic}/trace/aran-build.js'></script>
    <script src='${config.sharedStatic}/trace/index.js' type='module'></script>
    <script src='${
      config.sharedStatic
    }/trace/trace-init.js' type='module'></script>


    <script type='module' src='${config.ownStatic}/init.js'></script>
  </body>
</html>`;
};

module.exports = renderStepped;