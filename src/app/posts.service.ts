import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {

  error = new Subject<string>();

  constructor(private httpClient: HttpClient) {

  }

  createAndStorePost(title: string, content: string) {
    // Send Http request
    const postData: Post = {title: title, content: content};
    this.httpClient.post<{ name: string }>(
      'https://angular-first-project-97484.firebaseio.com/posts.json',
      postData, {
        observe: 'response'
      }
    ).subscribe(responseData =>{
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    } );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.httpClient
      .get<{ [key: string]: Post; }>(
        'https://angular-first-project-97484.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({"Custom-header": "Hello"}),
          // params: new HttpParams().set('print', 'pretty')
          params: searchParams
        })
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }),
        catchError(errorResponse => {
         return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    return this.httpClient.delete(
      'https://angular-first-project-97484.firebaseio.com/posts.json',
      {
        observe: 'events'
      }).pipe(tap(
        events => {
          console.log(events);
          if (events.type === HttpEventType.Sent) {
            console.log(events.type);
          }
          if (events.type === HttpEventType.Response) {
            console.log(events.body);
          }
        }
    ));
  }
}
