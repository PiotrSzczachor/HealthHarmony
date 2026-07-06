# HealthHarmony

**HealthHarmony** is a full-stack web platform for managing medical appointments and clinic operations. Patients can browse doctors and clinics, book visits, and access their medical documents; doctors manage their schedules, appointments, and patient paperwork; administrators oversee the underlying data. It was built as a self-driven project to practice building a production-style application end to end — from database and REST API to a rich single-page frontend.

> **TL;DR for recruiters:** A .NET 6 REST API (PostgreSQL, JWT auth, clean modular architecture) paired with an Angular 16 SPA (NgRx state management, Angular Material, interactive calendars & maps, PDF generation, and full internationalization).

---

## Key Features

- **Role-based access** for three user types — **Patient**, **Doctor**, and **Admin** — each with a tailored dashboard and permissions.
- **Appointment booking** — patients search for doctors/clinics and book visits; doctors manage their availability and schedule via an interactive calendar.
- **Clinic & doctor directory** with location display on interactive maps.
- **Medical documents** — upload, filter, and view patient documents; generate/export PDFs.
- **Authentication & authorization** — JWT-based login with ASP.NET Core Identity and role-guarded routes on both API and UI.
- **Internationalization** — full English and Polish translations.

---

## Tech Stack

### Backend — ASP.NET Core Web API (.NET 6, C#)
- **PostgreSQL** with **Entity Framework Core** (Npgsql provider) for data access
- **ASP.NET Core Identity** + **JWT Bearer** authentication
- **AutoMapper** for DTO/entity mapping
- **Swagger / OpenAPI** for interactive API documentation
- **Modular, layered architecture** — the domain is split into focused projects (`Auth`, `Clinics`, `Doctors`, `Visits`, `Documents`, `Addresses`, `Common`), plus dedicated data (`SQL`, `SQLRepository`) and shared model layers

### Frontend — Angular 16 (TypeScript)
- **NgRx** (Store + Effects) for predictable state management
- **Angular Material** + **Angular CDK** component library
- **FullCalendar** for scheduling and appointment views
- **Leaflet** (`@asymmetrik/ngx-leaflet`) for interactive clinic maps
- **jsPDF / pdfmake / ngx-extended-pdf-viewer** for generating and viewing documents
- **@ngx-translate** for internationalization (EN / PL)
- **ngx-toastr**, **Swiper**, and other UX libraries

---

## Architecture

```
HealthHarmony/
├── backend/                      # ASP.NET Core 6 solution (HealthHarmony.sln)
│   ├── HealthHarmony.WebApi/     # API entry point, controllers, middleware, JWT/Swagger setup
│   ├── HealthHarmony.Auth/       # Authentication & user management
│   ├── HealthHarmony.Clinics/    # Clinic domain logic
│   ├── HealthHarmony.Doctors/    # Doctor domain logic
│   ├── HealthHarmony.Visits/     # Appointment/visit domain logic
│   ├── HealthHarmony.Documents/  # Medical document management
│   ├── HealthHarmony.Addresses/  # Address/location logic
│   ├── HealthHarmony.Models/     # Shared entities, DTOs, filters
│   ├── HealthHarmony.Common/     # Cross-cutting helpers & services
│   ├── HealthHarmony.SQL/        # EF Core DbContext & migrations
│   └── HealthHarmony.SQLRepository/  # Generic repository layer
│
└── frontend/                     # Angular 16 single-page application
    └── src/app/modules/          # Feature modules: auth, dashboard, doctors,
                                   # clinics, visits, documents, home, contact,
                                   # settings, results, faq
```

The backend follows a clean separation of concerns: controllers expose the REST API, each domain lives in its own project with interfaces + service implementations, and data access is centralized in a generic repository over EF Core. The frontend mirrors this with a feature-module structure, using NgRx stores (actions / reducers / effects / selectors) to manage state per feature.

---

## Getting Started

### Prerequisites
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) + npm and the Angular CLI (`npm i -g @angular/cli`)
- [PostgreSQL](https://www.postgresql.org/)

### Backend
```bash
cd backend
# Set your PostgreSQL connection string ("Local") in HealthHarmony.WebApi/appsettings.json
dotnet restore
dotnet ef database update --project HealthHarmony.SQL --startup-project HealthHarmony.WebApi
dotnet run --project HealthHarmony.WebApi
```
The API and Swagger UI will be available on the configured local port.

### Frontend
```bash
cd frontend
npm install
npm start
```
The app runs at `http://localhost:4200` and talks to the backend API.

---

## About This Project

HealthHarmony was developed as a personal/academic project to demonstrate full-stack engineering across a modern .NET + Angular stack — covering relational data modeling, secure authentication, RESTful API design, and a component-driven SPA with centralized state management. It reflects hands-on experience with the tools and patterns commonly used in professional web development teams.
