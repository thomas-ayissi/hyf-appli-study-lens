// "use strict";

const studyWithEval = (debug) => (code) => {
  if (typeof code !== "string") {
    // this should never happen, but just in case ....
    throw new TypeError("code is not a string");
  }
  // const trimmedFirstLine = code.trim().split("\n")[0].trim();
  // const firstLineIsUseStrict = /^['|"]use strict['|"]/.test(trimmedFirstLine);
  // const stricted =
  //   !firstLineIsUseStrict && debug
  //     ? "'use strict'; // you forgot ;) \n\n" + code
  //     : !firstLineIsUseStrict && !debug
  //     ? "'use strict'; /* you forgot ;) */  " + code
  //     : e;
  // const finalCode = debug ? "debugger;\n\n" + stricted : stricted;
  const finalCode = debug
    ? "/* ------------------------ */ debugger;\n\n\n\n\n" +
      code +
      "\n\n\n\n/* ------------------------ */ debugger;"
    : code;

  let evaller = document.getElementById("evaller");
  if (evaller !== null) {
    document.body.removeChild(evaller);
  }

  evaller = document.createElement("iframe");
  evaller.style.display = "none";
  evaller.id = "evaller";

  evaller.onload = () => {
    const script = document.createElement("script");

    script.innerHTML = finalCode;

    if (config.locals.type === "module") {
      script.type = "module";
    } else if (config.locals.strict) {
      script.innerHTML = `'use strict';\neval(decodeURI(\`${encodeURI(
        script.innerHTML
      )}\`));`;
    }

    evaller.contentDocument.body.appendChild(script);
  };
  document.body.appendChild(evaller);
};

export const studyWith = {
  console: studyWithEval(false),
  debugger: studyWithEval(true),
  jsTutorLive: function (code) {
    const encodedJST = encodeURIComponent(code);
    const sanitizedJST = this.utils.sanitize(encodedJST);
    const jsTutorURL =
      "http://www.pythontutor.com/live.html#code=" +
      sanitizedJST +
      "&cumulative=false&curInstr=2&heapPrimitives=false&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false";
    window.open(jsTutorURL, "_blank");
  },
  jsTutor: function (code) {
    const encodedJST = encodeURIComponent(code);
    const sanitizedJST = this.utils.sanitize(encodedJST);
    const jsTutorURL =
      "http://www.pythontutor.com/visualize.html#code=" +
      sanitizedJST +
      "&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false";
    window.open(jsTutorURL, "_blank");
  },
  loupe: function (code) {
    const encoded = encodeURIComponent(btoa(code));
    const loupeURL = "http://latentflip.com/loupe/?code=" + encoded + "!!!";
    window.open(loupeURL, "_blank");
  },
  promisees: function (code) {
    const encoded = encodeURIComponent(code).replace(/%20/g, "+");
    const URL = "https://bevacqua.github.io/promisees/#code=" + encoded;
    window.open(URL, "_blank");
  },
  esprima: function (code) {
    const encoded = encodeURIComponent(code);
    const URL = "https://esprima.org/demo/parse.html?code=" + encoded;
    window.open(URL, "_blank");
  },
  flowchart: function (code) {
    const lenseConfig = {
      code,
      ext: ".js",
    };
    const queryValue = encodeURIComponent(JSON.stringify(lenseConfig));
    const query = `?flowchart=${queryValue}`;
    const url = window.location.origin + query;
    window.open(url, "_blank");
  },
  utils: {
    sanitize: (str) =>
      str.replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%09/g, "%20%20"),
    // large code, to be initialized when needed. ie. babel
    compressToBase64: null,
  },
};
