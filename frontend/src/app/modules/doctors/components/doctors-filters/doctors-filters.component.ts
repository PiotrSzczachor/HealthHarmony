import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DoctorsFilters } from 'src/app/models/doctors/doctors-filters.model';
import { AppState } from 'src/app/store/app.state';
import { DoctorsActions, getDoctorsFiltersSelector } from '../../store';
import { EditDoctorComponent } from '../../containers/edit-doctor/edit-doctor.component';

@Component({
  selector: 'app-doctors-filters',
  templateUrl: './doctors-filters.component.html',
  styleUrls: ['./doctors-filters.component.scss']
})
export class DoctorsFiltersComponent implements OnInit {
    
    fg: FormGroup = this.fb.group({
        firstName: [null],
        lastName: [null],
        acceptsRemotely: [null],
        orderBy: [null]
    });

    constructor(private fb: FormBuilder, private store: Store<AppState>, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.selectFilters();
    }

    applyFilters(): void {
        this.store.dispatch(DoctorsActions.applyFilters({ filters: this.fg.value as DoctorsFilters }));
    }

    clearFilters(): void {
        this.store.dispatch(DoctorsActions.clearFilters());
        this.fg.reset();
    }

    selectFilters(): void {
        this.store.select(getDoctorsFiltersSelector).subscribe(filters => {
            this.fg.patchValue({
                name: filters.firstName,
                lastName: filters.lastName,
                acceptsRemotely: filters.acceptsRemotely,
                orderBy: filters.orderBy
            });
        });
    }

    openAddPopup(): void {
        this.dialog.open(EditDoctorComponent, {data: {isEdit: false}})
    }
}
