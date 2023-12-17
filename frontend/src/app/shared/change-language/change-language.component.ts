import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent {

    fg = this.fb.group({
        language: ['', Validators.required]
    })

    constructor(private translate: TranslateService, private matDialogRef: MatDialogRef<ChangeLanguageComponent>, private fb: FormBuilder) {}

    confirm(): void {
        if(this.fg.valid) {
            this.translate.use(this.fg.controls['language'].value as string);
            this.matDialogRef.close();
        }
    }

    cancel(): void {
        this.matDialogRef.close();
    }
}
