import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { JobPostService } from 'src/app/services/job-post.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {

  jobPosts: Array<any>
  isExpire: boolean = false

  constructor(
    private jobPostService: JobPostService,
    private dataTransferSevice: DataTransferService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  filter
  key: string = 'timeCreate'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  ngOnInit(): void {
    const queryParam = this.route.snapshot.queryParamMap.get('q')
    if(queryParam == 'expired') {
      this.isExpire = true
      this.jobPostService.getAllJobPostByStatus(4).subscribe(
        res => {
          this.jobPosts = res
        },
        error => { console.log(error) }
      )
    } else {
      this.isExpire = false
      this.jobPostService.getAllJobPostByStatus(2).subscribe(
        res => {
          this.jobPosts = res
        },
        error => { console.log(error) }
      )
    }
  }

  viewDetail(jobPost) {
    this.dataTransferSevice.setpreviewdata(jobPost)
    this.router.navigate(['/admin/job-post-detail'])
  }

  deleteJobPost(jobPostId) {
    if(jobPostId !== null || jobPostId !== "undefined") {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa bài đăng không?',
        text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.isConfirmed) {
          this.jobPostService.deleteJobPost(jobPostId).subscribe(
            res => {
              let index = this.jobPosts.findIndex(jobPost => jobPost.jobPostId == jobPostId)
              if (index == -1) {
                this.toastrService.error("Bài đăng không tồn tại", "ERROR", {
                  timeOut: 3000,
                  closeButton: true,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  tapToDismiss: false
                })
                return
              }
              this.jobPosts.splice(index, 1)
              this.toastrService.success("Xóa bài đăng thành công", "SUCCESS", {
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'increasing',
                tapToDismiss: false
              })
            },
            error => { 
              console.log(error) 
              this.toastrService.error("Xóa bài đăng thất bại", "ERROR", {
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'increasing',
                tapToDismiss: false
              })
            }
          )
        }
      })
    }
  }

}
