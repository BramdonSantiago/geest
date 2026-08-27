import type { Department } from "../types/Department.types";

type ContactFiltersProps = {
  search: string;
  department: Department | null;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (department: Department | null) => void;
};

const departments: Department[] = [
  "Ventas",
  "Desarrollo",
  "Marketing",
  "Soporte",
];

const ContactFilters = ({
  search,
  department,
  resultCount,
  contactsCount,
  onSearchChange,
  onDepartmentChange,
}: ContactFiltersProps) => {
  return (
    <div>
        <h3 className="mb-2"><span class="material-symbols-outlined">filter_alt</span>Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
            <div className="lg:col-span-4">
                <div>
                    <label htmlFor="input-search">Buscar por nombre</label>
                    <input value={search} onChange={(event) => onSearchChange(event.target.value)} type="search" id="input-search" placeholder="Buscar contacto..." />
                </div>
            </div>
            <div className="lg:col-span-8">
                <div>
                    <label>Filtrar por departamento</label>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => onDepartmentChange(null)} aria-pressed={department === null} className={`btn btn--filter ${department === null ? "filter-active": ""}`}>Todos</button>
                        {departments.map((item) => {
                            const isActive = department === item;
                            return (
                                <button key={item} onClick={() => onDepartmentChange(item)} aria-pressed={isActive} className={`btn btn--filter ${isActive ? "filter-active": ""}`}>
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="mb-4">
            <div className="flex justify-between items-center">
            {search && (
                <button onClick={() => onSearchChange("")} type="button" className="btn btn-primary--outline"><span class="material-symbols-outlined">delete</span>Limpiar búsqueda</button>
            )}
            <p className="flex-1 text-end"><span class="material-symbols-outlined">diversity_3</span>{resultCount} resultados encontrados <span>(de {contactsCount} contactos)</span></p>
            </div>
        </div>
    </div>
  );
};

export default ContactFilters;