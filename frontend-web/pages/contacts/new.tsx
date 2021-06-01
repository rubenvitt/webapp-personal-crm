import { TextInput } from "../../components/common/input.component";

export default function NewContactPage() {
  return (
    <form className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
      <section aria-labelledby="payment_details_heading">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Nutzer anlegen
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Grundlegende Informationen werden benötigt, um den Nutzer
                anzulegen. Weitere Angaben sind freiwillig.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-4 lg:grid-cols-6 gap-6">
              <TextInput
                className="col-span-6 sm:col-span-2"
                title={"Vorname"}
                autocomplete={"given-name"}
              />
              <TextInput
                className="col-span-6 sm:col-span-2"
                title={"Nachname"}
                autocomplete={"family-name"}
              />
              <TextInput
                className="col-span-6 sm:col-span-2"
                title={"Spitzname"}
                autocomplete={"nickname"}
              />
              <TextInput
                className="col-span-6 sm:col-span-2"
                title={"Geschlecht"}
                autocomplete={"sex"}
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Speichern
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
