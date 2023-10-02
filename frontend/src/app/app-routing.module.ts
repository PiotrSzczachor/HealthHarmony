import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { DashboardPageComponent } from './modules/dashboard/containers/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { MainPageComponent } from './modules/main-page/containers/main-page/main-page.component';
import { FaqPageComponent } from './modules/faq/containers/faq-page/faq-page.component';

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
                component: MainPageComponent,
                canActivate: [AuthGuard],
                outlet: 'dashboard'
            },
            {
                path: 'doctors',
                component: MainPageComponent,
                canActivate: [AuthGuard],
                outlet: 'dashboard'
            },
            {
                path: 'hospitals',
                component: FaqPageComponent,
                canActivate: [AuthGuard],
                outlet: 'dashboard'
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
