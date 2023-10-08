import { AfterContentInit, Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MenuItem } from 'src/app/models/dashboard/menu-item.model';
import { MenuItems } from 'src/app/constants/dashboard/menu-items.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements AfterContentInit {

    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

    menuItems: MenuItem[] = MenuItems;
    opened: boolean = true;
    url!: string;

    constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

    ngAfterContentInit(): void {
        this.route.children[0]?.url?.subscribe(x => this.url = x[0].path);
        this.observer.observe(['(max-width: 800px)']).subscribe((res: any) => {
            if (res.matches) {
                this.sidenav?.close();
            } else {
                this.sidenav?.open();
            }
        })
    }

    isItemSelected(item: string): Observable<boolean> {
        retur this.route.children[0]?.url?.pipe(map( x => x[0].path == item));
    }

    routeToChildren(route: string): void {
        this.router.navigate(['dashboard/' + route]);  
    }

    logout(): void {
        this.authService.logout();
        this.router.navigateByUrl('');
    }

}
