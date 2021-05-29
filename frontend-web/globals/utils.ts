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

export const calculateTimespanSince = (
  duration: TimespanDuration,
  type: TimespanType = TimespanType.ACCURATE
) => {
  const dur =
    (duration.end ? Date.parse(duration.end) : new Date().getTime()) -
    Date.parse(duration.start);

  switch (type) {
    case TimespanType.INACCURATE:
      if (dur < 1000) {
        const number = Math.floor(dur);
        return `${number} Millisekunde${number !== 1 ? "n" : ""}`;
      } else if (dur < 60000) {
        const number = Math.floor(dur / 1000);
        return `${number} Sekunde${number !== 1 ? "n" : ""}`;
      } else if (dur < 3600000) {
        const number = Math.floor(dur / 60000);
        return `${number} Minute${number !== 1 ? "n" : ""}`;
      } else if (dur < 86400000) {
        const number = Math.floor(dur / 3600000);
        return `${number} Stunde${number !== 1 ? "n" : ""}`;
      } else if (dur < 604800000) {
        const number = Math.floor(dur / 86400000);
        return `${number} Tag${number !== 1 ? "e" : ""}`;
      } else if (dur < 31536000000) {
        const number = Math.floor(dur / 604800000);
        return `${number} Woche${number !== 1 ? "n" : ""}`;
      } else {
        const number = Math.floor(dur / 31536000000);
        return `${number} Jahr${number !== 1 ? "e" : ""}`;
      }
    case TimespanType.ACCURATE:
      break;
  }
};
