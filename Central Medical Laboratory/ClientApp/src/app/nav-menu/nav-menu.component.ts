import { Component, OnInit, OnDestroy, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { Test, Tests } from '../models/test.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnDestroy{
  menuPage: string = '';
  searchText: string = '';
  recentTests: Test[] = [];
  displayAccount: boolean = false;
  user: User;

  private routeSubscription: Subscription;

  @ViewChild('accountIconEmailClear', { static: false }) public accountIconEmailClear: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let recentTests = <Test[]>JSON.parse(localStorage.getItem('recentTests'));
    if (recentTests) {
      this.recentTests = recentTests;
    }
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuPage = event.url;

        if (this.menuPage.indexOf('/test-detail') == 0) {
          this.addRecentTest(+event.url.slice(this.menuPage.length));
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

  saveUser(event: User) {
    this.user = event;
  }

  /* Bug-01: When user clicks on clear email icon inside the account component,
             this component's onClickedOutside() gets fired. Not sure root cause.
             Current fix is to check the event explicitly if it is the account icon.
  */
  onClickedOutside(event: any) {
    if (event.target.id !== 'accountIconEmailClear') {
      this.displayAccount = false;
    }
  }

  private addRecentTest(id: number) {
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
