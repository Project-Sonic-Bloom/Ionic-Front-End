import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClientService } from '../services/http-service/http-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonCardContent, IonButton]
})
export class HomePage {

  selectedFile: File | null = null;
  backEnd: string = "http://127.0.0.1:5000/"
  
  constructor(private httpClientService: HttpClientService) { }

  onSubmit(){
    // Use subscribe to access observable because it allows for the asynchronous processing required of HttpClient's get method/observable that is returned
    this.httpClientService.get(this.backEnd).subscribe(
      (response) => {
        console.log('Data received:', response);
      })
  }

}
