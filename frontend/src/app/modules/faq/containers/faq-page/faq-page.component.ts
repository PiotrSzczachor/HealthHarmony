import { Component } from '@angular/core';
import { FaqItemsList } from 'src/app/constants/faq/faq-items-list.constant';
import { FaqItem } from 'src/app/models/faq/faq-item.model';

@Component({
    selector: 'app-faq-page',
    templateUrl: './faq-page.component.html',
    styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent {

    faqList: FaqItem[] = FaqItemsList;

    toggleAnswer(item: any) {
        item.expanded = !item.expanded;
    }
}
