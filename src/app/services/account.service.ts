import { User } from './../store/model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/local';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
  publicUrl = `${config.apiUrl}/api/public/account`;
  url = `${config.apiUrl}/api/account`;

  constructor(private httpClient: HttpClient) {}

  createAccount(email: string, password: string, passwordRepeat: string) {
    return this.httpClient.post(
      this.publicUrl + '/registration',
      {
        email,
        password,
        passwordRepeat,
      },
      { headers: { 'Content-type': 'application/json; charset=utf-8' } }
    );
  }

  getUser() {
    return this.httpClient.get<User>(this.url);
  }

  updateUser(user: any) {
    return this.httpClient.put(this.url, user);
  }

  updateUserAddress(user: any) {
    return this.httpClient.put(`${this.url}/address`, user);
  }

  verifyEmail(verificationToken: any) {
    return this.httpClient.post(this.publicUrl + '/registration/validate', {
      token: verificationToken,
    });
  }

  forgotPasswordRequest(email: any) {
    return this.httpClient.post(this.publicUrl + '/password/forgot', {
      email,
    });
  }

  forgotPasswordConfirm(passwordForgotToken: any) {
    return this.httpClient.post(this.publicUrl + '/password/forgot/confirm', {
      token: passwordForgotToken,
    });
  }

  forgotPasswordReset(
    passwordForgotToken: any,
    newPassword: any,
    newPasswordConfirm: any
  ) {
    return this.httpClient.post(this.publicUrl + '/password/forgot/validate', {
      token: passwordForgotToken,
      newPassword,
      newPasswordConfirm,
    });
  }

  resetPassword(oldPassword: any, newPassword: any, newPasswordConfirm: any) {
    return this.httpClient.post(this.url + '/password/reset', {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    });
  }

  getVerificationStatus(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.url + '/status');
  }
}
