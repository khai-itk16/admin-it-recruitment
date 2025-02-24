import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AccountService } from 'src/app/services/account.service';
import { JobPostService } from 'src/app/services/job-post.service';
import { PositionService } from 'src/app/services/position.service';

declare var $: any;
declare var Morris: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    numAccount: number
    numPosition: number
    numPostShow: number
    numPostWaitCensor: number

  constructor(
      private jobPostService: JobPostService,
      private accountService: AccountService,
      private positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.jobPostService.countJobPostByStatus(1).subscribe(
        res => { this.numPostWaitCensor = res },
        error => { console.log(error) }
    )

    this.jobPostService.countJobPostByStatus(2).subscribe(
        res => { this.numPostShow = res },
        error => { console.log(error) }
    )

    this.accountService.countAllAccounts().subscribe(
        res => { this.numAccount = res },
        error => { console.log(error) }
    )

    this.positionService.countAllJobPositions().subscribe(
        res => { this.numPosition = res },
        error => { console.log(error) }
    )
  }

//   initFunction(): void {
//     /* MORRIS AREA CHART*/
//    Morris.Area({
//      element: 'morris-area-chart',
//      data: [{
//          period: '2010 Q1',
//          iphone: 2666,
//          ipad: null,
//          itouch: 2647
//      }, {
//          period: '2010 Q2',
//          iphone: 2778,
//          ipad: 2294,
//          itouch: 2441
//      }, {
//          period: '2010 Q3',
//          iphone: 4912,
//          ipad: 1969,
//          itouch: 2501
//      }, {
//          period: '2010 Q4',
//          iphone: 3767,
//          ipad: 3597,
//          itouch: 5689
//      }, {
//          period: '2011 Q1',
//          iphone: 6810,
//          ipad: 1914,
//          itouch: 2293
//      }, {
//          period: '2011 Q2',
//          iphone: 5670,
//          ipad: 4293,
//          itouch: 1881
//      }, {
//          period: '2011 Q3',
//          iphone: 4820,
//          ipad: 3795,
//          itouch: 1588
//      }, {
//          period: '2011 Q4',
//          iphone: 15073,
//          ipad: 5967,
//          itouch: 5175
//      }, {
//          period: '2012 Q1',
//          iphone: 10687,
//          ipad: 4460,
//          itouch: 2028
//      }, {
//          period: '2012 Q2',
//          iphone: 8432,
//          ipad: 5713,
//          itouch: 1791
//      }],
//      xkey: 'period',
//      ykeys: ['iphone', 'ipad', 'itouch'],
//      labels: ['iPhone', 'iPad', 'iPod Touch'],
//      pointSize: 2,
//      hideHover: 'auto',
//      pointFillColors:['#ffffff'],
//      pointStrokeColors: ['black'],
//      lineColors:['#A6A6A6','#8ceab9'],
//      resize: true
//    });
//   }

}
