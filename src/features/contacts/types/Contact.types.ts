import type { Department } from "./Department.types";

export type Contact = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    department: Department;
};
