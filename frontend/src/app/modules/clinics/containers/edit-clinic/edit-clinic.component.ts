import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { Image } from 'src/app/models/shared/image.model';
import { AppState } from 'src/app/store/app.state';
import { ClinicsActions } from '../../store';

@Component({
  selector: 'app-edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.scss']
})
export class EditClinicComponent implements OnInit {

    fg: FormGroup = this.fb.group({
        name: [null, Validators.required],
        email: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: this.fb.group({
            street: [null, Validators.required],
            buildingNumber: [null, Validators.required],
            postalCode: [null, Validators.required],
            city: [null, Validators.required],
            country: [null, Validators.required],
        }),
        images: this.fb.array([])
    })
    isEdit: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean}, 
                private fb: FormBuilder, 
                private matDialogRef: MatDialogRef<EditClinicComponent>,
                private store: Store<AppState>) { 
                    this.isEdit = this.data.isEdit;
                }

    ngOnInit(): void {
        console.log(this.data.isEdit)
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
        this.isEdit ? this.editClinic() : this.addClinic();
    }

    addClinic(): void {
        this.store.dispatch(ClinicsActions.addClinic({clinic: this.fg.value as Clinic}));
        this.matDialogRef.close();
    }

    editClinic(): void {

    }

    cancel(): void {
        this.matDialogRef.close();
    }
}
