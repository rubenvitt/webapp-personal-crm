/* eslint-disable @typescript-eslint/ban-types */

export type WithChildren<T = {}> = T & {
  children?: JSX.Element[] | JSX.Element | string;
};
export type WithForcedChildren<T = {}> = T & {
  children: JSX.Element[] | JSX.Element | string;
};
export type WithTypedChildren<X, T = {}> = T & { children: X };

export type AsyncAction<T = void, R = unknown> = (value: T) => Promise<R>;

export type MaybeAsyncAction<T = void, R = unknown> = (
  value: T
) => Promise<R> | R;
