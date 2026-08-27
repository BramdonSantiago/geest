import type { Department } from "./Department.types";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  department: Department | "";
};