type ContactHeaderProps = {
  onAddContact: () => void;
  contactCount: number;
};

const ContactHeader = ({
  onAddContact,
  contactsCount
}: ContactHeaderProps) => {
  return (
    <div className="header content-box">
        <div className="flex items-center">
            <div>
                <div className="logo-app">
                    <span class="material-symbols-outlined">contact_phone</span>
                </div>
                </div>
                <div>
                <h1>Gestor de contactos</h1>
                <p className="text-color-thin">Administra y organiza tus contactos fácilmente</p>
            </div>
        </div>
        <div className="text-center">
            <button onClick={onAddContact} type="button" className="btn btn--primary w-full md:w-auto">
                <span class="material-symbols-outlined">add</span>
                Agregar contacto
            </button>
            <p class="text-color-thin text-small mt-3"><span class="material-symbols-outlined">call</span><span>{contactsCount}</span> contactos actualmente</p>
        </div>
    </div>
  );
};

export default ContactHeader;