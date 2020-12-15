import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../member.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {
  members: any = [];
  editUser: []; 
  editMember: FormGroup;
  submitted = false;

  constructor(private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder) { }
    
    ngOnInit(): void {
      this.getMember();
      this.editUser = this.members.filter(item => item.empid == this.router.url.replace("/edit/", ""));

      this.editMember = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        empid: ['', Validators.required],
        designation: ['', Validators.required],
        message: ['', Validators.required],
      });
    }

    get f() { return this.editMember.controls; }

    getMember(): void {
      this.members = JSON.parse(localStorage.getItem('Users'));
    }

    update(e) {
      this.editUser = this.members.filter(item => item.empid == e);

      this.submitted = true;
      if (this.editMember.invalid) {
        return;
    }
    alert('Updated');
    this.editUser = this.editMember.value;
    this.memberService.updateUser(this.editUser);
  }

  goBack() {
    this.location.back();
  }
}