import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mainImage = {
    src: 'assets/home.jpg',
    alt: 'Main Meeting Room'
  };

  images = [
    { src: 'assets/m1.jpeg', alt: 'Meeting Room Small 1' },
    { src: 'assets/m2.jpeg', alt: 'Meeting Room Small 2' },
    { src: 'assets/m3.jpeg', alt: 'Meeting Room Small 3' },
    { src: 'assets/m4.avif', alt: 'Meeting Room Small 4' }
  ];

  onImageClick(img: { src: string; alt: string }) {
    this.mainImage = img;
  }
}
