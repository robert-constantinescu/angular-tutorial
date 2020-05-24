import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObservableSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // });
    const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      },1000)
    })


    this.firstObservableSubscription = customObservable.subscribe(data => {
      console.log(data);
    })
  }

  ngOnDestroy(): void {
    this.firstObservableSubscription.unsubscribe();
  }




}
