import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isMenuOpen = false;
    url: string | undefined;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

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
}
