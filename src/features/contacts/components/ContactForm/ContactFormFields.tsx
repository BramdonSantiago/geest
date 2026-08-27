import { Field, ErrorMessage } from "formik";

const ContactFormFields = () => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="name"
        >
          Nombre *
        </label>

        <Field
          id="name"
          name="name"
          type="text"
          placeholder="Nombre completo"
        />

        <ErrorMessage
          name="name"
          component="p"
          className="invalid-input"
        />
      </div>

      <div>
        <label
          htmlFor="email"
        >
          Email *
        </label>

        <Field
          id="email"
          name="email"
          type="email"
          placeholder="nombre@empresa.com"
        />

        <ErrorMessage
          name="email"
          component="p"
          className="invalid-input"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
        >
          Teléfono
        </label>

        <Field
          id="phone"
          name="phone"
          type="tel"
          placeholder="+52 55 0000 0000"
        />

        <ErrorMessage
          name="phone"
          component="p"
          className="invalid-input"
        />
      </div>

      <div>
        <label
          htmlFor="department"
        >
          Departamento *
        </label>

        <Field
          as="select"
          id="department"
          name="department"
        >
          <option value="">Selecciona un departamento</option>
          <option value="Ventas">Ventas</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Marketing">Marketing</option>
          <option value="Soporte">Soporte</option>
        </Field>

        <ErrorMessage
          name="department"
          component="p"
          className="invalid-input"
        />
      </div>
    </div>
  );
};

export default ContactFormFields;