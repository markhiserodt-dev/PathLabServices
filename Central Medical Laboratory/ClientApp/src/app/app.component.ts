import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { slideInAnimation } from './animations';
import { BaseComponent } from './shared/base-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    slideInAnimation
  ]
})
export class AppComponent extends BaseComponent {

  animationState: number;
  clientHeight: number;

  constructor( private route: ActivatedRoute, private router: Router) {
    super();
    this.clientHeight = window.innerHeight; 
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  onActivate() {
    this.animationState = this.route.firstChild.snapshot.data['routeIdx'];
  }
}
