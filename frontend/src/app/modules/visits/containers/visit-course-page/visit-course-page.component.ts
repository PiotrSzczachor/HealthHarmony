import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/models/visits/visit.model';
import { AppState } from 'src/app/store/app.state';
import { VisitsActions, getVisitSelector } from '../../store';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecomendationTemplate } from 'src/app/constants/visits/medical-recomendation.constant';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var html2pdf: any;


@Component({
    selector: 'app-visit-course-page',
    templateUrl: './visit-course-page.component.html',
    styleUrls: ['./visit-course-page.component.scss']
})
export class VisitCoursePageComponent implements OnInit {

    id!: string;
    visit$!: Observable<Visit | undefined>;
    visit!: Visit | undefined;

    fg: FormGroup = this.fb.group({
        description: ['', Validators.required],
        symptoms: [{value: '', disabled: true}],
        medicines: this.fb.array([])
    });

    constructor(private store: Store<AppState>, private route: ActivatedRoute, private fb: FormBuilder) {
        this.id = this.route.snapshot.paramMap.get('id') as string;
        this.selectVisit();
    }

    ngOnInit(): void {
        this.dispatchVisit(this.id)
    }

    get medicines(): FormArray {
        return this.fg.controls['medicines'] as FormArray;
    }

    addMedicine() {
        this.medicines.push(this.fb.group({
            name: ['', Validators.required],
            dosage: ['', Validators.required],
        }));
    }

    removeMedicine(index: number) {
        this.medicines.removeAt(index);
    }

    dispatchVisit(id: string): void {
        this.store.dispatch(VisitsActions.getVisitById({ id }))
    }

    selectVisit(): void {
        this.visit$ = this.store.select(getVisitSelector);
        this.visit$.subscribe(visit => {
            this.visit = visit
            this.fg.patchValue({
                symptoms: visit?.symptoms
            });
        });
    }

    generatePDF() {
        var htmlString = MedicalRecomendationTemplate;

        if (this.visit) {
            htmlString = htmlString.replace(new RegExp(`{{CLINIC_NAME}}`, 'g'), this.visit.clinic.name)
                .replace(new RegExp(`{{CLINIC_EMAIL}}`, 'g'), this.visit.clinic.email)
                .replace(new RegExp(`{{CLINIC_PHONE_NUMBER}}`, 'g'), this.visit.clinic.phoneNumber)
                .replace(new RegExp(`{{PATIENT_NAME}}`, 'g'), this.visit.patient?.firstName + ' ' + this.visit.patient?.lastName)
                .replace(new RegExp(`{{PATIENT_PESEL}}`, 'g'), this.visit.patient?.pesel as string)
                .replace(new RegExp(`{{PATIENT_BIRTH_DATE}}`, 'g'), this.visit.patient?.birthDate as string)
                .replace(new RegExp(`{{PATIENT_EMAIL}}`, 'g'), this.visit.patient?.email as string)
                .replace(new RegExp(`{{PATIENT_PHONE_NUMBER}}`, 'g'), this.visit.patient?.phoneNumber as string)
                .replace(new RegExp(`{{DOCTOR_NAME}}`, 'g'), this.visit.doctor.firstName + ' ' + this.visit.doctor.lastName)
                .replace(new RegExp(`{{DOCTOR_SPECIALIZATIONS}}`, 'g'), this.visit.doctor.specializations.map(item => item.name).join(', '))
                .replace(new RegExp(`{{DOCTOR_EMAIL}}`, 'g'), this.visit.doctor.email)
                .replace(new RegExp(`{{VISIT_DESCRIPTION}}`, 'g'), this.fg.controls['description'].value)

            var medicinesList = ""

            this.medicines.value.forEach((x: any) => {
                medicinesList += this.generateMedicineHTML(x);
            })

            htmlString = htmlString.replace(new RegExp(`{{MEDICINES_LIST}}`, 'g'), medicinesList)

            const options = {
                margin: 10,
                filename: this.visit.patient?.firstName + '_' + this.visit.patient?.lastName + '_' + new Date().toLocaleDateString() + '.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            return html2pdf().from(htmlString).set(options);
        }
    }

    generateMedicineHTML(item: any): string {
        return `
          <h4 style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">${item.name}</h4>
          <p style="font-family: 'Arial, sans-serif';">${item.dosage}</p>
          <br>
        `;
    }

    downloadPDF(): void {
        const pdfInstance = this.generatePDF();
        pdfInstance.save();
    }

    printPDF(): void {
        const pdfInstance = this.generatePDF();

    if (!pdfInstance) {
        console.error('PDF instance is not available.');
        return;
    }

    pdfInstance.output().then((pdfData: string | undefined) => {
        if (!pdfData) {
            console.error('PDF data is undefined.');
            return;
        }

        const byteArray = new Uint8Array(pdfData.length);
        for (let i = 0; i < pdfData.length; i++) {
            byteArray[i] = pdfData.charCodeAt(i) & 0xff;
        }

        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const dataUrl = URL.createObjectURL(blob);
        const printWindow = window.open(dataUrl, '_blank');

        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
                URL.revokeObjectURL(dataUrl);
            };
        } else {
            console.error('Failed to open print window.');
            URL.revokeObjectURL(dataUrl);
        }
    }).catch((error: any) => {
        console.error('Error during PDF generation or printing:', error);
    });
    }
    

    completeVisit(): void {
        
    }
}
