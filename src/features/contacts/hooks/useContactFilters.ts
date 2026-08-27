import { useMemo, useState } from "react";

import { useDebounce } from "../../../hooks/useDebounce";
import { filterContacts } from "../utils/contact.filters";

import type { Contact } from "../types/Contact.types";
import type { Department } from "../types/Department.types";

export const useContactFilters = (contacts: Contact[]) => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<Department | null>(null);

  const debouncedSearch = useDebounce(search, 1000);

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, {
      search: debouncedSearch,
      department,
    });
  }, [contacts, debouncedSearch, department]);

  const hasActiveFilters =
    search.trim().length > 0 || department !== null;

  const clearFilters = () => {
    setSearch("");
    setDepartment(null);
  };

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