import type { Contact } from "../types/Contact.types";

type ContactRowProps = {
  contact: Contact;
  onDelete: (contact: Contact) => void;
};

const ContactRow = ({ contact, onDelete }: ContactRowProps) => {
  return (
    <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td data-department={contact.department}><span>{contact.department}</span></td>
        <td>
            <button onClick={() => onDelete(contact)} type="button" aria-label={`Eliminar a ${contact.name}`} className="btn btn-secondary--outline">
                <span className="material-symbols-outlined">
                    delete
                </span>
                Eliminar contacto
            </button>
        </td>
    </tr>
  );
};

export default ContactRow;