import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Test } from '../models/test.model';
import { TestsService } from '../services/tests.service';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base-component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent extends BaseComponent implements OnInit {

  test: Test;

  constructor(private route: ActivatedRoute, 
              private testsService: TestsService, 
              private dialog: MatDialog ) {
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

  openTestDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.test.id,
      title: 'Edit Test',
      test: this.test
    }

    const dialogRef = this.dialog.open(TestDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((test: Test) => {
      if (test) {
        this.testsService.editTest(test).pipe(take(1)).subscribe((resp: Test) => {
          this.test = resp;
        });
      }
    });
  }
}
