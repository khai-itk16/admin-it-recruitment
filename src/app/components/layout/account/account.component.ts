import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { ModalAccountComponent } from '../modal-account/modal-account.component';
import Swal from 'sweetalert2'

declare const $: any

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: Array<any>

  constructor(
    private accountService: AccountService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private decodeJwtService: DecodeJwtService
  ) { }

  filter
  key: string = 'positionName'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  ngOnInit(): void {
    this.getAllAccounts()
  }

  getAllAccounts() {
    this.accountService.getAllAccounts().subscribe(
      res => {
        const adminId = this.decodeJwtService.getDecodedAccessToken().id
        let indexDelete = res?.findIndex(account => account?.accountId == adminId)
        res.splice(indexDelete, 1)
        this.accounts = res
      },
      error => {
        console.log(error)
      }
    )
  }

  changeAccountStatus(accountId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thay đổi trạng thái của tài khoản không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.changeAccountStatus(accountId).subscribe(
          res => {
            let index = this.accounts.findIndex(account => account?.accountId == accountId)
            if(this.accounts[index].status == 'LOCK') {
              this.accounts[index].status = 'ACTIVE'
            } else {
              this.accounts[index].status = 'LOCK'
            }
            this.toastrService.success("Thay đổi trạng thái của tài khoản thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => {
            console.log(error)
            this.toastrService.error("Xóa tài khoản thất bại", "ERROR", {
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

  deleteAccount(accountId) {
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
        this.accountService.deleteAccountById(accountId).subscribe(
          res => {
            let indexDelete = this.accounts.findIndex(account => account?.accountId == accountId)
            this.accounts.splice(indexDelete, 1)
            this.toastrService.success("Xóa tài khoản thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => {
            console.log(error)
            this.toastrService.error("Xóa tài khoản thất bại", "ERROR", {
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

  openDialog(component, width, height, data) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    if(data !== null || data !== undefined)
      dialogConfig.data = data
      dialogConfig.height = height
      dialogConfig.width = width
    return this.dialog.open(component, dialogConfig)
  }

  addAccount() {
    const dialogRef = this.openDialog(ModalAccountComponent, "800px", "540px", null)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.accountService.addAccount(data).subscribe(
        res => {
          console.log(res)
          this.accounts.push(res)
          this.toastrService.success("Thêm mới tài khoản thành công", "SUCCESS", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        },
        error => {
          console.log(error)
          if(error.status == 400) {
            this.toastrService.error("Có lỗi trong quá trình thêm mới. Vui lòng kiểm tra lại định dạng email, password.", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
          if(error.status == 409) {
            this.toastrService.error("Có lỗi trong quá trình thêm mới. Username đã có người sử dụng vui lòng đặt lại username khác", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        }
      )
    })
  }

}
