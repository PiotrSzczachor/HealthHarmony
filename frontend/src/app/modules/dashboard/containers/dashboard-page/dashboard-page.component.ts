import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MenuItem } from 'src/app/models/dashboard/menu-item.model';
import { MenuItems } from 'src/app/constants/dashboard/menu-items.constant';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements AfterViewInit{

    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    
    menuItems: MenuItem[] = MenuItems;
    opened: boolean = true;

    constructor(private observer: BreakpointObserver) { }

    ngAfterViewInit(): void {
        this.observer.observe(['(max-width: 800px)']).subscribe((res: any) => {
            if (res.matches) {
                this.sidenav.mode = 'over';
                this.sidenav.close();
            } else {
                this.sidenav.mode = 'side';
                this.sidenav.open();
            }
        })
    }


}
