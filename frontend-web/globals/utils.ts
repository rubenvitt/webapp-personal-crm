import { Anrede, TimespanDuration, TimespanType } from "./interfaces";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getPronounFor = (anAnrede: Anrede) => {
  switch (anAnrede) {
    case Anrede.MASCULINE:
      return "Er";
    case Anrede.FEMININE:
      return "Sie";
    case Anrede.NEUTRAL:
      return "Diese Person";
  }
};

export const calculateDaysBetween = (aDuration: TimespanDuration) => {
  const start = Date.parse(aDuration.start);
  const end = Date.parse(aDuration.end) ?? Date.now();

  return Math.floor(end / 86400000) - Math.floor(start / 86400000);
};

export const calculateTimespanSince = (
  duration: TimespanDuration,
  type: TimespanType = TimespanType.INACCURATE,
  prefix = ""
) => {
  const dur =
    (duration.end ? Date.parse(duration.end) : new Date().getTime()) -
    Date.parse(duration.start);

  if (dur < 1000) {
    const number = Math.floor(dur);
    if (type === TimespanType.INACCURATE) return "Gerade eben";
    return `${prefix} ${number} Millisekunde${number !== 1 ? "n" : ""}`;
  } else if (dur < 60000) {
    const number = Math.floor(dur / 1000);
    if (type === TimespanType.INACCURATE) return "Gerade eben";
    return `${prefix} ${number} Sekunde${number !== 1 ? "n" : ""}`;
  } else if (dur < 3600000) {
    const number = Math.floor(dur / 60000);
    return `${prefix} ${number} Minute${number !== 1 ? "n" : ""}`;
  } else if (dur < 86400000) {
    const number = Math.floor(dur / 3600000);
    return `${prefix} ${number} Stunde${number !== 1 ? "n" : ""}`;
  } else if (dur < 604800000) {
    const number = Math.floor(dur / 86400000);
    return `${prefix} ${number} Tag${number !== 1 ? "e" : ""}`;
  } else if (dur < 31536000000) {
    const number = Math.floor(dur / 604800000);
    return `${prefix} ${number} Woche${number !== 1 ? "n" : ""}`;
  } else {
    const number = Math.floor(dur / 31536000000);
    return `${prefix} ${number} Jahr${number !== 1 ? "e" : ""}`;
  }
};
