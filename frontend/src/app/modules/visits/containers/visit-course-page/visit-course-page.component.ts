import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/models/visits/visit.model';
import { AppState } from 'src/app/store/app.state';
import { VisitsActions, getVisitSelector } from '../../store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-course-page',
  templateUrl: './visit-course-page.component.html',
  styleUrls: ['./visit-course-page.component.scss']
})
export class VisitCoursePageComponent implements OnInit {

    id!: string;
    visit$!: Observable<Visit | undefined>;

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id') as string;
        this.selectVisit();
    }

    ngOnInit(): void {
        this.dispatchVisit(this.id)
    }

    dispatchVisit(id: string): void {
        this.store.dispatch(VisitsActions.getVisitById({id}))
    }

    selectVisit(): void {
        this.visit$ = this.store.select(getVisitSelector);
        this.visit$.subscribe(x => console.log(x));
    }

}
