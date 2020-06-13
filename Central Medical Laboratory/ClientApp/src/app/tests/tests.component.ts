import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  searchText: string;
  tests: any = [
    { id: 1, name: 'alpha test' },
    { id: 2, name: 'beta test' },
    { id: 3, name: 'gamma test' },
    { id: 4, name: 'delta test' },
    { id: 5, name: 'episilon test' },
    { id: 6, name: 'zeta test' },
    { id: 7, name: 'eta test' },
    { id: 8, name: 'theta test' },
    { id: 9, name: 'iota test' }
  ];
  filteredTests: any = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['search']) {
        this.searchText = params['search'];
        this.doSearch();
      }
    })
  }

  doSearch() {
    this.filteredTests = this.tests.filter(test => {
      return (test.name.indexOf(this.searchText) > -1);
    });
  }

  ngOnDestroy() {

  }

}
