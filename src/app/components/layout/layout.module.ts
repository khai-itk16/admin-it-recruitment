import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { PositionComponent } from './position/position.component';
import { JobPostComponent } from './job-post/job-post.component';


@NgModule({
  declarations: [LayoutComponent, DashboardComponent, AccountComponent, PositionComponent, JobPostComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
