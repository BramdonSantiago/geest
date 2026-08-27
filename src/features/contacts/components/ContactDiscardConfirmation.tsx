import type { FC } from "react";

type ContactDiscardConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ContactDiscardConfirmation: FC<ContactDiscardConfirmationProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-4">
          Tienes cambios sin guardar.
        </p>

        <p className="text-color-thin">
          Si cierras el formulario, perderás la información que has ingresado.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#E5EAF0] pt-4">
        <button
          type="button"
          onClick={onConfirm}
          className="btn btn-secondary--outline"
        >
          Descartar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="btn btn--primary"
        >
            <span className="material-symbols-outlined">edit</span>
            Seguir editando
        </button>
      </div>
    </div>
  );
};

export default ContactDiscardConfirmation;