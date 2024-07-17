import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MykeycloakService {

  constructor(private keycloakService: KeycloakService) { }

  async init(): Promise<void> {
    try {
      await this.keycloakService.init({
        config: {
          url: environment.keycloak.authority,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        initOptions: {
          onLoad: 'login-required'
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets', '/clients/public']
      });
      this.logTokenAndRoles(); // Call the logTokenAndRoles method after initialization
    } catch (error) {
      console.error('Error initializing Keycloak.', error);
    }
  }

  async getUserRoles(): Promise<string[]> {
    const keycloak = this.keycloakService.getKeycloakInstance();
    if (keycloak && keycloak.authenticated) {
      return keycloak.tokenParsed?.realm_access?.roles || [];
    }
    return [];
  }

  login(): void {
    this.keycloakService.login();
  }

  async logTokenAndRoles(): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      console.log('Token:', token);
      
      const roles = await this.getUserRoles();
      console.log('Roles:', roles);
    } catch (error) {
      console.error('Error retrieving token or roles.', error);
    }
  }

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }
}
