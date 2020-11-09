import { Component, OnInit } from '@angular/core';

declare const $: any

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#dataTables-users').dataTable();
  }

}
