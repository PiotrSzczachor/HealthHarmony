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

    isSelected(sections: string[]): boolean {
        for(let i=0; i < sections.length; i++){
            if(sections[i] == this.url){
                return true;
            }
        }
        return false;
    }

    navigate(path: string): void {
        if(this.url?.includes('panel')){
            if(path == ''){
                this.router.navigate(['dashboard/home-panel']);
            } else {
                this.router.navigate(['dashboard/faq-panel']);
            }
            
        } else {
            this.router.navigateByUrl(path);
        }
    }

    logout(): void {
        this.authService.logout();
    }

    openChangeLanguageDialog(): void {
        this.dialog.open(ChangeLanguageComponent);
    }
}
