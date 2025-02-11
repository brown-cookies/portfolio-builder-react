# Portfolio Builder Front-end | Shadcn Admin Dashboard

Admin Dashboard UI crafted with Shadcn and Vite. Built with responsiveness and accessibility in mind.

![alt text](public/images/shadcn-admin.png)

This repository contains the frontend for a website builder application built using React. The frontend interacts with the Django backend to manage users, website templates, pages, and content. It provides a user-friendly interface for building and customizing websites.

## Features

- **User Authentication**: Login and registration with JWT (JSON Web Tokens).
- **Built-in component**: Browse and select built-in components.
- **Page Editor**: Create, edit, and delete pages with a drag-and-drop interface.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **API Integration**: Communicates with the Django backend via RESTful APIs.
- **Paypal Integration**: Communicates via Django backend in paypal for subscription

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Tabler Icons](https://tabler.io/icons)

**Zustand:** [Zustand](https://https://zustand-demo.pmnd.rs/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/brown-cookies/portfolio-builder-react.git
```

Go to the project directory

```bash
  cd portfolio-builder-react
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```
