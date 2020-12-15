import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../../member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  user: any = {}
  resetUser: any = {};
  
  constructor(private memberService: MemberService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      empid: ['', Validators.required],
      designation: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  get f() { return this.employeeForm.controls; }


  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.employeeForm.invalid) {
            return;
        }

        this.user = this.employeeForm.value;
        

        this.resetUser = JSON.parse(localStorage.getItem('Users'));
        console.log(this.resetUser);
        console.log(this.user.empid);

        if(!this.resetUser.some((item) => item.empid == this.user.empid))
        {
          this.memberService.addUser(this.user);
          alert('Data added successfully');
          this.employeeForm.reset();
          this.submitted = false;
        } 
        else
        {
          alert("employee id already exist");
        }
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employeeForm.value));
      }
}