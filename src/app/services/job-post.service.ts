import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  private urlConfig = new UrlConfig()

  constructor(
    private http: HttpClient
  ) { }

  getAllJobPostByStatus(statusJobPostId) {
    return this.http.get<any>(this.urlConfig.urlPost, { params: { statusJobPostId } })
  }

  changeStatusJobPost(jobPostId, statusJobPostId) {
    return this.http.put<any>(this.urlConfig.urlPost+"/"+jobPostId, null, { params: { statusJobPostId } })
  }

  countJobPostByStatus(statusJobPostId) {
    return this.http.get<any>(this.urlConfig.urlPost+"/count", { params: { statusJobPostId } })
  }

  deleteJobPost(jobPostId) {
    return this.http.delete<any>(this.urlConfig.urlPost + "/" + jobPostId)
  }
}
