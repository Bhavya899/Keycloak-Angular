import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MykeycloakService } from './mykeycloak.service';

@Injectable({
  providedIn: 'root'
})
export class LogUserRoleResolver implements Resolve<void> {
  constructor(private mykeycloakService: MykeycloakService) {}

  async resolve(): Promise<void> {
    const roles = await this.mykeycloakService.getUserRoles();
    if (roles.length === 0) {
      console.log('Role: Unknown');
    } else if (roles.includes('Admin')) {
      console.log('Role: Admin');
    } else if (roles.includes('user')) {
      console.log('Role: User');
    } else {
      console.log('Roles:', roles);
    }
  }
}
