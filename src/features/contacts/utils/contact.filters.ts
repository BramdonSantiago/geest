import type { Contact } from "../types/Contact.types";
import type { Department } from "../types/Department.types";

type ContactFilterOptions = {
  search: string;
  department: Department | null;
};

export const filterContacts = (
  contacts: Contact[],
  { search, department }: ContactFilterOptions
): Contact[] => {
  const normalizedSearch = search.trim().toLowerCase();

  return contacts.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesDepartment =
      department === null || contact.department === department;

    return matchesSearch && matchesDepartment;
  });
};