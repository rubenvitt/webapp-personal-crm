import { Navigation } from "../../globals/interfaces";
import create from "zustand";
import {
  faCalendar,
  faCog,
  faList,
  faTachometer,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";

export const useNavigationStore = create<Navigation>((set, get) => ({
  userNav: [
    { name: "Mein Profil", href: "#" },
    { name: "Abmelden", href: "#" },
  ],
  footerNav: [],
  addItemsNav: [
    { name: "Kontakt", href: "/contacts/new" },
    { name: "Termin", href: "/appointments/new" },
    { name: "Erinnerung", href: "/appointments/new?type=reminder" },
    { name: "Tagebucheintrag", href: "/log/new" },
  ],
  sidebarNav: [
    { name: "Dashboard", href: "/", icon: faTachometer },
    { name: "Kontakte", href: "/contacts", icon: faUsers },
    { name: "Termine", href: "/appointments", icon: faCalendar },
    { name: "Tagebuch", href: "/log", icon: faList },
    { name: "Einstellungen", href: "/settings", icon: faCog },
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
