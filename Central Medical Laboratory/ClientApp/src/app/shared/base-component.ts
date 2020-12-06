import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export class BaseComponent implements OnDestroy {
  ngUnsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}