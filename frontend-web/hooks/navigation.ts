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
    { name: "Kontakt hinzufügen", href: "/app/contacts/new" },
    { name: "Termin anlegen", href: "/app/appointments/new" },
    {
      name: "Erinnerung hinzufügen",
      href: "/app/appointments/new?type=reminder",
    },
    { name: "Eintrag anlegen", href: "/app/diary/new" },
  ],
  sidebarNav: [
    { name: "Dashboard", href: "/app", icon: faTachometer },
    { name: "Kontakte", href: "/app/contacts", icon: faUsers },
    {
      name: "Termine",
      href: "/app/appointments",
      icon: faCalendar,
    },
    { name: "Einträge", href: "/app/diary", icon: faList },
    { name: "Einstellungen", href: "/app/settings", icon: faCog },
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
