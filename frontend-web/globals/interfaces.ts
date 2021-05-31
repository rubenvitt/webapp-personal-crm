import { SVGProps } from "react";

export interface NavElement {
  href?: string;
  onClick?: () => void;
  name: string;
  active?: boolean;
  current?: boolean;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface Navigation {
  sidebarNav: NavElement[];
  userNav: NavElement[];
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
  title: string;
  color: { bg: string; text: string };
}
