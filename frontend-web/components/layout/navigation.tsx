import { Navigation } from "../../globals/interfaces";
import create from "zustand";
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  UserGroupIcon,
  ViewListIcon,
} from "@heroicons/react/outline";

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
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Kontakte", href: "/contacts", icon: UserGroupIcon },
    { name: "Termine", href: "/appointments", icon: CalendarIcon },
    { name: "Tagebuch", href: "/log", icon: ViewListIcon },
    { name: "Einstellungen", href: "/settings", icon: CogIcon },
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
