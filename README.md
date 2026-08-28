<img src="https://drive.google.com/uc?export=view&id=16yyB3A8iEAjcjwsv1VIfLfMAnQrUxwPC" style="width: 100%;" />

# Gestor de Contactos

### React · TypeScript · Tailwind CSS

Aplicación web para la gestión de contactos desarrollada como parte de una prueba técnica frontend.

El proyecto está enfocado en demostrar **arquitectura limpia, separación de responsabilidades, filtros reactivos, validación de formularios, persistencia de datos y una experiencia de usuario cuidada**.

La interfaz sigue una dirección visual **minimalista y premium**, inspirada en productos como Apple, Linear y Vercel.

---

## ✦ Descripción

El Gestor de Contactos permite visualizar, buscar, filtrar, agregar y eliminar contactos desde una interfaz responsive.

Además de cubrir los requerimientos funcionales de la prueba, se incorporaron algunas mejoras de UX y arquitectura, como:

* Persistencia mediante `localStorage`.
* Búsqueda con debounce.
* Modales reutilizables mediante React Portals.
* Confirmación antes de eliminar.
* Confirmación al descartar cambios.
* Estados de loading, error y empty.
* Feedback mediante Toast.
* Separación de responsabilidades mediante Feature-Based Architecture.

---

## ✨ Funcionalidades

### Gestión de contactos

* Carga inicial desde `data.json`.
* Visualización de:

  * Nombre
  * Email
  * Teléfono
  * Departamento
* Generación automática de UUID al crear un contacto.
* Agregar contactos mediante formulario modal.
* Eliminación de contactos con confirmación.
* Persistencia de los cambios mediante `localStorage`.

### Filtros reactivos

* Búsqueda de contactos por nombre.
* Debounce en el campo de búsqueda.
* Filtrado por departamento mediante chips.
* Combinación de búsqueda y departamento.
* Contador de resultados.
* Limpieza de filtros.
* Estado vacío cuando no existen resultados.

### Formulario

El formulario fue implementado utilizando **Formik + Yup**.

Incluye:

* Nombre obligatorio.
* Email obligatorio.
* Teléfono opcional.
* Departamento obligatorio.
* Validación en tiempo real.
* Botón de guardar deshabilitado mientras existan errores.
* Estado `Guardando...` durante el submit.
* Manejo de errores sin perder la información introducida.
* Confirmación antes de descartar cambios.

### Experiencia de usuario

* Skeleton loading durante la carga inicial.
* EmptyState para diferentes escenarios.
* Toast para feedback de acciones.
* Modal reutilizable.
* React Portals para overlays.
* Animaciones sutiles.
* Diseño responsive.
* Jerarquía visual orientada a producto.

---

# 🏗 Arquitectura

El proyecto utiliza **Feature-Based Architecture**, manteniendo la lógica relacionada con contactos dentro de su propia feature y separando los componentes UI reutilizables.

```text
src/
│
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers/
│       └── AppProviders.tsx
│
├── features/
│   └── contacts/
│       │
│       ├── components/
│       │   ├── ContactList.tsx
│       │   ├── ContactRow.tsx
│       │   ├── ContactTable.tsx
│       │   ├── ContactEmptyState.tsx
│       │   ├── ContactSkeleton.tsx
│       │   ├── ContactDeleteConfirmation.tsx
│       │   ├── ContactDiscardConfirmation.tsx
│       │   └── ContactForm/
│       │       ├── ContactForm.tsx
│       │       └── ContactFormFields.tsx
│       │
│       ├── hooks/
│       │   ├── useContacts.ts
│       │   ├── useContactFilters.ts
│       │   └── useAddContact.ts
│       │
│       ├── services/
│       │   └── contacts.service.ts
│       │
│       ├── types/
│       │   ├── Contact.types.ts
│       │   └── Department.types.ts
│       │
│       ├── utils/
│       │   ├── contact.utils.ts
│       │   └── contact.filters.ts
│       │
│       ├── schemas/
│       │   └── contactForm.schema.ts
│       │
│       └── index.ts
│
├── data/
│   └── data.json
│
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       ├── Badge.tsx
│       └── EmptyState.tsx
│
├── hooks/
│   └── useDebounce.ts
│
├── lib/
│   ├── formik.ts
│   └── uuid.ts
│
├── styles/
│   └── globals.css
│
└── main.tsx
```

