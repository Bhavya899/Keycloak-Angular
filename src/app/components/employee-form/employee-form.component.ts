import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';

import { ActivatedRoute, Router } from '@angular/router';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,MatFormFieldModule,ReactiveFormsModule,CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  constructor(private formBuilder: FormBuilder) {}
  httpService = inject(HttpService);
 router =inject(Router);
route=inject(ActivatedRoute);
  employeeForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    age: [0, [Validators.required, Validators.min(18), Validators.max(100)]],
    salary: [0, [Validators.required, Validators.min(0)]]

});
employeeId!:number;
isEdit = false;


ngOnInit(){
  this.employeeId=this.route.snapshot.params['id'];
  if(this.employeeId)
    {
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe((result:any)=>{
        console.log(result);
        const firstEmployee = result;
        this.employeeForm.patchValue({
          firstName: firstEmployee.firstName,
          lastName: firstEmployee.lastName,
          age: firstEmployee.age, // Ensure age is converted to string if your form expects a string
          salary: firstEmployee.salary, // Convert salary to string if necessary
        });
      })
    }
}
save(){
  debugger; 
  if(this.employeeForm.valid){
    console.log(this.employeeForm.value);
    const employee:IEmployee={
     firstName:this.employeeForm.value.firstName!,
     lastName:this.employeeForm.value.lastName!,
     age:Number(this.employeeForm.value.age),
     salary:Number(this.employeeForm.value.salary),

    }
    if(this.isEdit){
      this.httpService.updateEmployee(this.employeeId,employee).subscribe(()=>{
        console.log("success");
                // window.location.reload();
        this.router.navigateByUrl("/employee-list");

    });
  }
    else{
      this.httpService.createEmployee(employee).subscribe(()=>{
        console.log("success");
        this.router.navigateByUrl("/employee-list");
        // window.location.reload();
      });
    }

    
    

  }
  
}
}
