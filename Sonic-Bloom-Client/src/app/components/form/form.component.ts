import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { HttpClientService } from 'src/app/services/http-service/http-client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonButton]
})
export class FormComponent {

  selectedFile: File | null = null;
  backEnd: string = "http://127.0.0.1:5000/"


  constructor(private httpClientService: HttpClientService) { }

  onSubmit(event: Event) {
    event.preventDefault();//stop the submit from refreshing the page (debug purpose)
    // Use subscribe to access observable because it allows for the asynchronous processing required of HttpClient's get method/observable that is returned
    this.httpClientService.get(this.backEnd).subscribe(
      (response) => {
        console.log('Data received:', response);
      })
  }

}
