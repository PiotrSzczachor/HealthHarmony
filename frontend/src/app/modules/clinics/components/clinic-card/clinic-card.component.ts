import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { Image } from 'src/app/models/shared/image.model';
import { register } from 'swiper/element/bundle';
import { EditClinicComponent } from '../../containers/edit-clinic/edit-clinic.component';
import { AuthService } from 'src/app/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {
    @Input() clinic!: Clinic;

    constructor(private dialog: MatDialog, private authService: AuthService) { }

    ngOnInit(): void {
        register();
    }

    openEditDialog(): void {
        if(this.isAdmin())
            this.dialog.open(EditClinicComponent, {data: {isEdit: true, id: this.clinic.id}})
    }

    isAdmin(): boolean {
        return this.authService.checkIfUserHasRole(Roles.Admin)
    }

}
