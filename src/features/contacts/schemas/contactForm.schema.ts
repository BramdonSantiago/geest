import * as Yup from "yup";

export const contactFormSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("El nombre es obligatorio"),

  email: Yup.string()
    .trim()
    .email("Ingresa un email válido")
    .required("El email es obligatorio"),

  phone: Yup.string()
    .trim(),

  department: Yup.string()
    .required("Selecciona un departamento"),
});