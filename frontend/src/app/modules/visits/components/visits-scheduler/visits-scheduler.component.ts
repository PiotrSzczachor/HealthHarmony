import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visits-scheduler',
  templateUrl: './visits-scheduler.component.html',
  styleUrls: ['./visits-scheduler.component.scss']
})
export class VisitsSchedulerComponent implements OnInit {
    
    firstDay: Date = new Date();
    week: Date[] = [];

    ngOnInit(): void {
        this.generateWeekArray();
    }

    generateWeekArray(): void {
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(this.firstDay.getTime() + i * 24 * 60 * 60 * 1000);
            this.week.push(currentDate);
        }
    }

}
