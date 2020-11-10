import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getAllAccounts() {
    return this.http.get<any>(this.urlConfig.urlAccount)
  }

  getAccountById(accountId) {
    return this.http.get<any>(this.urlConfig.urlAccount + "/" + accountId)
  }

  editAccount(accountDTO) {
    return this.http.put<any>(this.urlConfig.urlAccount, accountDTO)
  }

  changeAccountStatus(accountId) {
    return this.http.put<any>(`${this.urlConfig.urlAccount}/${accountId}/status` , null)
  }

  changeAccountPassword(passwordDTO) {
    return this.http.put<any>(this.urlConfig.urlAccount+"/change-password", passwordDTO)
  }

  deleteAccountById(accountId) {
    return this.http.delete<any>(this.urlConfig.urlAccount+"/"+accountId)
  }

  addAccount(account) {
    return this.http.post<any>(this.urlConfig.urlHost+"/api/auth/register", account)
  }
}
