import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Test, Tests } from '../models/tests.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy{
  menuPage: string;
  searchText: string;
  recentTests: Test[] = [];

  private routeSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let recentTests = <Test[]>JSON.parse(localStorage.getItem('recentTests'));
    if (recentTests) {
      this.recentTests = recentTests;
    }
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuPage = event.url;
        if (event.url.indexOf('/test/') == 0) {
          this.addRecentTest(event.url);
        } else if (event.url.indexOf('/tests') == 0) {
          this.menuPage = '/tests';
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

  private addRecentTest(url: string) {
    let id: number = +url.slice(6);
    if (id >= 0 && id < Tests.length) {
      let found = this.recentTests.find((test: Test) => {
        return test.id == id;
      });
      if (!found) {
        let length = this.recentTests.push(Tests[id]);
        if (length > 5) {
          this.recentTests.splice(0, 1);
        }
      }
    }
    localStorage.setItem('recentTests', JSON.stringify(this.recentTests));
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
