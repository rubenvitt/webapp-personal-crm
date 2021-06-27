export enum Month {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12,
}

export function nameFor(aMonth: Month) {
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

export function daysFor(aMonth: Month) {
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
