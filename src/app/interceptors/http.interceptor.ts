import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import { from, Observable, EMPTY, of } from 'rxjs';
import { throwError } from 'rxjs';
import { mergeMap, retry, catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageToken } from '../shared/storage';
import { STORAG } from '../constant/storage.constant';
import { INGOREAUTHORIZATION, AUTHHEADER } from '../constant/api.constant';
import { LoginService } from '../services/login.service';
import { API } from '../constant/api.constant';
import { HttpStatusCode } from '../constant/http.constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERRMSG, ERRCODE } from '../constant/error.constant';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  private storage: Storage;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private activeRouter: ActivatedRoute,
    private loginService: LoginService,
    @Inject(StorageToken) storage: Storage
  ) {
    this.storage = storage;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const needToken = INGOREAUTHORIZATION.filter((u) => request.url.match(u));
    console.log('needToken: ', needToken);
    if (!needToken.length) {
      var token: string | null = this.storage.getItem(
        STORAG.TOKEN_STORAGE_NAMESPACE
      );
      if (!token) {
        // if (token) {

        // console.log("this.router: ", this.router)
        // console.log("this.activeRouter: ", this.activeRouter)

        // console.log("111this.loginService.navigateSubject: ", this.loginService.navigateSubject.value)

        this.loginService.navigateSubject.next({
          commands: [this.router.routerState.snapshot.url],
          extras: this.activeRouter.snapshot,
        });

        // console.log("222this.loginService.navigateSubject: ", this.loginService.navigateSubject.value)

        this.router.navigate([API.WEB_LOGIN]);
        // this.router.
        return EMPTY;
      }

      request = request.clone({
        headers: request.headers.set(AUTHHEADER, <string>token),
      });
      //token ? request.headers.set(AUTHHEADER, <string>token):null;
    }

    return next.handle(request).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            // 这里是返回，可通过event.body获取返回内容
            // event.body
            // console.log('event HttpResponse: ', event);
          } else if (event instanceof HttpErrorResponse) {
            // console.log('event  HttpErrorResponse: ', event);
          }
          // console.log('event not HttpResponse: ', event.body);
        },
        (error: any) => {
          // 统一处理所有的http错误
          if (error.status == HttpStatusCode.StatusUnauthorized) {
            this.router.navigate([API.WEB_LOGIN]);
            // this.router.navigate([API.WEB_USER]);
          } else if (error.status == HttpStatusCode.StatusGatewayTimeout) {
            this.message.error(ERRMSG[ERRCODE.WEB_NETWORK_ERROR]);
          } else if (
            error.status >= HttpStatusCode.StatusBadRequest &&
            error.status < HttpStatusCode.StatusUnparseableResponseHeaders
          ) {
            console.log('xxxxoooo: ', error);
            this.message.error(
              ERRMSG[error.error.code]
                ? ERRMSG[error.error.code]
                : error.error.message
              // {
              //   nzDuration: 1000,
              // }
            );
          } else {
            // this.message.create('warning', error.error['message']);
            this.message.error(
              error.error.message ? error.error.message : error.message
            );
            // } else {
            //   console.log(error.error.message ? error.error.message : error.message)
            //   this.message.error('出错拉~, 网络请求错误,请刷新页面试一试');
          }
        }
      )
    );

    // console.log("req: ", request);
    // return next.handle(request).pipe(
    //   mergeMap((event: any) => {
    //     console.log('intercept event', event);
    //     const err = event.body && event.body.err;
    //     if (err) {
    //       switch (err) {
    //         case -1:
    //           // 在提示框中展示错误消息
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //     if (event instanceof HttpResponse && event.status !== 200) {
    //       return throwError(event);
    //     }
    //     return of(event); // 请求成功返回响应
    //   }),
    //   catchError((res: HttpResponse<any>) => {
    //     // 请求失败处理
    //     // this.messageService.clear();
    //     switch (true) {
    //       case res.status >= HttpStatusCode.StatusBadRequest &&
    //         res.status < HttpStatusCode.StatusUnparseableResponseHeaders:
    //         // 提示请求超时
    //         this.message.error('服务器返回错误');
    //         console.log('catchError 500: ', res);
    //         break;
    //       default:
    //         // 提示网络错误
    //         this.message.error('网络错误!');
    //         console.log('catchError, default', res);
    //     }
    //     // return throwError(event)
    //     return throwError(res);
    //   })
    //   // retry(1)
    // );
  }
}
