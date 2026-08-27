import type { Contact } from "../types/Contact.types";
import ContactRow from "./ContactRow";

type ContactTableProps = {
  contacts: Contact[];
  onDelete: (id: string) => void;
};


const ContactTable = ({
  contacts,
  onDelete,
}: ContactTableProps) => {
  return (
    <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
                <ContactRow
                    key={contact.id}
                    contact={contact}
                    onDelete={onDelete}
                />
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default ContactTable;