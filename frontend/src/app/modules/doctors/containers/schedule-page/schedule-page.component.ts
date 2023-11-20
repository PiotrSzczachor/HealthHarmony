import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { Observable } from 'rxjs';
import { WeekdaysEnum } from 'src/app/enums/weekdays.enum';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { WeeklyWorkSchedule } from 'src/app/models/visits/weekly-work-schedule.model';
import { VisitsActions, getDoctorScheduleSelector } from 'src/app/modules/visits/store';
import { AppState } from 'src/app/store/app.state';
import { DoctorsActions, getDoctorClinicsSelector } from '../../store';
import { WeekdayWorkingHours } from 'src/app/models/visits/weekday-working-hours.model';

@Component({
    selector: 'app-schedule-page',
    templateUrl: './schedule-page.component.html',
    styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {

    isEdit: boolean = false;
    clinics$!: Observable<Clinic[]>;
    schedule$!: Observable<WeeklyWorkSchedule | null>
    weekdaysEnumKeys = Object.keys(WeekdaysEnum).filter((v) => isNaN(Number(v)));;
    timepickers: { [key: string]: NgxMaterialTimepickerComponent } = {};

    fg = this.fb.group({
        monday: this.createDailyScheduleGroup(WeekdaysEnum.Monday),
        tuesday: this.createDailyScheduleGroup(WeekdaysEnum.Tuesday),
        wednesday: this.createDailyScheduleGroup(WeekdaysEnum.Wednesday),
        thursday: this.createDailyScheduleGroup(WeekdaysEnum.Thursday),
        friday: this.createDailyScheduleGroup(WeekdaysEnum.Friday),
        saturday: this.createDailyScheduleGroup(WeekdaysEnum.Saturday),
        sunday: this.createDailyScheduleGroup(WeekdaysEnum.Sunday)
    });

    constructor(private fb: FormBuilder, private store: Store<AppState>) {
        this.selectClinics();
        this.selectSchedule();
    }

    ngOnInit(): void {
        this.dispatchClinics();
        this.dispatchSchedule();
    }

    createDailyScheduleGroup(day: WeekdaysEnum): FormGroup {
        const group = this.fb.group({
            startHour: ['', Validators.required],
            endHour: ['', Validators.required],
            duration: ['', Validators.required],
            remote: [false, Validators.required],
            dayOff: [false, Validators.required],
            clinicId: ['', Validators.required],
            weekday: [day, Validators.required]
        });

        group.get('remote')?.valueChanges.subscribe(() => {
            this.updateRemoteControl(group);
        });

        group.get('dayOff')?.valueChanges.subscribe(() => {
            this.updateDayOffControls(group);
        });

        return group
    }

    handleSubmit(): void {
        if (this.isEdit) {
            this.store.dispatch(VisitsActions.updateDoctorSchedule({ request: this.fg.value as WeeklyWorkSchedule }))
        } else {
            this.store.dispatch(VisitsActions.addDoctorSchedule({ request: this.fg.value as WeeklyWorkSchedule }))
        }
    }

    getFormGroup(day: string): FormGroup {
        return this.fg.get(day) as FormGroup
    }

    dispatchClinics(): void {
        this.store.dispatch(DoctorsActions.getDoctorClinics());
    }

    selectClinics(): void {
        this.clinics$ = this.store.select(getDoctorClinicsSelector);
    }

    dispatchSchedule(): void {
        this.store.dispatch(VisitsActions.getDoctorSchedule())
    }

    selectSchedule(): void {
        this.store.select(getDoctorScheduleSelector).subscribe(schedule => {
            if (schedule) {
                this.isEdit = true;
                this.patchForm(schedule);
            }
        })
    }

    patchForm(schedule: WeeklyWorkSchedule): void {
        this.patchDay('monday', schedule.monday);
        this.patchDay('tuesday', schedule.tuesday);
        this.patchDay('wednesday', schedule.wednesday);
        this.patchDay('thursday', schedule.thursday);
        this.patchDay('friday', schedule.friday);
        this.patchDay('saturday', schedule.saturday);
        this.patchDay('sunday', schedule.sunday);
    }

    patchDay(dayString: string, day: WeekdayWorkingHours): void {
        this.fg.get(dayString)?.patchValue({
            startHour: day.startHour.slice(0, 5),
            endHour: day.endHour.slice(0, 5),
            duration: day.duration,
            remote: day.remote,
            dayOff: day.dayOff,
            clinicId: day.clinicId,
            weekday: day.weekday
        })

        if(day.remote){
            this.fg.get(dayString)?.get('clinicId')?.disable();
        }
    }

    updateRemoteControl(group: FormGroup) {
        const clinicIdControl = group.get('clinicId');
        const remoteControl = group.get('remote');
        console.log(remoteControl)
        if (remoteControl?.value) {
            clinicIdControl?.disable();
        } else {
            clinicIdControl?.enable();
        }
    }

    updateDayOffControls(group: FormGroup) {
        const controlsToDisable = [
            'startHour',
            'endHour',
            'duration',
            'remote',
            'clinicId',
        ];

        const dayOffControl = group.get('dayOff');

        controlsToDisable.forEach((controlName) => {
            if (dayOffControl?.value) {
                group.get(controlName)?.disable();
            } else {
                group.get(controlName)?.enable();
            }
        });
    }
}
