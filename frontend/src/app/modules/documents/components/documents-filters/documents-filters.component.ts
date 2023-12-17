import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-documents-filters',
  templateUrl: './documents-filters.component.html',
  styleUrls: ['./documents-filters.component.scss']
})
export class DocumentsFiltersComponent {
    fg: FormGroup = this.fb.group({
        name: [null],
    });

    constructor(private fb: FormBuilder, private store: Store<AppState>, private dialog: MatDialog, private authService: AuthService) { }

    // ngOnInit(): void {
    //     this.selectFilters();
    // }

    // applyFilters(): void {
    //     console.log(this.fg.value);
    //     this.store.dispatch(ClinicsActions.applyFilters({ filters: this.fg.value as ClinicsFilters }));
    // }

    // clearFilters(): void {
    //     this.store.dispatch(ClinicsActions.clearFilters());
    //     this.fg.reset();
    // }

    // selectFilters(): void {
    //     this.store.select(getClinicsFiltersSelector).subscribe(filters => {
    //         this.fg.patchValue({
    //             name: filters.name,
    //             orderBy: filters.orderBy
    //         });
    //     });
    // }

    // openAddPopup(): void {
    //     this.dialog.open(EditClinicComponent, {data: {isEdit: false}});
    // }

    // isAdmin(): boolean {
    //     return this.authService.checkIfUserHasRole(Roles.Admin);
    // }
}
