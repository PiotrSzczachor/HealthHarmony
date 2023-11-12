import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditClinicComponent } from 'src/app/modules/clinics/containers/edit-clinic/edit-clinic.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {title: boolean, message: string}, 
    private matDialogRef: MatDialogRef<EditClinicComponent>) { }

    confirm(): void {
        this.matDialogRef.close(true);
    }

    cancel(): void {
        this.matDialogRef.close(false)
    }
}
