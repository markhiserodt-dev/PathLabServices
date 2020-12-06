import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Test } from '../models/test.model';
import { TestsService } from '../services/tests.service';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base-component';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent extends BaseComponent implements OnInit {

  test: Test;

  constructor(private route: ActivatedRoute, private testsService: TestsService) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      if (params['id']) {
        let id = Number(params['id']);
        this.testsService.getTest(id).pipe(take(1)).subscribe((test: Test) => {
          this.test = test;
        });
      }
    });
  }
}
