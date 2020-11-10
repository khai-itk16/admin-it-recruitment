import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.css']
})
export class ModalPositionComponent implements OnInit {

  form: FormGroup
  title: string
  constructor(
    private dialogRef: MatDialogRef<ModalPositionComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.title = (this.data == null) ? "Thêm vị trí công việc" : "Cập nhật vị trí công việc"
    this.form = this.fb.group({
      jobPositionName: [this.data, [Validators.required]]
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
