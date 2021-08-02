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
      return "date.month.january";
    case Month.FEBRUARY:
      return "date.month.february";
    case Month.MARCH:
      return "date.month.march";
    case Month.APRIL:
      return "date.month.april";
    case Month.MAY:
      return "date.month.may";
    case Month.JUNE:
      return "date.month.june";
    case Month.JULY:
      return "date.month.july";
    case Month.AUGUST:
      return "date.month.august";
    case Month.SEPTEMBER:
      return "date.month.september";
    case Month.OCTOBER:
      return "date.month.october";
    case Month.NOVEMBER:
      return "date.month.november";
    case Month.DECEMBER:
      return "date.month.december";
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
