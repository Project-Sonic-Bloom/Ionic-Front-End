import { Injectable } from '@angular/core';

// The following guide help me figure out how to properly import and use dependancy injections in angular standalone components
// After reading the guide below and specifically this code I realised the root is where the providers array is and that varies from 
// project to project! (root is main.ts in this case)
// providers: [
//   provideHttpClient(),
// ]
// https://angular.dev/guide/http/setup
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {
    
  }

  get(url: string){
    return this.httpClient.get(url, { responseType: 'text' })//second param specifies what is returned https://angular.dev/guide/http/making-requests 
  }
}
