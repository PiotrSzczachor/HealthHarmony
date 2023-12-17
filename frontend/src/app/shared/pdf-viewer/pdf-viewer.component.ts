import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { pdfSrc: string }, private dialogRef: MatDialogRef<PdfViewerComponent>) {}

    closeDialog(): void {
        this.dialogRef.close();
    }
}
