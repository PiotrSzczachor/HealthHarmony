import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {
    ngOnInit(): void {
        register();
    }
}
