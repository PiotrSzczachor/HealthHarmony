import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctors/doctor.model';
import { PagedList } from 'src/app/models/shared/paged-list.model';
import { PaginatorEvent } from 'src/app/models/shared/paginator-event.model';
import { AppState } from 'src/app/store/app.state';
import { DoctorsActions, getPagedDoctorsSelector } from '../../store';

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.scss']
})
export class DoctorsPageComponent {
    doctors$!: Observable<PagedList<Doctor> | undefined>

    constructor(private store: Store<AppState>) { 
        this.selectDoctors();
    }

    ngOnInit(): void {
        this.dispatchDoctors();
    }

    dispatchDoctors(): void {
        this.store.dispatch(DoctorsActions.getPagedDoctors());
    }

    selectDoctors(): void {
        this.doctors$ = this.store.select(getPagedDoctorsSelector);
    }

    applyPaginationFilters(pageNumber: number): void {
        const filter: PaginatorEvent = {
            pageIndex: pageNumber
        };
        this.store.dispatch(DoctorsActions.applyPaginationFilters({filter: filter}));
    }
}
