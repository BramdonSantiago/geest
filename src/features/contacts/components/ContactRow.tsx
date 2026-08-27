import type { Contact } from "../types/Contact.types";

type ContactRowProps = {
  contact: Contact;
  onDelete: (id: string) => void;
};

const ContactRow = ({ contact, onDelete }: ContactRowProps) => {
  return (
    <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td data-department={contact.department}><span>{contact.department}</span></td>
        <td>
            <button onClick={() => onDelete(contact.id)} type="button" aria-label={`Eliminar a ${contact.name}`} class="btn btn-secondary--outline">
                <span class="material-symbols-outlined">
                    delete
                </span>
                Eliminar contacto
            </button>
        </td>
    </tr>
  );
};

export default ContactRow;