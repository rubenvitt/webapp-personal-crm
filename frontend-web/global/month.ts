export enum Month {
  JANUARY = 0,
  FEBRUARY = 1,
  MARCH = 2,
  APRIL = 3,
  MAY = 4,
  JUNE = 5,
  JULY = 6,
  AUGUST = 7,
  SEPTEMBER = 8,
  OCTOBER = 9,
  NOVEMBER = 10,
  DECEMBER = 11,
}

export function nameFor(aMonth: Month): string {
  switch (aMonth) {
    case Month.JANUARY:
      return "Januar";
    case Month.FEBRUARY:
      return "Februar";
    case Month.MARCH:
      return "März";
    case Month.APRIL:
      return "April";
    case Month.MAY:
      return "Mai";
    case Month.JUNE:
      return "Juni";
    case Month.JULY:
      return "Juli";
    case Month.AUGUST:
      return "August";
    case Month.SEPTEMBER:
      return "September";
    case Month.OCTOBER:
      return "Oktober";
    case Month.NOVEMBER:
      return "November";
    case Month.DECEMBER:
      return "Dezember";
  }
}

export function daysFor(aMonth: Month): number {
  switch (aMonth) {
    case Month.JANUARY:
    case Month.MARCH:
    case Month.MAY:
    case Month.JULY:
    case Month.AUGUST:
    case Month.OCTOBER:
    case Month.DECEMBER:
      return 31;
    case Month.FEBRUARY:
      return 29;
    case Month.APRIL:
    case Month.JUNE:
    case Month.SEPTEMBER:
    case Month.NOVEMBER:
      return 30;
  }
}