---

# 🧩 Separación de responsabilidades

Cada parte de la aplicación tiene una responsabilidad específica.

### `useContacts`

Gestiona el estado principal de los contactos:

* Carga inicial.
* Loading.
* Error.
* Agregar contactos.
* Eliminar contactos.
* Persistencia.

### `useContactFilters`

Gestiona la lógica de filtrado:

* Búsqueda.
* Debounce.
* Departamento seleccionado.
* Combinación de filtros.
* Limpieza de filtros.
* Contactos filtrados.

### `useAddContact`

Centraliza la lógica necesaria para crear un contacto válido:

* Transformación de valores del formulario.
* Generación del UUID.
* Creación del objeto `Contact`.

### `contacts.service.ts`

Centraliza el acceso a los datos:

```text
getContacts()
saveContacts()
```

De esta manera, los componentes visuales no necesitan conocer cómo se almacenan o recuperan los contactos.

---

# 🪟 Modal reutilizable

El Modal fue diseñado como un componente **genérico y reutilizable**.

No contiene lógica específica relacionada con contactos.

```tsx
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Agregar contacto"
>
  <ContactForm />
</Modal>
```

El componente `Modal` se encarga de la infraestructura del diálogo, mientras que el contenido pertenece a cada caso de uso.

Actualmente se reutiliza para:

```text
Modal
├── ContactForm
├── ContactDeleteConfirmation
└── ContactDiscardConfirmation
```

El renderizado se realiza mediante **React `createPortal`**, utilizando un nodo independiente:

```html
<div id="root"></div>
<div id="modal-root"></div>
```

Esto permite mantener los overlays independientes de la estructura visual de la página.

---

# 💾 Persistencia

Los contactos iniciales se cargan desde:

```text
src/data/data.json
```

Las modificaciones realizadas durante el uso de la aplicación se almacenan posteriormente en `localStorage`.

Esto permite conservar los contactos después de recargar el navegador sin introducir infraestructura adicional que no forma parte del alcance de la prueba.

---

# 🔎 Sistema de filtros

La búsqueda utiliza un pequeño debounce para evitar ejecutar el filtrado innecesariamente durante la escritura.

```text
Usuario escribe
      ↓
Search state
      ↓
Debounce
      ↓
filterContacts()
      ↓
Resultados filtrados
```

Los filtros pueden combinarse:

```text
Búsqueda por nombre
        +
Departamento
        ↓
Resultados finales
```

La lógica de filtrado está separada de los componentes visuales para mantenerlos simples y facilitar su mantenimiento.

---

# 🎨 Dirección visual

La interfaz fue diseñada bajo una filosofía **minimalista, premium y orientada a producto**.

### Principios visuales

* Mucho espacio negativo.
* Jerarquía tipográfica clara.
* Grid preciso.
* Bordes sutiles.
* Sombras ligeras.
* Superficies limpias.
* Animaciones discretas.
* Uso controlado del color.
* Sin elementos decorativos innecesarios.
* Responsive sin sacrificar la jerarquía visual.

### Paleta principal

| Token          | Valor     |
| -------------- | --------- |
| Primary Blue   | `#0066DF` |
| Background     | `#FFFFFF` |
| Subtle Surface | `#F4F7FA` |
| Border         | `#E5EAF0` |
| Primary Text   | `#172033` |
| Secondary Text | `#667085` |
| Error          | `#DC2626` |

La dirección visual busca alejarse del patrón tradicional de un **dashboard empresarial genérico**, priorizando una experiencia más cercana a un producto SaaS moderno.

---

# 🛠 Tecnologías

| Tecnología   | Uso                           |
| ------------ | ----------------------------- |
| React        | Construcción de la interfaz   |
| TypeScript   | Tipado estático               |
| Tailwind CSS | Estilos y sistema visual      |
| Formik       | Gestión del formulario        |
| Yup          | Validación                    |
| UUID         | Identificación única          |
| React Portal | Modales y Toast               |
| localStorage | Persistencia local            |
| Vite         | Entorno de desarrollo y build |

