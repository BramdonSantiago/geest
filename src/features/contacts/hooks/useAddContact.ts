import type { Contact } from "../types/Contact.types";
import type { ContactFormValues } from "../types/ContactForm.types";
import { generateUUID } from "../../../lib/uuid";

export const useAddContact = (
  addContact: (contact: Contact) => void
) => {
  const addContactFromForm = async (
    values: ContactFormValues
  ): Promise<void> => {
    if (!values.department) {
      throw new Error("El departamento es obligatorio.");
    }


    const contact: Contact = {
      id: generateUUID(),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      department: values.department,
    };

    addContact(contact);
  };

  return {
    addContact: addContactFromForm,
  };
};