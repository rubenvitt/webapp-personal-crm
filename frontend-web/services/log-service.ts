import { useQuery } from "react-query";
import { IdOnly, LogEntry, LogEntryType } from "../global/interfaces";

const entries: LogEntry[] = [
  {
    _id: "0",
    type: LogEntryType.meet,
    label: "Essengehen",
    description: "Ich bin mit denen Essen gegangen",
    dateTimeBegin: "2021-05-26T11:00:00",
    dateTimeEnd: "2021-05-26T11:00:00",
    people: ["001-test", "002-test"],
  },
  {
    _id: "1",
    type: LogEntryType.meet,
    label: "Essengehen",
    description: "Ich bin mit denen Essen gegangen",
    dateTimeBegin: "2021-05-26T11:00:00",
    dateTimeEnd: "2021-05-26T11:00:00",
    people: ["001-test"],
  },
];

export const findAllLogItems: () => Promise<LogEntry[]> = () => {
  return new Promise<LogEntry[]>((resolve) => {
    setTimeout(() => resolve(entries), 100);
  });
};

export const findLogItemsFor: (aPersonId: string) => Promise<LogEntry[]> = (
  aPersonId
) => {
  return new Promise<LogEntry[]>((resolve) =>
    setTimeout(() => {
      resolve(
        entries
          .filter((value) => value.people.find((a) => a === aPersonId))
          .map((value) => ({
            ...value,
            people: value.people.filter((value1) => value1 !== aPersonId),
          }))
      );
    }, 100)
  );
};

export const useLogEntry: (aPerson?: IdOnly) => {
  logEntries: LogEntry[];
} = (person) => {
  const { data: entries } = useQuery(
    ["/api/log-entries", person?._id].filter((value) => value),
    () => {
      if (person) return findLogItemsFor(person._id);
      else return findAllLogItems();
    }
  );

  return {
    logEntries: entries,
  };
};
