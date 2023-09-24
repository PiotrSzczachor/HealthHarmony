import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent {

    faqList = [
        { question: 'Question 1', answer: 'Anwser 1', expanded: false },
        { question: 'Question 2', answer: 'Anwser 2', expanded: false },
      ];
    
      toggleAnswer(item: any) {
        item.expanded = !item.expanded;
      }
}
