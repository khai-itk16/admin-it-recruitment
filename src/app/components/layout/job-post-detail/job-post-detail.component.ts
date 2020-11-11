import { Component, OnInit } from '@angular/core';
import { UrlConfig } from 'src/app/config/url-config';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { LocationService } from 'src/app/services/location.service';

declare const $: any

@Component({
  selector: 'app-job-post-detail',
  templateUrl: './job-post-detail.component.html',
  styleUrls: ['./job-post-detail.component.css']
})
export class JobPostDetailComponent implements OnInit {

  jobPost: any
  urlConfig = new UrlConfig()
  provices: Array<any>

  constructor(
    private dataTransferService: DataTransferService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.provices = this.locationService.readData()
    this.dataTransferService.getpreviewMessage().subscribe(
      res => {
        this.jobPost = res
        $(".culture_description").html(this.jobPost?.employerResumeDTO?.description)
        $(".job_description .description").html(this.jobPost?.jobDescription)
        $(".skills_experience .experience").html(this.jobPost?.jobRequire)
      },
      error => {
        console.log(error)
      }
    )
  }

  getImage() {
    let logoImage = this.jobPost?.employerResumeDTO?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
    return this.urlConfig.urlImage+'/'+logoImage?.imageName
  }

  getAddress() {
    let addressObj = this.jobPost?.employerResumeDTO?.accountDTO?.addressEntity
    let provinceObj = this.provices?.find(province => province?.id == addressObj?.province)
    let districtObj = provinceObj?.districts?.find(district => district?.id == addressObj?.district)
    let wardObj = districtObj?.wards?.find(ward => ward?.id == addressObj?.ward)
    return addressObj?.street +", "+ wardObj?.name +", "+ districtObj?.name +", "+ provinceObj?.name
  }

}
