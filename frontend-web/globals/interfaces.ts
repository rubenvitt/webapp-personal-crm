import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";

export interface NavElement {
  href?: string;
  onClick?: () => void;
  name: string;
  active?: boolean;
  current?: boolean;
  icon?: IconDefinition;
}

export interface Navigation {
  sidebarNav: NavElement[];
  userNav: NavElement[];
  addItemsNav: NavElement[];
  footerNav: NavElement[];
  setSidebarCurrent: (path: string) => void;
}

export interface User {
  name: string;
  email: string;
  imageUrl: string;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  notification?: string;
}

export interface PersonDetails extends Person {
  groups: PersonTag[];
  birthday?: string;
  anrede: Anrede;
  lastContact: string;
}

export enum LogEntryType {
  phone,
  meet,
  chat,
}

export interface LogEntry {
  id: string;
  label: string;
  description: string;
  type: LogEntryType;
  dateTimeBegin: string;
  dateTimeEnd: string;
  people: string[];
}

export enum Anrede {
  MASCULINE,
  FEMININE,
  NEUTRAL,
}

export interface TimespanDuration {
  start: string;
  end?: string;
}

export enum TimespanType {
  INACCURATE,
  ACCURATE,
}

export enum ActionType {
  DANGER,
  WARNING,
  DEFAULT,
  INFO,
  ARCHIVE,
  PRIMARY,
}

export interface PersonTag {
  id: string;
  title: string;
  color: { bg: string; text: string };
}

export interface Note {
  id: number;
  name?: string;
  date: string;
  imageId?: string;
  body: string;
}
