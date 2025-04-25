import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientService } from 'src/app/services/http-service/http-client.service';
import { FileService } from 'src/app/services/file-service/file.service';
import { environment } from '../../../environments/environment.prod';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [GoogleMapsModule, NgFor]
})

export class MapComponent {
  constructor(private httpClientService: HttpClientService, private fileService: FileService) { }
  // really helpful tutorial that helped me gain a deeper understanding of how the @ViewChild decorator & ElementRef class can be used 
  // to get/use an element from the template.
  // https://www.youtube.com/watch?v=uoLzWRZgXiA
  // get the canvas element
  @ViewChild(GoogleMap) googleMap!: GoogleMap;//for typescript abilities
  @ViewChild('map') map!: ElementRef<HTMLDivElement>;

  backEnd: string = "http://127.0.0.1:5000/";

  // Make the map
  markers: any[] = [];
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapId: '13f868347395f4d9',
    center: { lat: 53.4356987, lng: -8.5634334 },
    zoom: 7,
    disableDefaultUI: false
  };

  // hook method angular provides https://angular.dev/api/core/AfterViewInit
  ngAfterViewInit() {
    this.initMap();
    this.setupFileListeners();
  }

  initMap() {
    // Get the map DOM element
    const mapElement = this.googleMap.googleMap!.getDiv();

    // Prevent default drag behavior
    mapElement.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
    });

    // Handle drop event
    mapElement.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.handleFileDrop(event);
    });
  }

  private setupFileListeners() {
    this.fileService.files$.subscribe(files => {
      // Clear existing markers
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];

      // Add markers for files added via form component to the center of the map
      files.forEach(({ file, position }) => {
        this.addMarker(
          position || this.options.center!, 
          file.name
        );
      });
    });
  }

  handleFileDrop(event: DragEvent) {
    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;
    
    // Prevent default browser behavior
    event.preventDefault();
    
    // Get the map container and its position
    const mapDiv = this.googleMap.googleMap!.getDiv();
    const mapRect = mapDiv.getBoundingClientRect();
    
    // Create a point at the drop location relative to the map container
    const x = event.clientX - mapRect.left;
    const y = event.clientY - mapRect.top;
    
    // Use the Maps API to convert point to lat/lng
    const point = new google.maps.Point(x, y);
    
    // Use the OverlayView method to ensure changes to the map are made accurate
    const overlay = new google.maps.OverlayView();
    overlay.setMap(this.googleMap.googleMap!);
    
    overlay.draw = () => {}; // Empty draw method required
    
    overlay.onAdd = () => {
      const projection = overlay.getProjection();
      const latLng = projection.fromContainerPixelToLatLng(point);

      if (!latLng) return;

      console.log("Dropped at coordinates:", latLng.lat(), latLng.lng());
      
      // Add marker at the drop position
      this.addMarker(latLng, files[0].name);
    };
  }
  
  async addMarker(position: any, title: string) {
    const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    console.log(position, title)

    const marker = new Marker({
      map: this.googleMap.googleMap,
      position: position,
      label: {
        text: title,
        color: "white",
        fontWeight: "bold",
        fontSize: "16px"
      },
      draggable: true
    });

    marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      this.updateFilePosition(title, event.latLng!.toJSON());
    });

    this.markers.push(marker);
  }

  private updateFilePosition(fileName: string, newPosition: google.maps.LatLngLiteral) {
    const files = this.fileService.filesSubject.value;
    const updated = files.map(f => 
      f.file.name === fileName ? { ...f, position: newPosition } : f
    );
    this.fileService.filesSubject.next(updated);
  }

  async screenshotMap() {
    
  }

  saveMap(): void {

  }


}
