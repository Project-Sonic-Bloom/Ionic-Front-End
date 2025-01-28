import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent {
  // really helpful tutorial that helped me gain a deeper understanding of how the @ViewChild decorator & ElementRef class can be used 
  // to get/use an element from the template.
  // https://www.youtube.com/watch?v=uoLzWRZgXiA
  // get the canvas element
  @ViewChild('canvasOverlay') canvasOverlay!: ElementRef<HTMLCanvasElement>;
  @ViewChild('entireMap') entireMap!: ElementRef<HTMLDivElement>;

  constructor() { }

  // obviously a hook method angular provides https://angular.dev/api/core/AfterViewInit
  ngAfterViewInit() {
    this.initCanvas();
  }

  initCanvas() {
    // canvas is native to html not typescript so to edit a html elements properties in angular the code below is needed
    // Same code but in a javascript example: const canvas = document.getElementById("canvasOverlay");
    // https://tutorialscamp.com/angular-viewchild/
    const canvas = this.canvasOverlay.nativeElement;

    // canvas logic below found from last year's graphics programming module
    const ctx = canvas.getContext('2d');
  }

  sendMapToBackend() {
    const entireMap = this.entireMap.nativeElement;

    html2canvas(entireMap).then((canvas) => {
      // Convert canvas to an image
      const image = canvas.toDataURL('image/png');

      // Trigger download or preview the image
      const link = document.createElement('a');
      link.href = image;
      link.download = 'map-screenshot.png';
      link.click();
    }).catch((error) => {
      console.error('Error capturing the map:', error);
    });
}


}
