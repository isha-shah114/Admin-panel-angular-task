import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private route: ActivatedRoute,
    private router: Router,) { }

  addUser(user)
  {
    let users:any =[];

    if(localStorage.getItem('Users'))
    {
      users = JSON.parse(localStorage.getItem('Users'));
      users.push(user);  
    }
    else{
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  updateUser(editUser)
  {
    let users:any =[];
    users = JSON.parse(localStorage.getItem('Users'));
    let userEdit = users.filter(item => item.empid != this.router.url.replace("/edit/", ""));
    let user = users.filter(item => item.empid == this.router.url.replace("/edit/", ""));

    if(editUser.empid == user[0].empid)
    {
      userEdit.push(editUser);
    }
    
    localStorage.setItem('Users', JSON.stringify(userEdit));
  }
}