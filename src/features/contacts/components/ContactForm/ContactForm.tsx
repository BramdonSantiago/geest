import { useEffect } from 'react';

import { Form, Formik, useFormikContext } from "formik";

import type { ContactFormValues } from "../../types/ContactForm.types";
import { contactFormSchema } from "../../schemas/contactForm.schema";
import ContactFormFields from "./ContactFormFields";

type ContactFormProps = {
  onSubmit: (values: ContactFormValues) => Promise<void>;
  onSuccess: () => void;
  onCancel: () => void;
  onDirtyChange?: (dirty: boolean) => void;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  department: "",
};

const FormikDirtyState = ({
onDirtyChange,
  }: {
    onDirtyChange?: (dirty: boolean) => void;
  }) => {
    const { dirty } = useFormikContext<ContactFormValues>();

    useEffect(() => {
      onDirtyChange?.(dirty);
    }, [dirty, onDirtyChange]);
    return null;
};

const ContactForm = ({
  onSubmit,
  onSuccess,
  onCancel,
  onDirtyChange,
}: ContactFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactFormSchema}
      validateOnMount
      validateOnChange
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          setStatus(undefined);

          await onSubmit(values);

          onSuccess();
        } catch (error) {
          setStatus(
            error instanceof Error
              ? error.message
              : "No pudimos agregar el contacto."
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, status }) => (
        <Form className="space-y-6">
          <FormikDirtyState onDirtyChange={onDirtyChange} />
          <ContactFormFields />

          <p>
            ID generado automáticamente. El contacto recibirá un
            identificador único al guardarlo.
          </p>

          {status && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-[#DC2626]"
            >
              {status}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 border-t border-[#E5EAF0] pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="btn btn-secondary--outline"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="btn btn--primary"
            >
                <span class="material-symbols-outlined">save</span>
              {isSubmitting ? "Guardando..." : "Guardar contacto"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;