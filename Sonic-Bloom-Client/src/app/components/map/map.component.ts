import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-service/http-client.service';

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

  backEnd: string = "http://127.0.0.1:5000/";

  constructor(private httpClientService: HttpClientService) { }

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

  async screenshotMap() {
    this.saveMap();
    console.log("sent get")
    //send a get request to let the server know it has to take a screenshot
    this.httpClientService.get(this.backEnd + "GetScreenshot").subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

  // Function to save the map/canvas div state in cookies
  saveMap(): void {
    const map = this.entireMap.nativeElement;
    if (!map) return;

    const mapState = {
      html: map.innerHTML, // Save content inside div
      width: map.clientWidth,
      height: map.clientHeight,
      position: map.getBoundingClientRect(), // Position info
    };

    document.cookie = `mapState=${encodeURIComponent(JSON.stringify(mapState))}; path=/; max-age=86400;`; // 1 day expiry
  }


}
