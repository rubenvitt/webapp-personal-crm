import {SVGProps} from "react";

export interface NavElement {
    href?: string,
    onClick?: () => void,
    name: string,
    active?: boolean,
    current?: boolean,
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export interface Navigation {
    sidebarNav: NavElement[],
    userNav: NavElement[],
    footerNav: NavElement[],
    setSidebarCurrent: (path: string) => void,
}

export interface User {
    name: string,
    email: string,
    imageUrl: string,
}
