import { Roles } from "src/app/enums/roles.enum";
import { MenuItem } from "src/app/models/dashboard/menu-item.model";

export const MenuItems: MenuItem[] = [
    {
        name: "dashboard.menu.home",
        route: "home",
        icon: "../../../assets/icons/side-nav/home.png",
        requiredRole: null
    },
    {
        name: "dashboard.menu.doctors",
        route: "doctors",
        icon: "../../../assets/icons/side-nav/doctors.png",
        requiredRole: null
    },
    {
        name: "dashboard.menu.clinics",
        route: "clinics",
        icon: "../../../assets/icons/side-nav/clinics.png",
        requiredRole: null
    },
    {
        name: "dashboard.menu.bookVisit",
        route: "book-visit",
        icon: "../../../assets/icons/side-nav/visits.png",
        requiredRole: Roles.Patient
    },
    {
        name: "dashboard.menu.visits",
        route: "visits",
        icon: "../../../assets/icons/side-nav/visits-schedule.png",
        requiredRole: Roles.Patient
    },
    {
        name: "dashboard.menu.visits",
        route: "doctors-visits",
        icon: "../../../assets/icons/side-nav/visits-schedule.png",
        requiredRole: Roles.Doctor
    },
    {
        name: "dashboard.menu.schedule",
        route: "schedule",
        icon: "../../../assets/icons/side-nav/visits.png",
        requiredRole: Roles.Doctor
    },
    {
        name: "dashboard.menu.documents",
        route: "documents",
        icon: "../../../assets/icons/side-nav/documents.png",
        requiredRole: null
    },
    {
        name: "dashboard.menu.contact",
        route: "contact",
        icon: "../../../assets/icons/side-nav/contact.png",
        requiredRole: null
    },
    {
        name: "dashboard.menu.settings",
        route: "settings",
        icon: "../../../assets/icons/side-nav/settings.png",
        requiredRole: null
    }
];