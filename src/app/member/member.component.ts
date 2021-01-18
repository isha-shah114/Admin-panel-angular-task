import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})

export class MemberComponent implements OnInit {
  members: any = [];
  addData: {};
  deleteUser;
  constructor(private memberService: MemberService, public dialog: MatDialog) {
  }
  
  ngOnInit(): void {
    this.members = JSON.parse(localStorage.getItem('Users'));
  }

  delete(member): void {
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, { 
      data: {
        title: 'Confirm Remove Employee',
        message: 'Are you sure, you want to remove an employee: ' + member.firstName
      }
    });
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === true) {
        let items = JSON.parse(localStorage.getItem("Users"));
      
        for (let i=0; i< items.length; i++) 
        {
          if (items[i].empid == member.empid) 
          {
              items.splice(i, 1);
          }
      }
      items = JSON.stringify(items);
      localStorage.setItem("Users", items);
      this.members = this.members.filter(h => h !== member);
      }
    });
  }
}