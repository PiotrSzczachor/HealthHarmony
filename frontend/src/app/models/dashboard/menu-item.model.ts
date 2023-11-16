import { Roles } from "src/app/enums/roles.enum";

export interface MenuItem {
    name: string;
    route: string;
    icon: string;
    requiredRole: Roles | null;
}