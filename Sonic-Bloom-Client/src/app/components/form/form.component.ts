import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { HttpClientService } from 'src/app/services/http-service/http-client.service';
import { FileService } from 'src/app/services/file-service/file.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonButton]
})

export class FormComponent {

  // storing files
  files: File[] = [];
  backEnd: string = "http://127.0.0.1:5000/";
  generateHeatmapEndpoint: string = "GenerateHeatmap";

  // trigger when drag DOM events happen
  isDragOver = false;


  constructor(private httpClientService: HttpClientService, private fileService: FileService) { }

  onSubmit(event: Event) {
    event.preventDefault();// stop the submit from refreshing the page (debug purpose)
    // Use subscribe to access observable because it allows for the asynchronous processing required of HttpClient's get method/observable that is returned
    this.generateHeatmapPost();
  }

  generateHeatmapPost(){
    this.httpClientService.post(this.backEnd + this.generateHeatmapEndpoint, this.files).subscribe(
      (response) => {
        console.log('Data received:', response);
      }
    );
  }

  onDragOver(event: Event) {

    // stop unintended behaviours
    event.preventDefault();

    // stops bubbling actions to parent elements of the event that would lead to unintended behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples#example_5_event_propagation
    event.stopPropagation();

    // changes css mainly
    this.isDragOver = true;
  }

  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    // use dataTransfer to access files from drop
    // https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      // access the files
      const files = event.dataTransfer.files;

      // take the variable files: FileList and convert to files :File[]
      // REASONS: for global visibility and to abstract away from the niche drag functionality FileList is associated with
      this.files = Array.from(files);

      // log the file name and size for debugging
      console.log('File dropped:', files);
    }
  }
}