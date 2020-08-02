import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { Test } from '../models/test.model';
import { TestsService } from '../services/tests.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent implements OnInit, OnDestroy {

  test: Test;

  private testsService$: Subscription;       // subscription to a service to make test-related api calls
  private params$: Subscription;             // subscription to receive route parameters

  constructor(private route: ActivatedRoute, private testsService: TestsService) {}

  ngOnInit() {
    this.params$ = this.route.params.subscribe(params => {
      if (params['id']) {
        let id = Number(params['id']);
        this.testsService$ = this.testsService.getTest(id).pipe(take(1)).subscribe((test: Test) => {
          this.test = test;
        });
      }
    });
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
    this.testsService$.unsubscribe();
  }
}
