import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

declare const $: any

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: any

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllAccounts()
  }

  getAllAccounts() {
    this.accountService.getAllAccounts().subscribe(
      res => {
        console.log(res)
        this.accounts = res
        $(document).ready(function() {
          $('#dataTables-users').dataTable();
        })
      },
      error => {
        console.log(error)
      }
    )
  }

}
