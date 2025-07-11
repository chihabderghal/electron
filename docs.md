# 🖥️ Electron App with Vite + React + TypeScript

Welcome to our desktop application project! This app is built with modern technologies like [Electron](https://www.electronjs.org/), [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [React Router](https://reactrouter.com/), and [TypeORM](https://typeorm.io/).

We also use [shadcn/ui](https://ui.shadcn.dev/) for consistent and accessible components and have multilingual support (French 🇫🇷 and Arabic 🇸🇦) using `i18n`.

---

## 📁 Project Structure

```
src
├── electron
│   ├── db
│   │   ├── data-source.ts
│   │   └── entities
│   │       └── User.ts
│   ├── ipc
│   │   ├── handlers
│   │   │   └── userHandler.ts
│   │   └── registerIpcHandlers.ts
│   ├── main
│   │   └── index.ts
│   ├── preload
│   │   └── preload.cts
│   └── tsconfig.json
└── renderer
    ├── App.tsx
    ├── assets
    │   ├── ar.json
    │   ├── fr.json
    │   └── react.svg
    ├── components
    │   └── ui
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       └── separator.tsx
    ├── index.css
    ├── index.d.ts
    ├── layouts
    │   └── RootLayout.tsx
    ├── lib
    │   ├── i18n.ts
    │   └── utils.ts
    ├── main.tsx
    ├── pages
    │   └── Home.tsx
    └── vite-env.d.ts
```

> 📍 `src/` is divided into two parts:

- `electron/`: Handles the backend (Node.js environment)
- `renderer/`: The frontend (React environment)

---

## 📦 Technologies Overview

### 🧩 UI - shadcn/ui

We use [`shadcn/ui`](https://ui.shadcn.dev/) for our UI components.

🔧 To add a new component:

```bash
npx shadcn-ui@latest add <component-name>
```

🔍 Example:

```bash
npx shadcn-ui@latest add dialog
```

📂 You'll find all components in: `src/renderer/components/ui`

---

### 🌍 Internationalization (i18n)

We support both Arabic (`ar.json`) and French (`fr.json`) located in:

```
src/renderer/assets/
├── ar.json
└── fr.json
```

To translate text in your components:

```tsx
import { t } from "@/lib/i18n";

<p>{t("home.welcome")}</p>;
```

If `ar.json` contains:

```json
{
  "home": {
    "welcome": "مرحبًا بك"
  }
}
```

And `fr.json` contains:

```json
{
  "home": {
    "welcome": "Bienvenue"
  }
}
```

Then the app will display the correct value based on the selected language.

---

### 🌐 Routing

We use [React Router](https://reactrouter.com/) for navigation.

📁 All pages go into:

```
src/renderer/pages/
```

🧱 We use a root layout:

```
src/renderer/layouts/RootLayout.tsx
```

Use `<Outlet />` inside `RootLayout` to render nested routes.

---

### 🧠 TypeORM + Electron Backend

Our local database is powered by TypeORM and integrated with Electron.

📂 Key backend files:

```
src/electron/
├── db/data-source.ts         // TypeORM setup
├── db/entities/User.ts       // Entity example
├── ipc/handlers/             // IPC handlers for Electron-React communication
├── main/index.ts             // Electron app entry point
├── preload/preload.cts       // Preload script
```

To add a new database entity:

- Create a file in `db/entities/`
- Register it in `data-source.ts`

Example of an entity:

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

---

## 📦 Useful Scripts

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm dev
```

Build production:

```bash
npm build
```

---

## 🧠 Contribution Guide

- All UI components should go into `components/`
- Pages go in `pages/`, layouts in `layouts/`
- Use `t('path.to.key')` for translation strings
- Use IPC for communication between frontend and Electron backend
- Define DB entities clearly in `db/entities`

---

## 📌 Additional Links

- [Electron Documentation](https://www.electronjs.org/docs)
- [Vite Documentation](https://vitejs.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.dev/docs)
- [TypeORM Documentation](https://typeorm.io/)

---

Feel free to ask questions or suggest improvements. Happy coding! 🚀
