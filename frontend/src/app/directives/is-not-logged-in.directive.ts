import { Directive, ElementRef, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environments';

@Directive({
    selector: '[appIsNotLoggedIn]'
})
export class IsNotLoggedInDirective implements OnInit {

    constructor(
        private elementRef: ElementRef,
        private viewContainer: ViewContainerRef,
    ) { }

    ngOnInit() {
        const token = localStorage.getItem(environment.tokenKey);
        if (token) {
            this.elementRef.nativeElement.style.display = 'none';
        }
    }
}
