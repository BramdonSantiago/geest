import { useMemo, useState } from "react";
import type { Contact } from "../types/Contact.types";
import type { Department } from "../types/Department.types";
import { filterContacts } from "../utils/contact.filters";

export const useContactFilters = (contacts: Contact[]) => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<Department | null>(null);

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, {
      search,
      department,
    });
  }, [contacts, search, department]);

  const clearFilters = () => {
    setSearch("");
    setDepartment(null);
  };

  const hasActiveFilters =
    search.trim().length > 0 || department !== null;

  return {
    search,
    department,
    filteredContacts,
    hasActiveFilters,
    setSearch,
    setDepartment,
    clearFilters,
  };
};