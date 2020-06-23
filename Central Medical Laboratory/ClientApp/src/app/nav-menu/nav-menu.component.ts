import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy{
  menuPage: string;
  searchText: string;

  private routeSubscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.children[0].url[0]) {
          this.menuPage = this.activatedRoute.snapshot.children[0].url[0].path;
        } else {
          this.menuPage = 'home';
        }
      }
    });
  }

  onSearchClick() {
    if (this.searchText) {
      this.router.navigate(['/tests', {search: this.searchText}]);
    } else {
      this.router.navigate(['/tests']);
    }
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
