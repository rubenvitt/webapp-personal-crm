import { ActionType, TimespanDuration, TimespanType } from "./interfaces";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getPronounFor = (anAnrede: string, aGender: string) => {
  if (anAnrede) return anAnrede;
  switch (aGender) {
    case "masculine":
    case "m":
      return "Er";
    case "feminine":
    case "f":
      return "Sie";
    default:
      return "Diese Person";
  }
};

export const getColorForType = (type: ActionType) => {
  switch (type) {
    case ActionType.DANGER:
      return "red";
    case ActionType.WARNING:
      return "yellow";
    case ActionType.DEFAULT:
    case ActionType.PRIMARY:
    case ActionType.INFO:
      return "blue";
    case ActionType.ARCHIVE:
      return "gray";
    case ActionType.SUCCESS:
      return "green";
  }
};

export const calculateDaysBetween = (aDuration: TimespanDuration) => {
  const start = Date.parse(aDuration.start);
  const end = Date.parse(aDuration.end) ?? Date.now();

  return Math.floor(end / 86400000) - Math.floor(start / 86400000);
};

interface TimespanProps {
  duration: TimespanDuration;
  type?: TimespanType;
  prefix?: string;
  unit?:
    | "years"
    | "weeks"
    | "days"
    | "hours"
    | "minutes"
    | "seconds"
    | "milliseconds";
}

export const calculateTimespanSince = ({
  duration,
  type = TimespanType.INACCURATE,
  prefix = "",
  unit,
}: TimespanProps) => {
  const dur =
    (duration.end ? Date.parse(duration.end) : new Date().getTime()) -
    Date.parse(duration.start);

  if (unit === "milliseconds" || (!unit && dur < 1000)) {
    const number = Math.floor(dur);
    if (type === TimespanType.INACCURATE) return "Gerade eben";
    return `${prefix}${number}${
      !unit ? ` Millisekunde${number !== 1 ? "n" : ""}` : ""
    }`;
  } else if (unit === "seconds" || (!unit && dur < 60000)) {
    const number = Math.floor(dur / 1000);
    if (type === TimespanType.INACCURATE) return "Gerade eben";
    return `${prefix}${number}${
      !unit ? ` Sekunde${number !== 1 ? "n" : ""}` : ""
    }`;
  } else if (unit === "minutes" || (!unit && dur < 3600000)) {
    const number = Math.floor(dur / 60000);
    return `${prefix}${number}${
      !unit ? ` Minute${number !== 1 ? "n" : ""}` : ""
    }`;
  } else if (unit === "hours" || (!unit && dur < 86400000)) {
    const number = Math.floor(dur / 3600000);
    return `${prefix}${number}${
      !unit ? ` Stunde${number !== 1 ? "n" : ""}` : ""
    }`;
  } else if (unit === "days" || (!unit && dur < 604800000)) {
    const number = Math.floor(dur / 86400000);
    return `${prefix}${number}${!unit ? ` Tag${number !== 1 ? "e" : ""}` : ""}`;
  } else if (unit === "weeks" || (!unit && dur < 31536000000)) {
    const number = Math.floor(dur / 604800000);
    return `${prefix}${number}${
      !unit ? ` Woche${number !== 1 ? "n" : ""}` : ""
    }`;
  } else {
    const number = Math.floor(dur / 31536000000);
    return `${prefix}${number}${
      !unit ? ` Jahr${number !== 1 ? "e" : ""}` : ""
    }`;
  }
};
