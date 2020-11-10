import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from 'src/app/services/position.service';
import { ModalPositionComponent } from '../modal-position/modal-position.component';
import Swal from 'sweetalert2'

declare const $: any

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  positions: Array<any>

  constructor(
    private positionService: PositionService,
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
    this.getAllPositions()
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

  getAllPositions() {
    this.positionService.getAllPositions().subscribe(
      res => {
        this.positions = res
      },
      error => {
        console.log(error)
      }
    )
  }

  addJobPosition() {
    const dialogRef = this.openDialog(ModalPositionComponent, "600px", "240px", null)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      let jobPosition = {
        jobPositionId: 0,
        jobPositionName: data.jobPositionName
      }
      this.positionService.addJobPosition(jobPosition).subscribe(
        res => {
          console.log(res)
          this.positions.push(res)
          this.toastrService.success("Thêm mới vị trí thành công", "SUCCESS", {
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
    })
  }

  editJobPosition(jobPosition) {
    const dialogRef = this.openDialog(ModalPositionComponent, "600px", "240px", jobPosition?.jobPositionName)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      let jobPositionUp = {
        jobPositionId: jobPosition?.jobPositionId,
        jobPositionName: data.jobPositionName
      }
      this.positionService.editJobPosition(jobPositionUp).subscribe(
        res => {
          console.log(res)
          let indexJobPositionUpdate = this.positions?.findIndex(position => position.jobPositionId == jobPosition?.jobPositionId) 
          this.positions[indexJobPositionUpdate].jobPositionName = res.jobPositionName
          this.toastrService.success("Cập nhật vị trí thành công", "SUCCESS", {
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
    })
  }

  deleteJobPosition(jobPositionId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa vị trí này không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deleteJobPositionById(jobPositionId).subscribe(
          res => {
            console.log(res)
            let indexJobPositionDelete = this.positions?.findIndex(position => position.jobPositionId == jobPositionId) 
            this.positions.splice(indexJobPositionDelete, 1)
            this.toastrService.success("Xóa vị trí thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => {
            console.log(error)
            this.toastrService.error("Xóa vị trí thất bại", "ERROR", {
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
