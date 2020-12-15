import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { AddMemberComponent } from './member/add-member/add-member.component';
import { EditMemberComponent } from './member/edit-member/edit-member.component';
import { EmployeeComponent } from './employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'member', component: MemberComponent },
  { path: 'add', component: AddMemberComponent },
  { path: 'edit/:empid', component: EditMemberComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
