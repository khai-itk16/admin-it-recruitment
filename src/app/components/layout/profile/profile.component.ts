import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileInfo

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getProfileInfo()
  }

  getProfileInfo() {
    const id=21
    this.accountService.getAccountById(id).subscribe(
      res => {
        console.log(res)
        this.profileInfo = res
      },
      error => {
        console.log(error)
      }
    )
  }


}
