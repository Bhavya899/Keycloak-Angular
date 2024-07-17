import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MykeycloakService } from './mykeycloak.service';
import { KeycloakService } from 'keycloak-angular';
function initializeKeycloak(myKeycloakService: MykeycloakService) {
  return () => myKeycloakService.init();
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()),MykeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [MykeycloakService],
      multi: true
    },
    KeycloakService,
  ]
};
