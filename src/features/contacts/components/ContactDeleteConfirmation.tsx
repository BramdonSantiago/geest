import type { Contact } from "../types/Contact.types";

type ContactDeleteConfirmationProps = {
  contact: Contact;
  onConfirm: () => void;
  onCancel: () => void;
};

const ContactDeleteConfirmation = ({
  contact,
  onConfirm,
  onCancel,
}: ContactDeleteConfirmationProps) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-color-thin mb-4">
          ¿Estás seguro de que deseas eliminar a{" "}
          <span className="font-medium">
            {contact.name}
          </span>
          ?
        </p>

        <p className="text-color-thin">
          Esta acción no se puede deshacer.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#E5EAF0] pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary--outline"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="btn btn--primary"
        >
        <span className="material-symbols-outlined">delete</span>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ContactDeleteConfirmation;