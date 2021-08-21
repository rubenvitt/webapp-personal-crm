/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
import { isProduction } from "./utils";

const cssBefore = [
  "border-radius: 1em",
  "padding: 3px",
  "padding-left: 6px",
  "margin-right: 6px",
];
const cssAfter = ["color: black"];

export const Logger = {
  isDebug: !isProduction,
  log: (message?: any, ...optionalParams: any[]) => {
    if (!isProduction)
      console.log(
        "%cDEBUG: %c" + message,
        cssBefore.concat("background: green", "color: white").join(";"),
        cssAfter.join(";"),
        ...optionalParams
      );
  },
  error: (message?: any, ...optionalParams: any[]) => {
    console.log(
      "%cERROR: %c" + message,
      cssBefore.concat("background: red", "color: white").join(";"),
      cssAfter.join(";"),
      ...optionalParams
    );
  },
  warning: (message?: any, ...optionalParams: any[]) => {
    if (!isProduction)
      console.log(
        "%cWARNING: %c" + message,
        cssBefore.concat("background: orange", "color: white").join(";"),
        cssAfter.join(";"),
        ...optionalParams
      );
  },
  tagged: (tag: string, message?: any, ...optionalParams: any[]) => {
    if (!isProduction)
      console.log(
        `%c${tag}: %c${message}`,
        cssBefore.concat("background: blue", "color: white").join(";"),
        cssAfter.join(";"),
        ...optionalParams
      );
  },
};
