import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isMenuOpen = false;
    url: string | undefined;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.url = this.route.snapshot.routeConfig?.path;
    }

    toggleMenu(): void {
      this.isMenuOpen = !this.isMenuOpen;
    }

    isSelected(section: string): boolean {
        return section == this.url
    }
}
