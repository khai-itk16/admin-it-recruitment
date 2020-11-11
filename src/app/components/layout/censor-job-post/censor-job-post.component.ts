import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { JobPostService } from 'src/app/services/job-post.service';

declare const $: any

@Component({
  selector: 'app-censor-job-post',
  templateUrl: './censor-job-post.component.html',
  styleUrls: ['./censor-job-post.component.css']
})
export class CensorJobPostComponent implements OnInit {

  jobPosts: Array<any>

  constructor(
    private jobPostService: JobPostService,
    private dataTransferSevice: DataTransferService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.jobPostService.getAllJobPostByStatus(1).subscribe(
      res => {
        this.jobPosts = res
      },
      error => { console.log(error) }
    )
  }

  viewRequirePost(jobPost) {
    $("#job_description_"+jobPost.jobPostId).html(jobPost.jobDescription)
    $("#skills_experience_"+jobPost.jobPostId).html(jobPost.jobRequire)
  }

  viewDetail(jobPost) {
    this.dataTransferSevice.setpreviewdata(jobPost)
    this.router.navigate(['/admin/job-post-detail'])
  }

  accept(jobPostId) {
    // 2 là trạng thái đã phê duyệt
    this.jobPostService.changeStatusJobPost(jobPostId, 2).subscribe(
      res => {
        let index = this.jobPosts.findIndex(jobPost => jobPost.jobPostId == jobPostId)
        this.jobPosts.splice(index, 1)
        this.toastrService.success("Bài đăng đã được phê duyệt", "SUCCESS", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  deny(jobPostId) {
    // 3 là trạng thái bị từ chối
    this.jobPostService.changeStatusJobPost(jobPostId, 3).subscribe(
      res => {
        let index = this.jobPosts.findIndex(jobPost => jobPost.jobPostId == jobPostId)
        this.jobPosts.splice(index, 1)
        this.toastrService.success("Bài đăng đã bị từ chối", "SUCCESS", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      },
      error => {
        console.log(error)
      }
    )
  }

}
