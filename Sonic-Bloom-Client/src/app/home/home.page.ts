import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MapComponent } from '../components/map/map.component';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonButton, MapComponent, FormComponent]
})
export class HomePage {
  
  constructor() { }

}
