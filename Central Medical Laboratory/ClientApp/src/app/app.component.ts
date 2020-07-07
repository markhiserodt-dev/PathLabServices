import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation, fadeInAnimation } from './animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    slideInAnimation,
    fadeInAnimation
  ]
})
export class AppComponent {
  clientHeight: number;

  constructor() {
    this.clientHeight = window.innerHeight; 
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
