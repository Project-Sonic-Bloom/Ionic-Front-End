import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientService } from 'src/app/services/http-service/http-client.service';
import { environment } from '../../../environments/environment.prod';
import html2canvas from 'html2canvas';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [GoogleMapsModule]
})

export class MapComponent {
  constructor(private httpClientService: HttpClientService, private domSanitizer: DomSanitizer) { }
  // really helpful tutorial that helped me gain a deeper understanding of how the @ViewChild decorator & ElementRef class can be used 
  // to get/use an element from the template.
  // https://www.youtube.com/watch?v=uoLzWRZgXiA
  // get the canvas element
  @ViewChild('canvasOverlay') canvasOverlay!: ElementRef<HTMLCanvasElement>;
  @ViewChild('map') map!: ElementRef<HTMLDivElement>;

  backEnd: string = "http://127.0.0.1:5000/";
  // https://v17.angular.io/guide/security#xss sanitize the url to bypass security concerns due to the maps key being a variable
  // map_url = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/view?key=" + environment.maps_key + "&center=53.4297953,-8.4111406&maptype=satellite&zoom=7");
  map_url = this.domSanitizer.bypassSecurityTrustResourceUrl(environment.maps_key);
  center: google.maps.LatLngLiteral = { lat: 53.4297953, lng: -6.2603107};

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
    const map = this.map.nativeElement;

    html2canvas(map).then((canvas) => {
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


    // this.saveMap();
    // console.log("sent get")
    // //send a get request to let the server know it has to take a screenshot
    // this.httpClientService.get(this.backEnd + "GetScreenshot").subscribe(
    //   (response) => {
    //     console.log(response);
    //   }
    // )
  }

  // Function to save the map/canvas div state in cookies
  // This is done by extracting a link from the iframe that contains the co-ordinates
  saveMap(): void {

    // DOES NOT WORK DUE TO CORS ERROR

    // // iterate over all of the elements in the iframe
    // document.querySelectorAll("iframe").forEach((iframe, index) => {
    //   // console.log("here")
    //   try {
    //     // ensure iframe exists
    //     const iframeDocument = (iframe as HTMLIFrameElement).contentDocument;
    //     console.log(`Found ${iframeDocument} iframe`);
    //     if (iframeDocument) {
    //       console.log("here")

    //       // find the anchor tag that has the link
    //       const anchor = iframeDocument.querySelector('.google-maps-link a');
    //       if (anchor && anchor instanceof HTMLAnchorElement) {
    //         const url = anchor.href;
    //         console.log(`URL: ${url}`);
    //         // You can store the URL in an array or perform another action
    //       }
    //     }
    //   } catch (error) {
    //     console.error(`Error accessing iframe ${index}:`, error);
    //   }
    // });
  }


}
