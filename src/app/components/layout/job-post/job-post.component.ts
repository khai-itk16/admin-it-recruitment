import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { JobPostService } from 'src/app/services/job-post.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {

  jobPosts: Array<any>

  constructor(
    private jobPostService: JobPostService,
    private dataTransferSevice: DataTransferService,
    private router: Router
  ) { }

  filter
  key: string = 'timeCreate'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  ngOnInit(): void {
    this.jobPostService.getAllJobPostByStatus(2).subscribe(
      res => {
        this.jobPosts = res
      },
      error => { console.log(error) }
    )
  }

  viewDetail(jobPost) {
    this.dataTransferSevice.setpreviewdata(jobPost)
    this.router.navigate(['/admin/job-post-detail'])
  }

}
