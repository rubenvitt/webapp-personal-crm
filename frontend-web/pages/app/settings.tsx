import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faCodeBranch,
  faCog,
  faCreditCard,
  faKey,
  faUserCircle,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../api-functions/defaults";
import { IntegrationsForm } from "../../components-old/settings/form/integrations-form.component";
import { ProfileForm } from "../../components-old/settings/form/profile-form.component";

interface NavigationItem {
  label: string;
  icon: IconDefinition;
  type: FormType;
}

enum FormType {
  PROFILE,
  ACCOUNT,
  SECURITY,
  NOTIFICATION,
  PLANS,
  INTEGRATIONS,
}

const subNavigation: NavigationItem[] = [
  { label: "Profil", icon: faUserCircle, type: FormType.PROFILE },
  { label: "Account", icon: faCog, type: FormType.ACCOUNT },
  { label: "Passwort & Sicherheit", icon: faKey, type: FormType.SECURITY },
  { label: "Benachrichtigungen", icon: faBell, type: FormType.NOTIFICATION },
  { label: "Pläne & Zahlung", icon: faCreditCard, type: FormType.PLANS },
  { label: "Integrationen", icon: faCodeBranch, type: FormType.INTEGRATIONS },
];

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Settings: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<FormType>(
    subNavigation[0].type
  );

  return (
    <>
      <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {subNavigation.map((item) => (
                <button
                  onClick={() => {
                    setSelectedPage(item.type);
                  }}
                  key={item.label}
                  className={classNames(
                    selectedPage === item.type
                      ? "bg-gray-50 text-primary-600 hover:bg-white"
                      : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                    "w-full group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                  )}
                  aria-current={selectedPage === item.type ? "page" : undefined}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={classNames(
                      selectedPage === item.type
                        ? "text-primary-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {selectedPage === FormType.PROFILE && <ProfileForm />}
          {selectedPage === FormType.INTEGRATIONS && <IntegrationsForm />}
        </div>
      </main>
    </>
  );
};
export default Settings;
