import React, {
  Fragment,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useNavigationStore } from "./navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/pro-light-svg-icons";
import { faPlus, faSearch } from "@fortawesome/pro-regular-svg-icons";
import Avatar from "react-avatar";
import { useCurrentUser } from "../../services/account-service";
import Head from "next/head";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    media: string;
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Layout: React.FC = (props: { children: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { sidebarNav, userNav, addItemsNav, setSidebarCurrent } =
    useNavigationStore();
  const router = useRouter();
  // TODO: change to real method & use authentication context

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    console.log("Set sidebar current to", router.pathname);
    setSidebarCurrent(router.pathname);
  }, [router.pathname]);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Head>
        <title key="title">Unknown • Personal CRM</title>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="rgb(194, 65, 12)"
          key="theme-color-light"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="rgb(77, 26, 4)"
          key="theme-color-dark"
        />
      </Head>
      {/* Narrow sidebar */}
      <div className="hidden w-28 bg-primary-700 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 h-10 w-full relative flex items-center">
            <Image layout="fill" src="/logo.svg" alt="Workflow" />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {sidebarNav.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  className={classNames(
                    item.current
                      ? "bg-primary-800 text-white"
                      : "text-primary-100 hover:bg-primary-800 hover:text-white",
                    "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-primary-300 group-hover:text-white",
                      "h-6 w-6 text-xl"
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2">{item.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-primary-700 pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 group rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                        size="2x"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 relative flex items-center w-full h-16">
                  <Image
                    layout={"fill"}
                    objectFit={"fill"}
                    src="/logo.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="border-b border-white border-1 pb-4 mx-4" />
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {sidebarNav.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            onClick={() => setMobileMenuOpen(false)}
                            className={classNames(
                              item.current
                                ? "bg-primary-800 text-white"
                                : "text-primary-100 hover:bg-primary-800 hover:text-white",
                              "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-primary-300 group-hover:text-white",
                                "mr-3 h-6 w-6 text-lg"
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full">
          <div className="relative z-5 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FontAwesomeIcon
                icon={faBars}
                className="h-6 w-6"
                aria-hidden="true"
                size="2x"
              />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search_field" className="sr-only">
                    Search everything
                  </label>
                  <div className="hidden relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="flex-shrink-0 h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      name="search_field"
                      id="search_field"
                      className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                      placeholder="Suchen"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative flex-shrink-0">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                          <span className="sr-only">Open user menu</span>
                          <Avatar
                            className="h-2 w-2 rounded-full"
                            size="36"
                            round
                            maxInitials={2}
                            src={currentUser?.picture}
                            name={currentUser?.name}
                            alt={"Your profile picture"}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userNav.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>

                <Menu as="div" className="relative flex-shrink-0">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="flex bg-primary-600 p-1 rounded-full items-center justify-center text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                          <div className="h-6 w-6 flex items-center flex-col">
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="h-6 w-6 text-lg block"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="sr-only">Add items</span>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {addItemsNav.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
