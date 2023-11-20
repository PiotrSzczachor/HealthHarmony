import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { VisitsActions, getAvaliableVisitsForSpecificDateSelector, getNumberOfAvaliableVisitsPerDaySelector, getVisitsFiltersSelector } from '../../store';
import { Observable } from 'rxjs';
import { VisitsPerDay } from 'src/app/models/visits/visits-per-day.model';
import { Visit } from 'src/app/models/visits/visit.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-visits-scheduler',
  templateUrl: './visits-scheduler.component.html',
  styleUrls: ['./visits-scheduler.component.scss']
})
export class VisitsSchedulerComponent implements OnInit {
    
    firstDay: Date = new Date();
    addDays: number = 0;
    week: Date[] = [];
    visitsPerDay$!: Observable<VisitsPerDay[]> 
    showDatesWithVisits: boolean = false;
    visits$!: Observable<Visit[]>;
    selectedDay: Date | null = null;

    constructor(private store: Store<AppState>, private dialog: MatDialog) {
        this.selectFilters();
        this.selectVisitsPerDay();
        this.selectAvaliableVisitsForSpecificDate();
    }

    ngOnInit(): void {
        this.dispatchVisitsPerDay();
        this.generateWeekArray();
    }

    generateWeekArray(): void {
        this.week = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(this.firstDay.getTime() + i * 24 * 60 * 60 * 1000);
            this.week.push(currentDate);
        }
    }

    selectFilters(): void {
        this.store.select(getVisitsFiltersSelector).subscribe(filters => {
            this.showDatesWithVisits = Boolean(filters.specializationId && (filters.clinicId || filters.isRemote))
        })
    }

    showNextWeek(): void {
        this.firstDay = this.getSameDayInNextWeek(this.firstDay);
        this.addDays += 7
        this.store.dispatch(VisitsActions.applyDateFilters({addDays: this.addDays}))
        this.generateWeekArray();
    }

    showPreviousWeek(): void {
        this.firstDay = this.getSameDayInPreviousWeek(this.firstDay)
        this.addDays -= 7
        this.store.dispatch(VisitsActions.applyDateFilters({addDays: this.addDays}))
        this.generateWeekArray();
    }

    disableLeftArray(): boolean {
        return new Date() <= this.firstDay;
    }

    getSameDayInPreviousWeek(day: Date): Date {
        return new Date(day.setDate(day.getDate() - 7));
    }

    getSameDayInNextWeek(day: Date): Date {
        return new Date(day.setDate(day.getDate() + 7));
    }

    getAvaliableVisitsForSpecificDate(visitDate: Date): void {
        this.selectedDay = visitDate;
        this.store.dispatch(VisitsActions.getAvaliableVisitsForSpecificDate({visitDate}))
    }

    dispatchVisitsPerDay(): void {
        this.store.dispatch(VisitsActions.getNumberOfAvaliableVisitsPerDay());
    }

    selectAvaliableVisitsForSpecificDate(): void {
        this.visits$ = this.store.select(getAvaliableVisitsForSpecificDateSelector)
    }

    selectVisitsPerDay(): void {
        this.visitsPerDay$ = this.store.select(getNumberOfAvaliableVisitsPerDaySelector);
    }

    openConfirmationDialog(visitId: string | undefined): void {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: "VISIT CONFIRMATION",
            message: "Are you sure you want to book this visit?"
        }}).afterClosed().subscribe(result => {
            if(result && visitId)
                this.store.dispatch(VisitsActions.bookVisit({visitId}));
        })
    }
}
