import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { Test, Tests } from '../models/test.model';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent implements OnInit, OnDestroy {

  test: Test;

  private paramsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        let id: number = +params['id'];
        if (id >= 0 && id < Tests.length) {
          this.test = Tests[id];
        } else {
          this.router.navigate(['/tests']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
