import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "http://localhost:5131";
  http=inject(HttpClient);

  constructor() { } 

  getAllEmployee(){
    return this.http.get<IEmployee[]>(this.apiUrl+"/api/Employee/displayEmployee")
  }
  createEmployee(employee:IEmployee){
    return this.http.post(this.apiUrl+"/api/Employee/addEmployee",employee);
  }

  getEmployee(employeeId:number){
    return this.http.get<IEmployee[]>(this.apiUrl+"/api/Employee/getEmployee/"+employeeId)
  }
  updateEmployee(employeeId:number,employee:IEmployee){
    return this.http.put<IEmployee[]>(this.apiUrl+"/api/Employee/updateEmployee/"+employeeId,employee)
  }
  deleteEmployee(employeeId:number){
    return this.http.delete<IEmployee[]>(this.apiUrl+"/api/Employee/deleteEmployee/"+employeeId)
  }
}
