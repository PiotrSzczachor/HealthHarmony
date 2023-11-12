import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Specialization } from 'src/app/models/doctors/specialization.model';
import { AppState } from 'src/app/store/app.state';
import { VisitsActions, getVisitsFiltersSelector } from '../../store';
import { DoctorsActions, getAllSpecializationsSelector } from 'src/app/modules/doctors/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { ClinicsActions, getClinicsSelector } from 'src/app/modules/clinics/store';
import { VisitsFilters } from 'src/app/models/visits/visits-filters.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visits-filters',
  templateUrl: './visits-filters.component.html',
  styleUrls: ['./visits-filters.component.scss']
})
export class VisitsFiltersComponent implements OnInit {

    fg: FormGroup = this.fb.group({
        specializationId: [null, Validators.required],
        clinicId: [null],
        isRemote: [false]
    });

    specializations$!: Observable<Specialization[]>
    clinics$!: Observable<Clinic[]>

    constructor(private store: Store<AppState>, private fb: FormBuilder, private toast: ToastrService) { 
        this.selectSpecializations();
        this.selectClinics();
        this.patchFilters();
    }

    ngOnInit(): void {
        this.dispatchSpecializations();
        this.dispatchClinics();
        this.handleCheckboxChanges();
    }

    handleCheckboxChanges(): void {
        this.fg.get('isRemote')?.valueChanges.subscribe((value) => {
            const clinicSelect = this.fg.get('clinicId');
            if (value) {
              clinicSelect?.disable();
            } else {
              clinicSelect?.enable();
            }
      
            const validators = value ? [] : [Validators.required];
            clinicSelect?.setValidators(validators);
            clinicSelect?.updateValueAndValidity();
          });
    }

    patchFilters(): void {
        this.store.select(getVisitsFiltersSelector).subscribe(filters => {
            this.fg.patchValue({
                specializationId: filters.specializationId,
                clinicId: filters.clinicId,
                isRemote: filters.isRemote
            })
        })
    }

    dispatchSpecializations(): void {
        this.store.dispatch(DoctorsActions.getAllSpecializations());
    }

    selectSpecializations(): void {
        this.specializations$ = this.store.select(getAllSpecializationsSelector);
    }

    dispatchClinics(): void {
        this.store.dispatch(ClinicsActions.getClinics());
    }

    selectClinics(): void {
        this.clinics$ = this.store.select(getClinicsSelector);
    }

    applyFilters(): void {
        if(this.fg.valid) {
            this.store.dispatch(VisitsActions.applyFilters({ filters: this.fg.value as VisitsFilters }))
        }
        else {
            this.toast.error("Specialization and Clinic is required to find avaliable visits")
        }
    }

    clearFilters(): void {
        this.store.dispatch(VisitsActions.clearFilters());   
    }
}
