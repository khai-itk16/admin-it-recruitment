import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private authService: AuthService, 
    private router: Router,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  loginUser(){
    this.authService.loginUser(this.form.value).subscribe(
      res => {
        let roles = Object(jwt_decode(res.token)).roles
        console.log(roles)
        if(roles == 'ROLE_ADMIN,ROLE_EDITOR' || roles == 'ROLE_EDITOR'){
          localStorage.setItem("token", res.token)
          this.router.navigate(["/admin"])
          this.toastrService.success("Đăng nhập thành công", "SUCCESS", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        } else {
          this.toastrService.warning("Tài khoản của bạn không có quyền truy cập", "WARNING", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        }
      }, 
      error => {
        if(error.status == 401) {
          this.toastrService.error("Vui lòng kiểm tra lại thông tin tên đăng nhập và mật khẩu", "ERROR", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        }

        if(error.status == 403) {
          this.toastrService.warning("Tài khoản của bạn đã bị khóa. Bạn không thể truy cập vào hệ thống", "WARNING", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        }
        console.log(error);
      }
    )
  }
}
