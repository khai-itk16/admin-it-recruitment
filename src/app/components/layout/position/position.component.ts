import { Component, OnInit } from '@angular/core';

declare const $: any

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#dataTables-positions').dataTable();
  }

}
