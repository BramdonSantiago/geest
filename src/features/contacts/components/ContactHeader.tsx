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
        <div>
            <button onClick={onAddContact} type="button" className="btn btn--primary">
                <span class="material-symbols-outlined">add</span>
                Agregar contacto
            </button>
            <p class="mt-1"><span>{contactsCount}</span> contactos actualmente</p>
        </div>
    </div>
  );
};

export default ContactHeader;