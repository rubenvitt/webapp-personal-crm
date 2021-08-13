import {
  faCalendar,
  faCog,
  faList,
  faTachometer,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { useState } from "react";
import create from "zustand";
import { Navigation } from "../global/interfaces";

const useNavigationStore = create<Navigation>(() => ({
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
}));

export function useNavigation(): Navigation {
  const { addItemsNav, userNav, sidebarNav, footerNav } = useNavigationStore();
  const [_addItemsNav] = useState(addItemsNav);
  const [_userNav] = useState(userNav);
  const [_sidebarNav] = useState(sidebarNav);
  const [_footerNav] = useState(footerNav);

  return {
    addItemsNav: _addItemsNav,
    userNav: _userNav,
    sidebarNav: _sidebarNav,
    footerNav: _footerNav,
  };
}
