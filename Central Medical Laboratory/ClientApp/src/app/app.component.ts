import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  animationState: number;
  
  clientHeight: number;

  constructor( private route: ActivatedRoute, private router: Router) {
    this.clientHeight = window.innerHeight; 
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
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
