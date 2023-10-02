import { Component, OnInit } from '@angular/core';
import { SwiperSlides } from 'src/app/constants/main-page/slides.constant';
import { SwiperSlide } from 'src/app/models/main-page/swiper-slide.model';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

    slides: SwiperSlide[] = SwiperSlides;

    ngOnInit(): void {
        register();
    }

}
