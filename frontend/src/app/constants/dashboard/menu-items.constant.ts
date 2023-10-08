import { MenuItem } from "src/app/models/dashboard/menu-item.model";

export const MenuItems: MenuItem[] = [
    {
        name: "dashboard.menu.home",
        route: "home",
        icon: "../../../assets/icons/side-nav/home.png",
        requiredClaim: null
    },
    {
        name: "dashboard.menu.doctors",
        route: "doctors",
        icon: "../../../assets/icons/side-nav/doctors.png",
        requiredClaim: null
    },
    {
        name: "dashboard.menu.clinics",
        route: "clinics",
        icon: "../../../assets/icons/side-nav/clinics.png",
        requiredClaim: null
    },
    {
        name: "dashboard.menu.visits",
        route: "visits",
        icon: "../../../assets/icons/side-nav/visits.png",
        requiredClaim: null
    },
    {
        name: "dashboard.menu.documents",
        route: "documents",
        icon: "../../../assets/icons/side-nav/documents.png",
        requiredClaim: null
    },
    {
        name: "dashboard.menu.results",
        route: "results",
        icon: "../../../assets/icons/side-nav/results.png",
        requiredClaim: null
    },
    {
        name: "dashboard.menu.contact",
        route: "contact",
        icon: "../../../assets/icons/side-nav/contact.png",
        requiredClaim: null
    },
    {
        name: "dashboard.menu.settings",
        route: "settings",
        icon: "../../../assets/icons/side-nav/settings.png",
        requiredClaim: null
    }
];