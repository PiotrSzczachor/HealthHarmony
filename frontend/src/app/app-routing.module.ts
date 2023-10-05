import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { DashboardPageComponent } from './modules/dashboard/containers/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { MainPageComponent } from './modules/main-page/containers/main-page/main-page.component';
import { FaqPageComponent } from './modules/faq/containers/faq-page/faq-page.component';
import { HomePageComponent } from './modules/home/containers/home-page/home-page.component';
import { DoctorsPageComponent } from './modules/doctors/containers/doctors-page/doctors-page.component';
import { HospitalsPageComponent } from './modules/hospitals/containers/hospitals-page/hospitals-page.component';
import { VisitsPageComponent } from './modules/visits/containers/visits-page/visits-page.component';
import { DocumentsPageComponent } from './modules/documents/containers/documents-page/documents-page.component';
import { ResultsPageComponent } from './modules/results/containers/results-page/results-page.component';
import { SettingsPageComponent } from './modules/settings/settings-page/settings-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'faq',
        component: FaqPageComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: HomePageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'doctors',
                component: DoctorsPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'hospitals',
                component: HospitalsPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'visits',
                component: VisitsPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'documents',
                component: DocumentsPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'results',
                component: ResultsPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'results',
                component: ResultsPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'settings',
                component: SettingsPageComponent,
                canActivate: [AuthGuard],
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
