import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor( private route: ActivatedRoute) {
    this.clientHeight = window.innerHeight; 
  }

  onActivate($event) {
    this.animationState = this.route.firstChild.snapshot.data['routeIdx'];
  }
}
