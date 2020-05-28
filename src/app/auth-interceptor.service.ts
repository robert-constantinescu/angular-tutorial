import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("request is on it's way");
    const modifiedRequest = req.clone({headers: req.headers.append('auth',' xyz')});
    return next.handle(modifiedRequest).pipe(tap (
      event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log("Response Arrived. Body Data: ");
          console.log(event.body);
        }
      }
    ));
  }









}
