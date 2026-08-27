import contactsData from "../../../data/data.json";

import type { Contact } from "../types/Contact.types";

const STORAGE_KEY = "contacts";

export const getContacts = async (): Promise<Contact[]> => {
  const storedContacts = localStorage.getItem(STORAGE_KEY);

  if (!storedContacts) {
    return contactsData;
  }

  try {
    const parsedContacts: unknown = JSON.parse(storedContacts);

    if (Array.isArray(parsedContacts)) {
      return parsedContacts as Contact[];
    }

    return contactsData;
  } catch {
    return contactsData;
  }
};

export const saveContacts = (contacts: Contact[]): void => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(contacts)
  );
};