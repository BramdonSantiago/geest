import contactsData from "../../../data/data.json";

import type { Contact } from "../types/Contact.types";

const initialContacts = contactsData as Contact[];

const STORAGE_KEY = "contacts";

export const getContacts = async (): Promise<Contact[]> => {
  const storedContacts = localStorage.getItem(STORAGE_KEY);

  if (!storedContacts) {
    return initialContacts;
  }

  try {
    const parsedContacts: unknown = JSON.parse(storedContacts);

    if (Array.isArray(parsedContacts)) {
      return parsedContacts as Contact[];
    }

    return initialContacts;
  } catch {
    return initialContacts;
  }
};

export const saveContacts = (contacts: Contact[]): void => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(contacts)
  );
};