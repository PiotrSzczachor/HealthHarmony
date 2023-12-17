import { Component, Input } from '@angular/core';
import { Document } from 'src/app/models/documents/document.model';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent {
    @Input() document!: Document
}
