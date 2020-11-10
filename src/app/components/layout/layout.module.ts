import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { PositionComponent } from './position/position.component';
import { JobPostComponent } from './job-post/job-post.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CensorJobPostComponent } from './censor-job-post/censor-job-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ModalPositionComponent } from './modal-position/modal-position.component';
import { ModalAccountComponent } from './modal-account/modal-account.component';


@NgModule({
  declarations: [
    LayoutComponent, 
    DashboardComponent, 
    AccountComponent, 
    PositionComponent, 
    JobPostComponent,
    ProfileComponent, 
    ChangePasswordComponent, 
    CensorJobPostComponent,
    ModalPositionComponent,
    ModalAccountComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    MatDialogModule
  ],
  entryComponents: [
    ModalPositionComponent,
    ModalAccountComponent
  ]
})
export class LayoutModule { }
