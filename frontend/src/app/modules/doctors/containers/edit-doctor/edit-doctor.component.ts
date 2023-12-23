import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EditClinicComponent } from 'src/app/modules/clinics/containers/edit-clinic/edit-clinic.component';
import { AppState } from 'src/app/store/app.state';
import { DoctorsActions, getAllSpecializationsSelector, getDoctorByIdSelector } from '../../store';
import { Doctor } from 'src/app/models/doctors/doctor.model';
import { Image } from 'src/app/models/shared/image.model';
import { Observable } from 'rxjs';
import { Specialization } from 'src/app/models/doctors/specialization.model';
import { ClinicsActions, getClinicsSelector, getClinicsWithoutImagesSelector } from 'src/app/modules/clinics/store';
import { Clinic } from 'src/app/models/clinics/clinic.model';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit {

    fg: FormGroup = this.fb.group({
        id: [null],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, Validators.required],
        acceptsRemotely: [false, Validators.required],
        specializations: [null, Validators.required],
        clinicsIds: [null, Validators.required],
        image: [null]
    })

    newSpecializationFg: FormGroup = this.fb.group({
        id: [null],
        name: ['', Validators.required]
    });

    isEdit: boolean = false;
    specializations: Specialization[] = [];
    showNewSpecializationInput: boolean = false;

    clinics$!: Observable<Clinic[]>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean, id: string}, 
                private fb: FormBuilder, 
                private matDialogRef: MatDialogRef<EditClinicComponent>,
                private store: Store<AppState>) { 
                    this.isEdit = data.isEdit;
                    this.selectSpecializations();
                    this.selectClinics();
                    if (this.isEdit) {
                        this.selectDoctor();
                    }
                }

    ngOnInit(): void {
        if(this.isEdit)
            this.dispatchDoctor();
        this.dispatchSpecializations();
        this.dispatchClinics();
    }

    get image() {
        return this.fg.controls['image'];
    }

    handleSubmit(): void {
        this.isEdit ? this.editDoctor() : this.addDoctor();
    }

    addDoctor(): void {
        const doctor = this.fg.value as Doctor;
        this.store.dispatch(DoctorsActions.addDoctor({doctor}));
    }

    editDoctor(): void {
        const doctor = this.fg.value as Doctor;
        this.store.dispatch(DoctorsActions.updateDoctor({doctor}));
    }

    addNewSpecialization() {
        if (this.newSpecializationFg.valid) {
            this.specializations = [
                ...this.specializations,
                this.newSpecializationFg.value as Specialization
            ];
            this.newSpecializationFg.reset();
            this.showNewSpecializationInput = false;
        }
    }

    changeShowNewSpecializationInput(): void {
        this.showNewSpecializationInput = !this.showNewSpecializationInput;
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const imageFile = this.extractImageInfo(e.target.result);
            this.image.setValue(imageFile);
        }
        reader.readAsDataURL(file);
    }

    extractImageInfo(dataUrl: string): Image {
        const parts = dataUrl.split(',');
        if (parts.length !== 2) {
            throw new Error('Invalid data format');
        }
        const subParts = parts[0]?.split(';')[0]?.split(':')?.pop()?.split('/');
        var extension;
        if(!subParts) {
            throw new Error('Invalid data format');
        }
        extension = subParts[1];
        const source = parts[1];
        const img: Image = {
            content: source,
            extension: extension as string
        }
        return img
    }

    deleteDoctor(): void {
        this.store.dispatch(DoctorsActions.deleteDoctor({id: this.data.id}));
        this.matDialogRef.close();
    }

    deleteImage(): void {
        this.image.setValue(null);
    }

    dispatchDoctor(): void {
        this.store.dispatch(DoctorsActions.getDoctorById({id: this.data.id}));
    }

    selectDoctor(): void {
        this.store.select(getDoctorByIdSelector).subscribe(doctor => {
            const clinicsIds: string[] = [];
            doctor?.clinics.forEach(clinic => {
                clinicsIds.push(clinic.id)
            })
            this.fg.patchValue({
                id: doctor?.id,
                firstName: doctor?.firstName,
                lastName: doctor?.lastName,
                email: doctor?.email,
                acceptsRemotely: doctor?.acceptsRemotely,
                specializations: doctor?.specializations,
                clinicsIds: clinicsIds,
                image: doctor?.image
            });
        });
    }

    dispatchSpecializations(): void {
        this.store.dispatch(DoctorsActions.getAllSpecializations());
    }

    selectSpecializations(): void {
        this.store.select(getAllSpecializationsSelector).subscribe(specializations => {
            this.specializations = specializations;
        });
    }

    dispatchClinics(): void {
        this.store.dispatch(ClinicsActions.getClinicsWithoutImages());
    }

    selectClinics(): void {
        this.clinics$ = this.store.select(getClinicsWithoutImagesSelector);
    }

    cancel(): void {
        this.matDialogRef.close();
    }

}
