import { mockPersons } from "../mocks/mocks.data";

export function apiFindPersonDetailsFor(aPersonId: string) {
  return mockPersons.find((a) => a.id === aPersonId);
}

export function apiFindAllPersons(): any {
  return mockPersons;
}
