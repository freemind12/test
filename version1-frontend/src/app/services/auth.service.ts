import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../shared/user';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';

interface RegResponse {
  status: string;
  success: string;
}

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface UserResponse {
  user: User;
  status: string;
  success: boolean;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
  user = new Subject<User>();

   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHTTPMsgService) {
   }

   checkUserExistence(user : User) : any {
    this.http.get<UserResponse>(baseURL + 'users/findUser')
    .subscribe(res => {
      if(res.success){
        console.log('user founded!');
        return true;
      }
    },
    err => {
      console.log('A problem happened: ', err);
      this.destroyUserCredentials();
      return false;
    });
  }

   checkJWTtoken() {
     this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
     .subscribe(res => {
       console.log('JWT Token Valid: ', res);
       this.sendUsername(res.user.username);
     },
     err => {
       console.log('JWT Token invalid: ', err);
       this.destroyUserCredentials();
     });
   }

   sendUsername(name: string) {
     this.username.next(name);
   }

   clearUsername() {
     this.username.next(undefined);
   }

   loadUserCredentials() {
     const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
     console.log('loadUserCredentials ', credentials);
     if (credentials && credentials.username !== undefined) {
       this.useCredentials(credentials);
       if (this.authToken) {
        this.checkJWTtoken();
       }
     }
   }

   storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

   useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.sendUsername(credentials.username);
     this.authToken = credentials.token;
     this.user.next(credentials.user);
    }

   destroyUserCredentials() {
     this.authToken = undefined;
     this.clearUsername();
     this.isAuthenticated = false;
     localStorage.removeItem(this.tokenKey);
   }

   storeUser(username: any) {
    console.log('storeUser ', username);
    //localStorage.setItem(this.username, JSON.stringify(username));
    //this.useCredentials(credentials);
  }


   signUp(user: any): Observable<any> {
    if (this.checkUserExistence(user) === false) {
      return this.http.post<RegResponse>(baseURL + 'users/signup',
      {'username': user.username, 'password': user.password})
      .pipe( map(res => {
          this.storeUser({username: user.username});
          return {'success': true, 'username': user.username };
      }),
       catchError(error => this.processHTTPMsgService.handleError(error)));

    }
    else{
      console.log('This user already exists!')
    }

  }


   logIn(user: any): Observable<any> {
     return this.http.post<AuthResponse>(baseURL + 'users/login',
       {'username': user.username, 'password': user.password})
       .pipe( map(res => {
           this.storeUserCredentials({username: user.username, token: res.token });
           return {'success': true, 'username': user.username };
       }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logOut() {
     this.destroyUserCredentials();
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername(): Observable<string> {
     return this.username.asObservable();
   }

   getUser(): Observable<User> {
    return this.user.asObservable();
  }

   getToken(): string {
     return this.authToken;
   }
}
