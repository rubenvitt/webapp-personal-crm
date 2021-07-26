import {
  faCalendar,
  faCog,
  faList,
  faTachometer,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { TFunction, useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import create from "zustand";
import { NavElement, Navigation } from "../globals/interfaces";

const useNavigationStore = create<Navigation>((set, get) => ({
  userNav: [
    { name: "user.profile", href: "/app/settings" },
    { name: "user.logout", href: "/api/auth/logout" },
  ],
  footerNav: [],
  addItemsNav: [
    { name: "add-items.contact", href: "/app/contacts/new" },
    { name: "add-items.appointment", href: "/app/appointments/new" },
    { name: "add-items.reminder", href: "/app/appointments/new?type=reminder" },
    { name: "add-items.log", href: "/app/diary/new" },
  ],
  sidebarNav: [
    { name: "sidebar.dashboard", href: "/app", icon: faTachometer },
    { name: "sidebar.contacts", href: "/app/contacts", icon: faUsers },
    {
      name: "sidebar.appointments",
      href: "/app/appointments",
      icon: faCalendar,
    },
    { name: "sidebar.log", href: "/app/diary", icon: faList },
    { name: "sidebar.settings", href: "/app/settings", icon: faCog },
  ],
  setSidebarCurrent: (path) => {
    const navElements = get().sidebarNav;
    navElements.forEach((value) => {
      value.current = value.href === path;
    });
    set({
      sidebarNav: navElements,
    });
  },
}));

function translateNav(addItemsNav: NavElement[], t: TFunction): NavElement[] {
  return addItemsNav.map((e) => {
    return {
      ...e,
      name: t("menu." + e.name),
    };
  });
}

export function useNavigation(): Navigation {
  const { addItemsNav, userNav, sidebarNav, footerNav, setSidebarCurrent } =
    useNavigationStore();
  const [_addItemsNav, setAddItemsNav] = useState(addItemsNav);
  const [_userNav, setUserNAv] = useState(userNav);
  const [_sidebarNav, setSidebarNav] = useState(sidebarNav);
  const [_footerNav, setFooterNav] = useState(footerNav);
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  useEffect(() => {
    setAddItemsNav(translateNav(addItemsNav, t));
  }, [addItemsNav, locale]);

  useEffect(() => {
    setUserNAv(translateNav(userNav, t));
  }, [userNav, locale]);

  useEffect(() => {
    setSidebarNav(translateNav(sidebarNav, t));
  }, [sidebarNav, locale]);

  useEffect(() => {
    setFooterNav(translateNav(footerNav, t));
  }, [footerNav, locale]);

  return {
    setSidebarCurrent,
    addItemsNav: _addItemsNav,
    userNav: _userNav,
    sidebarNav: _sidebarNav,
    footerNav: _footerNav,
  };
}
