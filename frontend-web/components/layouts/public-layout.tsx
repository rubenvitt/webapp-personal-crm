import React, { PropsWithChildren } from "react";

export function PublicLayout(props: PropsWithChildren<unknown>): JSX.Element {
  return <>{props.children}</>;
}
