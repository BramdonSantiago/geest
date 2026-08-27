import { useEffect, useState } from "react";

import {
  getContacts,
  saveContacts,
} from "../services/contacts.service";

import type { Contact } from "../types/Contact.types";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setError(null);

        const data = await getContacts();

        setContacts(data);
      } catch {
        setError("No pudimos cargar los contactos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Persistencia
  useEffect(() => {
    if (isLoading) {
      return;
    }

    saveContacts(contacts);
  }, [contacts, isLoading]);

  // Agregar contacto
  const addContact = (contact: Contact) => {
    setContacts((currentContacts) => [
      ...currentContacts,
      contact,
    ]);
  };

  // Eliminar contacto
  const removeContact = (id: string) => {
    setContacts((currentContacts) =>
      currentContacts.filter((contact) => contact.id !== id)
    );
  };

  return {
    contacts,
    isLoading,
    error,
    addContact,
    removeContact,
  };
};