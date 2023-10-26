import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ClinicsActions, getClinicsFiltersSelector } from '../../store';
import { ClinicsFilters } from 'src/app/models/clinics/clinic-filters.model';

@Component({
  selector: 'app-clinic-filters',
  templateUrl: './clinic-filters.component.html',
  styleUrls: ['./clinic-filters.component.scss']
})
export class ClinicFiltersComponent implements OnInit {

    fg: FormGroup = this.fb.group({
        name: [null],
        orderBy: [null]
    });

    constructor(private fb: FormBuilder, private store: Store<AppState>) { }

    ngOnInit(): void {
        this.selectFilters();
    }

    applyFilters(): void {
        console.log(this.fg.value);
        this.store.dispatch(ClinicsActions.applyFilters({ filters: this.fg.value as ClinicsFilters }));
    }

    clearFilters(): void {
        this.store.dispatch(ClinicsActions.clearFilters());
        this.fg.reset();
    }

    selectFilters(): void {
        this.store.select(getClinicsFiltersSelector).subscribe(filters => {
            this.fg.patchValue({
                name: filters.name,
                orderBy: filters.orderBy
            });
        });
    }

}
