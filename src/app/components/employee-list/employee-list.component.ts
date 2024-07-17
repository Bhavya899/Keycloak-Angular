import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule,MatToolbarModule,CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
router = inject(Router)
keycloakService = inject(KeycloakService)
employeeList:IEmployee[]=[];
isUser: boolean = false;
  isAdmin: boolean = false;
httpService = inject(HttpService);
displayedColumns: string[] = ['employeeId', 'firstName','lastName', 'age', 'salary','Action'];
ngOnInit(){
debugger;
this.loadEmployee();
this.checkUserRoles(); // Call a method to check user roles when the component initializes

}

async checkUserRoles() {
  const userRoles = await this.keycloakService.getUserRoles();
  if (userRoles.includes('Admin')) {
  this.isAdmin = true;
  } else {
    this.isAdmin = false;
  }
  if (userRoles.includes('User')) {
     this.isUser = true;
    } else {
     this.isUser = false;
    }

}
logout() {
  this.keycloakService.logout();
}

loadEmployee()
{
  this.httpService.getAllEmployee().subscribe(result=>{
    this.employeeList =result;
    console.log(this.employeeList);
});
  }

  edit(employeeId:number)
  {
console.log(employeeId);
this.router.navigateByUrl("employee/"+employeeId);
  }
  delete(employeeId:number)
  {
         this.httpService.deleteEmployee(employeeId).subscribe(()=>{
          console.log("deleted");
          this.loadEmployee();
         })
  }

  
}
