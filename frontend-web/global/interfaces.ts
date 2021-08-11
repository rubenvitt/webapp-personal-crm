import { UserProfile } from "@auth0/nextjs-auth0";
import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { AppMetadata, Role, UserMetadata } from "auth0";

export interface NavElement {
  href?: string;
  onClick?: () => void;
  name: string;
  active?: boolean;
  icon?: IconDefinition;
}

export interface Navigation {
  sidebarNav: NavElement[];
  userNav: NavElement[];
  addItemsNav: NavElement[];
  footerNav: NavElement[];
}

export type AvailableOnboardingStep = "setup" | "plans" | "general" | "consent";

export interface OnboardingStep {
  step: AvailableOnboardingStep;
  dateTime: string;
  data: unknown;
}

export interface UserAppMetadata extends AppMetadata {
  onboarding: {
    completed: OnboardingStep[];
  };
}

export interface UserUserMetadata extends UserMetadata {
  dav: {
    user: { iv: string; content: string };
    pass: { iv: string; content: string };
  };
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
  _id: string;
  type: PhoneType | MailType | AddressType | unknown;
}

export type CreateElement<T> = Omit<T, "_id">;

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

export interface RichName {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  displayName: string;
}

export interface Gendered {
  gender?: string;
  anrede: string;
}

export interface Birthdayed {
  birthday: Birthday;
}

export interface CreatePerson extends RichName, Gendered, Birthdayed {}

export interface UpdatePerson extends CreatePerson, IdOnly {}

export interface IdOnly {
  _id: string;
}

export interface Person extends IdOnly {
  displayName: string;
  primaryMail: PersonMail;
  primaryPhone: PersonPhone;
  imageUrl?: string;
  notification?: string;
}

export interface ContactInfos {
  mail: PersonMail[];
  phone: PersonPhone[];
  address: PersonAddress[];
}

export interface PersonDetails extends Person, RichName, Gendered, Birthdayed {
  isFavorite: boolean;
  groups: PersonTag[];
  lastContact: string;
  contact: ContactInfos;
}

export enum DateType {
  EXACT = "EXACT",
  MONTH_DAY = "MONTH_DAY",
  YEAR_MONTH = "YEAR_MONTH",
  AGE = "AGE",
  UNKNOWN = "UNKNOWN",
}

export interface Birthday {
  dateType: DateType;
  dateValue?: string;
}

export enum LogEntryType {
  phone,
  meet,
  chat,
}

export interface LogEntry {
  _id: string;
  label: string;
  description: string;
  type: LogEntryType;
  dateTimeBegin: string;
  dateTimeEnd: string;
  people: string[];
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
  ERROR,
  DANGER,
  WARNING,
  DEFAULT,
  INFO,
  ARCHIVE,
  PRIMARY,
  SUCCESS,
  CANCEL,
}

export interface PersonTag {
  _id: string;
  title: string;
  color: { bg: string; text: string };
}

export interface Note {
  _id: number;
  name?: string;
  date: string;
  imageId?: string;
  body: string;
}

export interface AppUser extends UserProfile {
  version?: string;
  given_name?: string;
  family_name?: string;
  roles?: Role[];
  app_data?: {
    onboarding?: {
      finishedSteps?: string[];
      currentStep?: string;
    };
  };
}

export interface OnboardingStep {
  id: string;
  name: string;
}

export enum PaymentPlan {
  FREE,
  PRO,
  PREMIUM,
}
