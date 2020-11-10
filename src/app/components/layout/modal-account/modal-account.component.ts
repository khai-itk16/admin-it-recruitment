import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MustMatch } from 'src/app/utils/custom-validate';

@Component({
  selector: 'app-modal-account',
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.css']
})
export class ModalAccountComponent implements OnInit {

  form: FormGroup
  title = "Thêm tài khoản"

  constructor(
    private dialogRef: MatDialogRef<ModalAccountComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      roleId: ["", [Validators.required]]
    },{
      validators: MustMatch('password', 'confirmPassword')
    })
  }

  get formControl() { return this.form.controls; }

  save() {
    let formValue = this.form.value
    let roles = new Array<any>()
    switch(formValue.roleId) {
      case "1": roles.push({ roleId: 1, roleName: "ROLE_ADMIN" })
      case "2": roles.push({ roleId: 2, roleName: "ROLE_EDITOR" }); break
      case "3": roles.push({ roleId: 3, roleName: "ROLE_CANDIDATE" }); break
      case "4": roles.push({ roleId: 4, roleName: "ROLE_EMPLOYER" })
    }
    let account = {
      email: formValue.email,
      password: formValue.password,
      roleEntities: roles,
      status: "ACTIVE",
      username: formValue.username
    }
    this.dialogRef.close(account);
  }

  close() {
    this.dialogRef.close();
  }

}