---

# 📱 Responsive

La interfaz fue diseñada tomando como referencia:

**Desktop**

```text
1440 × 900
```

**Tablet**

```text
768px
```

El layout adapta los diferentes componentes manteniendo la legibilidad, jerarquía visual y facilidad de interacción.

---

# 🧠 Decisiones técnicas

### Estado local en lugar de un gestor global

No se utiliza Redux, Zustand ni otro gestor de estado global.

Para el alcance de esta aplicación, el estado pertenece naturalmente a la feature de contactos, por lo que mantenerlo local permite reducir complejidad y mantener el código más fácil de entender.

### Sin backend

La prueba solicita explícitamente utilizar un archivo local `data.json` como fuente inicial.

Por ello, no se incorporó un backend o API simulada que agregara complejidad innecesaria.

### Feature-Based Architecture

La lógica de contactos se mantiene dentro de:

```text
features/contacts/
```

mientras que los componentes UI reutilizables viven en:

```text
components/ui/
```

Esta separación facilita la navegación, mantenimiento y posible evolución del proyecto.

### Persistencia local

Se incorporó `localStorage` como una mejora adicional para evitar que los cambios realizados por el usuario se pierdan al recargar la aplicación.

---

# 📋 Cumplimiento de requerimientos

| Requerimiento                   | Estado |
| ------------------------------- | :----: |
| React + TypeScript              |    ✅   |
| Tailwind CSS                    |    ✅   |
| Carga desde `data.json`         |    ✅   |
| UUID al crear contacto          |    ✅   |
| Skeleton loading                |    ✅   |
| EmptyState                      |    ✅   |
| Eliminar contacto               |    ✅   |
| Formik + Yup                    |    ✅   |
| Validación en tiempo real       |    ✅   |
| Botón deshabilitado con errores |    ✅   |
| Búsqueda por nombre             |    ✅   |
| Filtro por departamento         |    ✅   |
| Filtros combinados              |    ✅   |
| Contador de resultados          |    ✅   |
| Modal                           |    ✅   |
| Manejo de errores               |    ✅   |
| Estado de guardado              |    ✅   |
| Confirmación de eliminación     |    ✅   |
| Confirmación de descarte        |    ✅   |
| Toast de feedback               |    ✅   |
| Persistencia local              |    ✅   |
| Responsive                      |    ✅   |
| Arquitectura por features       |    ✅   |

---

# 🚀 Instalación

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/) — versión 18 o superior.
* npm — incluido con Node.js.
* Git — para clonar el repositorio.

Puedes comprobar las versiones instaladas con:

```bash
node --version
npm --version
git --version
```

---

## 1. Clonar el repositorio

Clona el repositorio desde GitHub:

```bash
git clone <URL-DEL-REPOSITORIO>
```

---

## 2. Entrar al proyecto

```bash
cd <NOMBRE-DEL-PROYECTO>
```

---

## 3. Instalar dependencias

Instala todas las dependencias del proyecto:

```bash
npm install
```

---

## 4. Iniciar el entorno de desarrollo

Ejecuta:

```bash
npm run dev
```

Vite iniciará el servidor de desarrollo y mostrará en la terminal la URL local de la aplicación.

Por defecto, estará disponible en:

```text
http://localhost:5173
```

---

## 5. Ejecutar el build de producción

Para comprobar que el proyecto puede compilarse correctamente:

```bash
npm run build
```

---

## 6. Previsualizar el build

Después de generar el build, puedes ejecutarlo localmente con:

```bash
npm run preview
```

Vite mostrará en la terminal la URL donde estará disponible la versión de producción.

---

## Flujo rápido

Si ya tienes Node.js instalado, puedes ejecutar:

```bash
git clone <URL-DEL-REPOSITORIO>

cd <NOMBRE-DEL-PROYECTO>

npm install

npm run dev
```

Y tendrás la aplicación ejecutándose en tu entorno local.


# 👨‍💻 Autor

**Bramdon Santiago**

Frontend Developer

Proyecto desarrollado como prueba técnica frontend, con especial atención a **arquitectura, mantenibilidad, experiencia de usuario y calidad de implementación**.
