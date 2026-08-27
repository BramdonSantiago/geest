import { useState, useEffect } from 'react';
import EmptyState from "../../../components/ui/EmptyState";
import ContactFilters from "../components/ContactFilters";
import ContactSkeleton from "../components/ContactSkeleton";
import ContactTable from "../components/ContactTable";
import { useContactFilters } from "../hooks/useContactFilters";
import { useContacts } from "../hooks/useContacts";
import { useAddContact } from "../hooks/useAddContact";
import { Modal } from "../../../components/ui/Modal/Modal";
import ContactHeader from "../components/ContactHeader";
import ContactForm from "../components/ContactForm/ContactForm";
import Toast from "../../../components/ui/Toast/Toast";
import ContactDeleteConfirmation from "../components/ContactDeleteConfirmation"

const ContactsPage = () => {
  const { contacts, isLoading, error, addContact, removeContact } = useContacts();

  const { addContact: addContactFromForm, } = useAddContact(addContact);

  const {search, department, resultCount, filteredContacts, hasActiveFilters, setSearch, setDepartment, clearFilters, } = useContactFilters(contacts);

  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

   const handleOpenAddContact = () => {
    setIsAddContactOpen(true);
  };

  const handleCloseAddContact = () => {
    setIsAddContactOpen(false);
  };

  const handleContactAdded = () => {
    setIsAddContactOpen(false);
    setToastMessage("Contacto agregado");
  };

  const handleRequestDelete = (contact: Contact) => {
    setContactToDelete(contact);
  };

  const handleCancelDelete = () => {
    setContactToDelete(null);
  };

  const handleConfirmDelete = () => {
  if (!contactToDelete) {
    return;
  }

  removeContact(contactToDelete.id);
    setContactToDelete(null);
    setToastMessage("Contacto eliminado");
  };

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toastMessage]);

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
                onDelete={handleRequestDelete}
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
              onSuccess={handleContactAdded}
              onCancel={handleCloseAddContact}
            />
          </Modal>
        )}

        {contactToDelete && (
          <Modal
            open={contactToDelete !== null}
            onClose={handleCancelDelete}
            title="Eliminar contacto"
          >
            {contactToDelete && (
              <ContactDeleteConfirmation
                contact={contactToDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
          </Modal>
         )}

         {toastMessage && (
            <Toast
              message={toastMessage}
              onClose={() => setToastMessage(null)}
            />
          )}
    </div>

      </div>

    </>
  )
}

export default ContactsPage;
