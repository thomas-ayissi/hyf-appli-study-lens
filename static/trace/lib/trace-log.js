"use strict";

import { state } from "../data/state.js";
import { config } from "../data/config.js";
import { deepClone } from "./deep-clone.js";

const linePrefix = (line, col = null) => {
  state.loggedSteps += 1;

  let prefix = "";

  // const scopeDepth = Array(state.scopes.length + 1).join("  ");
  // prefix = scopeDepth + prefix;

  if (config.lines) {
    const lineNumberString = line < 10 ? " " + line : "" + line;
    const colNumberString = col < 10 ? col + " " : "" + col;
    prefix =
      `line ${lineNumberString}:${
        typeof col === "number" ? colNumberString : ""
      } -` + prefix;
  }

  if (config.steps) {
    const stepNumberString =
      state.loggedSteps < 10 ? " " + state.loggedSteps : "" + state.loggedSteps;
    prefix = `${stepNumberString}. ` + prefix;
  }

  return "%c" + prefix;
};

export const print = ({ logs = [], prefix, out = console.log, style = "" }) => {
  logs = logs.map((thing) =>
    typeof thing === "function"
      ? 'a function named "' + thing.name + '"'
      : deepClone(thing)
  );
  if (typeof prefix === "number") {
    out(linePrefix(prefix), style || "", ...logs);
  } else if (Array.isArray(prefix)) {
    out(linePrefix(...prefix), style || "", ...logs);
  } else if (typeof prefix === "string") {
    out("%c" + prefix, style || "", ...logs);
  } else if (typeof prefix === "function") {
    const finalPrefix = prefix(linePrefix);
    out(finalPrefix, style || "", ...logs);
  } else {
    out(...logs);
  }
};