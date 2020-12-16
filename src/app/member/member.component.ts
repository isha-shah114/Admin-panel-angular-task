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
  currentGame;
  deleteUser;
  index;
  constructor(private memberService: MemberService, public dialog: MatDialog) {
    this.currentGame = JSON.parse(localStorage.getItem('members'));
   }
  
  ngOnInit(): void {
    this.getMembers(); 
  }

  getMembers(): void {
    this.members = JSON.parse(localStorage.getItem('Users'));
    console.log(this.members.length);
  }

  delete(member): void {
    // window.alert('Are you sure you want to delete the record?')
    // this.members = this.members.filter(h => h !== member);
    // this.heroService.deleteHero(member).subscribe();
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, { 
      data: {
        title: 'Confirm Remove Employee',
        message: 'Are you sure, you want to remove an employee: ' + member.firstName
      }
    });
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === true) {
        let items = JSON.parse(localStorage.getItem("Users"));
      
        for (let i=0; i< items.length; i++) {
          console.log(items[i].empid);
          if (items[i].empid == member.empid) {
              items.splice(i, 1);
              console.log(i);
              console.log(member.empid);
          }
      }

      items = JSON.stringify(items);
      
      localStorage.setItem("Users", items);
      this.members = this.members.filter(h => h !== member);
      // result = member.members.indexOf(member);
      // this.index = this.members.findIndex(x => x.empid == member.empid );  
      //   this.members = this.members.splice(this.index, 1);
      //   console.log(this.index);
      //   console.log(this.members[0]);
          
        // this.deleteUser = this.members.filter(item => item.empid == member.empid);
        
        // localStorage.removeItem(this.index);
        // localStorage.setItem('Users', JSON.stringify(this.members));
      
      }
    });
  }
}
