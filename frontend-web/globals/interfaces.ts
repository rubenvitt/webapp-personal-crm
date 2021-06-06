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

export enum PhoneType {
  MOBILE,
  MOBILE_PRIVATE,
  MOBILE_WORK,
  PHONE,
  PHONE_PRIVATE,
  PHONE_WORK,
  CUSTOM,
}

export enum MailType {
  PRIVATE,
  WORK,
  CUSTOM,
}

export enum AddressType {
  PRIVATE,
  WORK,
  CUSTOM,
}

export interface PersonCommunicationChannel {
  value: string | unknown;
  customType?: string;
  id: string;
  type: PhoneType | MailType | AddressType | unknown;
}

export interface PersonPhone extends PersonCommunicationChannel {
  type: PhoneType;
}

export interface PersonMail extends PersonCommunicationChannel {
  type: MailType;
}

export interface Address {
  street: string;
  zip: string;
  city: string;
  country: string;
}

export interface PersonAddress extends PersonCommunicationChannel {
  value: Address;
  type: AddressType;
}

export interface Person {
  id: string;
  displayName: string;
  primaryMail: PersonMail;
  primaryPhone: PersonPhone;
  imageUrl?: string;
  notification?: string;
}

export interface PersonDetails extends Person {
  groups: PersonTag[];
  birthday?: string;
  anrede: Anrede;
  lastContact: string;
  mails: PersonMail[];
  phones: PersonPhone[];
  addresses: PersonAddress[];
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
  SUCCESS,
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
