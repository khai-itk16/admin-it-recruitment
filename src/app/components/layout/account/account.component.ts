import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { ModalAccountComponent } from '../modal-account/modal-account.component';

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
    private dialog: MatDialog
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
        console.log(res)
        this.accounts = res
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteAccount(accountId) {
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
          this.toastrService.error("Có lỗi trong quá trình thêm mới", "ERROR", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        }
      )
    })
  }

}
