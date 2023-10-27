import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { Image } from 'src/app/models/shared/image.model';
import { AppState } from 'src/app/store/app.state';
import { ClinicsActions, getClinicByIdSelector } from '../../store';
import { AddClinicDto } from 'src/app/models/clinics/add-clinic-dto.model';

@Component({
  selector: 'app-edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.scss']
})
export class EditClinicComponent implements OnInit {

    fg: FormGroup = this.fb.group({
        id: [null],
        name: [null, Validators.required],
        email: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: this.fb.group({
            id: [null],
            street: [null, Validators.required],
            buildingNumber: [null, Validators.required],
            postalCode: [null, Validators.required],
            city: [null, Validators.required],
            country: [null, Validators.required],
        }),
        images: this.fb.array([])
    })
    isEdit: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean, id: string}, 
                private fb: FormBuilder, 
                private matDialogRef: MatDialogRef<EditClinicComponent>,
                private store: Store<AppState>) { 
                    this.isEdit = this.data.isEdit;
                    if (this.data.id) {
                        this.selectClinic();
                    }
                }

    ngOnInit(): void {
        if (this.data.id) {
            this.dispatchClinic();
        }
    }

    get imagesArray() {
        return this.fg.get('images') as FormArray;
    }

    onFileSelected(event: any) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imagesArray.push(this.fb.control(this.extractImageInfo(e.target.result)));
            }
            reader.readAsDataURL(files[i]);
        }
    }

    extractImageInfo(dataUrl: string) {
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

    handleSubmit(): void {
        if (this.fg.valid)
        this.isEdit ? this.editClinic() : this.addClinic();
    }

    selectClinic(): void {
        this.store.select(getClinicByIdSelector).subscribe(clinic => {
            this.fg.patchValue({
                id: clinic?.id,
                name: clinic?.name,
                email: clinic?.email,
                phoneNumber: clinic?.phoneNumber,
                address: clinic?.address,
                images: clinic?.images
            });
            this.imagesArray.clear()

            clinic?.images.forEach(image => {
                this.imagesArray.push(this.fb.control(image)); 
            });
        });
    }

    deleteImage(index: number): void {
        this.imagesArray.removeAt(index);
    }

    dispatchClinic(): void {
        this.store.dispatch(ClinicsActions.getClinicById({id: this.data.id}));
    }

    addClinic(): void {
        const newClinic: AddClinicDto = {
            name: this.fg.controls['name'].value,
            email: this.fg.controls['email'].value,
            phoneNumber: this.fg.controls['phoneNumber'].value,
            address: {
                street: this.fg.controls['address'].value.street,
                buildingNumber: this.fg.controls['address'].value.buildingNumber,
                postalCode: this.fg.controls['address'].value.postalCode,
                city: this.fg.controls['address'].value.city,
                country: this.fg.controls['address'].value.country
            },
            images: this.imagesArray.value
        }
        this.store.dispatch(ClinicsActions.addClinic({clinic:newClinic}));
        this.matDialogRef.close();
    }

    editClinic(): void {
        this.store.dispatch(ClinicsActions.updateClinic({clinic: this.fg.value as Clinic}));
    }

    cancel(): void {
        this.matDialogRef.close();
    }

    deleteClinic(): void {
        this.store.dispatch(ClinicsActions.deleteClinic({id: this.data.id}));
        this.matDialogRef.close();
    }
}
