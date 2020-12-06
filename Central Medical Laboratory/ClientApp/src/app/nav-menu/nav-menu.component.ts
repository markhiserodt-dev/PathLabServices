import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Test, Tests } from '../models/test.model';
import { User } from '../models/user.model';
import { BaseComponent } from '../shared/base-component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent extends BaseComponent implements OnInit {
  menuPage: string = '';
  searchText: string = '';
  recentTests: Test[] = [];
  displayAccount: boolean = false;
  user: User;

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    let recentTests = <Test[]>JSON.parse(localStorage.getItem('recentTests'));
    if (recentTests) {
      this.recentTests = recentTests;
    }
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe(event => {
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

  closeAccountModal(event: boolean) {
    if (event) {
      this.displayAccount = false;
    }
  }

  /* Bug-01: When user clicks on clear email icon inside the account component,
             this component's onClickedOutside() gets fired. Not sure root cause.
             Current fix is to check the event explicitly if it is the account icon.
     Bug-02: When user hits enter on password field inside the account component to
             call login(), this function fires. Fix is to check if the target id is the accountButton
  */
  onClickedOutside(event: any) {
    if (event.target.id !== 'accountIconEmailClear' && 
        event.target.id !== 'accountButtonEmailClear') {
      this.displayAccount = false;
    }
  }

  private addRecentTest(id: number) {
    if (id >= 0 && id < Tests.length) {
      let foundTest = this.recentTests.find((test: Test) => {
        return test.id == id;
      });
      if (!foundTest) {
        let length = this.recentTests.push(foundTest);
        if (length > 5) {
          this.recentTests.splice(0, 1);
        }
      }
    }
    localStorage.setItem('recentTests', JSON.stringify(this.recentTests));
  }
}
