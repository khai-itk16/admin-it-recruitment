import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getAllPositions() {
    return this.http.get<any>(this.urlConfig.urlPosition)
  }

  addJobPosition(jobPosition) {
    return this.http.post<any>(this.urlConfig.urlPosition, jobPosition)
  }

  editJobPosition(jobPosition) {
    return this.http.put<any>(this.urlConfig.urlPosition, jobPosition)
  }

  deleteJobPositionById(jobPositionId) {
    return this.http.delete<any>(this.urlConfig.urlPosition + "/" + jobPositionId)
  }

  countAllJobPositions() {
    return this.http.get<any>(this.urlConfig.urlPosition+"/count")
  }
}
