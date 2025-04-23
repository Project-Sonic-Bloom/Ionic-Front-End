import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { environment } from './environments/environment.prod';

// where I learned about this alternative method of loading the maps api
// https://stackoverflow.com/questions/16340529/loading-google-maps-asynchronously
const loadGoogleMapsApi = () => {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.maps_key + '&libraries=marker&callback=Function.prototype&map_ids=13f868347395f4d9';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

// Load the API before bootstrapping the app
loadGoogleMapsApi();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
});
