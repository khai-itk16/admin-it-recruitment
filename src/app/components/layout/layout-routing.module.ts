import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CensorJobPostComponent } from './censor-job-post/censor-job-post.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobPostDetailComponent } from './job-post-detail/job-post-detail.component';
import { JobPostComponent } from './job-post/job-post.component';
import { LayoutComponent } from './layout.component';
import { PositionComponent } from './position/position.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "users",
        component: AccountComponent
      },
      {
        path: "position",
        component: PositionComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "change-password",
        component: ChangePasswordComponent
      },
      {
        path: "job-post",
        component: JobPostComponent
      },
      {
        path: "job-post-detail",
        component: JobPostDetailComponent
      },
      {
        path: "censor-job-post",
        component: CensorJobPostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
