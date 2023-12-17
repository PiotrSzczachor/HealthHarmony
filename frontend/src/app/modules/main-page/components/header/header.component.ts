import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeLanguageComponent } from 'src/app/shared/change-language/change-language.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isMenuOpen = false;
    url: string | undefined;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.url = this.route.snapshot.routeConfig?.path;
    }

    toggleMenu(): void {
      this.isMenuOpen = !this.isMenuOpen;
    }

    isSelected(section: string): boolean {
        return section == this.url
    }

    navigate(path: string): void {
        this.router.navigateByUrl(path);
    }

    logout(): void {
        this.authService.logout();
    }

    openChangeLanguageDialog(): void {
        this.dialog.open(ChangeLanguageComponent);
    }
}
