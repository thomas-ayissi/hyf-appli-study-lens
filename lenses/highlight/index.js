const highlightLense = async ({ resource, config }) => {
  resource.content = `
<!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="${config.sharedStatic}/prism/style.css">
  </head>
  <body>

    ${
      config.locals.annotate === false
        ? ""
        : `<link rel="stylesheet" href="${config.ownStatic}/sketch-style.css">
        <button id="clear">Clear canvas</button>
        <button id="undo">Undo</button>
        <button id="redo">Redo</button>
        <br />
        <button id="white" class="color">White</button>
        <button id="red" class="color">Red</button>
        <button id="green" class="color">Green</button>
        <button id="blue" class="color">Blue</button>
        <button id="orange" class="color">Orange</button>`
    }
    ${
      (config.locals.run || config.locals.eval) && resource.info.ext === ".js"
        ? `
    <button style="float: right;" onclick="eval(decodeURIComponent(\`${encodeURIComponent(
      resource.content
    )}\`))">run</button>`
        : ""
    }
    ${
      (config.locals.debug || config.locals.eval) && resource.info.ext === ".js"
        ? `
    <button style="float: right;" onclick="eval('debugger; \n\n'+decodeURIComponent(\`${encodeURIComponent(
      resource.content
    )}\`))">run</button>`
        : ""
    }
    ${
      config.locals.flowchart && resource.info.ext === ".js"
        ? `
    <button style="float: right;" onclick="openWith(\`${encodeURIComponent(
      resource.content
    )}\`, 'flowchart')">flowchart</button>`
        : ""
    }
    ${
      config.locals.diff && resource.info.ext === ".js"
        ? `
    <button style="float: right;" onclick="openWith(\`${encodeURIComponent(
      resource.content
    )}\`, 'diff')">diff</button>`
        : ""
    }

    <div id="container">
      <div id="code-container" class="stacked">
        <pre><code id='code-goes-here' class="line-numbers language-${
          typeof resource.content === "object"
            ? "json"
            : resource.info.ext.split(".").join("")
        }"></code></pre>
      </div>
      <div id="canvas-container" class="stacked"><canvas id="cfd"></canvas></div>
    </div>

    <script>
      var code = decodeURIComponent("${encodeURIComponent(
        typeof resource.content === "object"
          ? JSON.stringify(resource.content, null, "  ")
          : resource.content
      )}");
      var config = JSON.parse(decodeURIComponent("${encodeURIComponent(
        JSON.stringify(config)
      )}"));


    </script>
    <!-- <script src='${config.ownStatic}/init.js'></script> -->

    <script src="${config.sharedStatic}/prism/script.js"></script>
    <script src="${config.sharedStatic}/prism/toolbar.js"></script>
    <script>
      // https://stackoverflow.com/a/24631113
      function escapeHTML(string) {
        var pre = document.createElement('pre');
        var text = document.createTextNode(string);
        pre.appendChild(text);
        return pre.innerHTML;
      }


      const codeGoesHere = document.getElementById('code-goes-here')
      codeGoesHere.innerHTML = escapeHTML(code)
      Prism.highlightAllUnder(codeGoesHere.parentElement);

    </script>


    ${
      config.locals.annotate === false
        ? ""
        : `<script src="${config.ownStatic}/cfd.js"></script>
    <script src="${config.ownStatic}/sketch-script.js"></script>`
    }

    <script src="${config.ownStatic}/open-with.js"></script>

  </body>
</html>`;
  resource.info.ext = ".html";

  return {
    resource,
  };
};

module.exports = highlightLense;
