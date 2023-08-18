import { Component, OnInit } from '@angular/core';
import { SwiperSlide } from 'src/app/models/main-page/swiper-slide.model';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

    slides: SwiperSlide[] = [
        {
            name: "1",
            src: "../../../../../assets/slider-images/1.jpg",
            title: "Modern medical offices",
            content: "Our clinic has modern specialist equipment"
        },
        {
            name: "2",
            src: "../../../../../assets/slider-images/2.jpg",
            title: "Modern medical offices",
            content: ""
        },
        {
            name: "3",
            src: "../../../../../assets/slider-images/3.jpg",
            title: "Modern medical offices",
            content: ""
        },
        {
            name: "4",
            src: "../../../../../assets/slider-images/4.jpg",
            title: "Modern medical offices",
            content: ""
        },
    ]

    ngOnInit(): void {
        register();
    }

}
