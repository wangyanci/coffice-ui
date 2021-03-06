import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, switchMap} from 'rxjs/operators';

import { StorageToken } from '../shared/storage';
import { CurrentDateToken } from '../shared/current-date';
import { WindowToken } from '../shared/window';
import { STORAG } from '../constant/storage.constant';
import { UserInfo } from "../models/user.model";

import { API, AUTHHEADER } from "../constant/api.constant";

import { ModelUtil } from "../utils/model.util";
import { Navigate } from "../models/navigate.model";

// type Filter<T, U> = T extends U ? T: never;



@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private storage: Storage;

  public navigateSubject = new BehaviorSubject<Navigate>({commands: [API.WEB_USER]});

  constructor(
    private http: HttpClient,
    @Inject(StorageToken)storage: Storage,
  ) {
    this.storage = storage
    // this.navigateSubject.value
  }





  dologin(user: UserInfo): Observable<Object> {
    // this.http.post()
    // var { remember, ...user1 } = user
    // console.log("user1: ", user1)
    // console.log("type of user: ", string(keyof typeof <UserInfo>user ))
    // this.storage.setItem(STORAG.TOKEN_STORAGE_NAMESPACE, JSON.stringify(ModelUtil.assin(user1, user)))
    //let aaa: keyof UserInfo = 'userName'


    // for (var key in user) {
    //   // let keytype: keyof typeof user = <keyof typeof user>key
    //   let keytype: keyof UserInfo = key
    //   if (keytype extends keyof UserInfo) {

    //   }
    //   console.log("xxx keytype: ", keytype)
    //   console.log("xxxx value: ", this.aaa(<UserInfo>user, user, keytype))
    // }



    // console.log("xxxxx", this.pick(user, aaa));

    let { userName, password } = user
    user = { userName, password }

    // this.storage.setItem(STORAG.TOKEN_STORAGE_NAMESPACE, JSON.stringify(user))
    return this.http.post(API.APISERVER_AUTH, user, { observe: 'response' }).pipe(

      tap((resp: any) => {
        console.log("xxxxx resp: ", );
        this.storage.setItem(STORAG.TOKEN_STORAGE_NAMESPACE, resp.headers.get(AUTHHEADER))
      }),

      switchMap(() => of<Navigate>(this.navigateSubject.value)),
    )
  }

  dologout() {

  }

  // aaa<T, U, K extends keyof T, J extends keyof U>(objA: T, objB: U, key: Filter<K, J>): any {

  //   console.log("xxxx key: ", key)
  //   return objA[key];
  // }


}
