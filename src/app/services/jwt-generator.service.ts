import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import {Observable, of} from 'rxjs';
import {JwtInterface} from '../interfaces/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtGeneratorService implements JwtInterface {

  exp: Date;
  name;
  token;

  constructor() {
    this.name = 'john.doe';
  }

  base64url(source): string {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
  }

  getToken(): Observable<any> {
    return of(this.token);
  }

  getDecodedAccessToken(token: string): any {
    return jwt_decode(token);
  }

  setTokenExpDate(exp): void {
    this.exp = exp;
  }

  getTokenExpDate(): Date {
    return this.exp;
  }

  createToken(): void {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    const minutesToAdd = .3;
    const currentDate = new Date();
    this.setTokenExpDate(new Date(new Date(currentDate.getTime() + (minutesToAdd * 60 * 1000))).getTime());
    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = this.base64url(stringifiedHeader);
    const payload = {
      exp: this.getTokenExpDate(),
      name: this.name,
    };
    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    const encodedData = this.base64url(stringifiedData);
    this.token = encodedHeader + '.' + encodedData;
  }
}
