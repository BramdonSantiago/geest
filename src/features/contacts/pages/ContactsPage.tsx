import { useState } from 'react'
import EmptyState from "../../../components/ui/EmptyState";
import ContactFilters from "../components/ContactFilters";
import ContactSkeleton from "../components/ContactSkeleton";
import ContactTable from "../components/ContactTable";
import { useContactFilters } from "../hooks/useContactFilters";
import { useContacts } from "../hooks/useContacts";
import { useAddContact } from "../hooks/useAddContact";
import { Modal } from "../../../components/ui/Modal/Modal";
import ContactHeader from "../components/ContactHeader";
import ContactForm from "../components/ContactForm/ContactForm"

const ContactsPage = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)

   const handleOpenAddContact = () => {
    setIsAddContactOpen(true);
  };

  const handleCloseAddContact = () => {
    setIsAddContactOpen(false);
  };

  const { contacts, isLoading, error, addContact, removeContact } = useContacts();

  const { addContact: addContactFromForm, } = useAddContact(addContact);

  const {search, department, resultCount, filteredContacts, hasActiveFilters, setSearch, setDepartment, clearFilters, } = useContactFilters(contacts);

  return (
    <>
    <ContactHeader
      onAddContact={handleOpenAddContact}
      contactsCount={contacts.length}
    />
    <div className="content-main-dash content-box">
      <div className="content-box-border">
           {isLoading && (
        <ContactSkeleton />
      )}
      {!isLoading && error && (
        <EmptyState
          title="No pudimos cargar los contactos"
          description={error}
        />
      )}
      {!isLoading && !error && contacts.length === 0 && (
          <EmptyState
            title="No hay contactos"
            description="Agrega tu primer contacto para comenzar."
          />
      )}

      {!isLoading && !error && contacts.length > 0 && (
          <>
            <ContactFilters
              search={search}
              department={department}
              resultCount={filteredContacts.length}
              contactsCount={contacts.length}
              onSearchChange={setSearch}
              onDepartmentChange={setDepartment}
            />

            {filteredContacts.length === 0 ? (
              <EmptyState
                title="No encontramos resultados"
                description="Prueba ajustando tu búsqueda o los filtros."
              />
            ) : (
              <ContactTable
                contacts={filteredContacts}
                onDelete={removeContact}
              />
            )}
          </>
        )}
      
      
      {isAddContactOpen && (
         <Modal
            open={isAddContactOpen}
            onClose={handleCloseAddContact}
            title="Agregar contacto"
          >
            <ContactForm
              onSubmit={addContactFromForm}
              onSuccess={handleCloseAddContact}
              onCancel={handleCloseAddContact}
            />
          </Modal>
        )}
    </div>

      </div>

    </>
  )
}

export default ContactsPage;
