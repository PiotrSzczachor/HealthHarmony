import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-visit-dialog',
  templateUrl: './book-visit-dialog.component.html',
  styleUrls: ['./book-visit-dialog.component.scss']
})
export class BookVisitDialogComponent {

    fg: FormGroup = this.fb.group({
        symptoms: ['']
    });

    constructor(@Inject(MAT_DIALOG_DATA) public data: {title: boolean, message: string}, 
    private matDialogRef: MatDialogRef<BookVisitDialogComponent>, private fb: FormBuilder) { }

    confirm(): void {
        this.matDialogRef.close(this.fg.value);
    }

    cancel(): void {
        this.matDialogRef.close(false)
    }
}
