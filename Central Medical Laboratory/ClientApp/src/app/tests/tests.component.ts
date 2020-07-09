import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { Alphabet } from '../models/alphabet.model';
import { Test, Tests } from '../models/tests.model';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit, OnDestroy {
  alphabet = Alphabet;

  filteredTests: Test[] = [];

  searchText: string = '';
  selectedLetter: string = '';
  resultMessage: string = '';

  pageEvent: PageEvent = {
    pageSize: 10,
    pageIndex: 0,
    length: 0
  }

  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.searchText = '';
      this.selectedLetter = '';
      if (params['search']) {
        this.searchText = params['search'].toLowerCase();
      }
      this.onPageChange(this.pageEvent);
    });
  }

  onLetterClick(letter: string) {
    this.selectedLetter = this.selectedLetter==letter ? '' : letter;
    this.onPageChange(this.pageEvent);
  }


  onPageChange(pageEvent: PageEvent) {
    this.pageEvent.pageIndex = pageEvent.pageIndex;
    this.pageEvent.pageSize = pageEvent.pageSize;
    this.doSearch();
  }

  doSearch() {
    if (!this.selectedLetter) {
      this.filteredTests = Tests.filter((test: Test) => {
        return (test.name.toLowerCase().indexOf(this.searchText) > -1);
      });
    } else {
      this.filteredTests = Tests.filter((test: Test) => {
        return (test.name.toLowerCase().indexOf(this.selectedLetter) == 0);
      });
      this.filteredTests = this.filteredTests.filter((test: Test) => {
        return (test.name.toLowerCase().indexOf(this.searchText) > -1);
      });
    }
    this.constructResultMessage();
    this.pageEvent.length = this.filteredTests.length;
    this.filteredTests = this.filteredTests.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  private constructResultMessage() {
    if (this.selectedLetter && this.searchText && this.filteredTests.length > 0) {
      this.resultMessage = 'showing ' + this.filteredTests.length + ' results starting with \'' + this.selectedLetter + '\' containing \'' + this.searchText + '\''; 
    } else if (this.selectedLetter && !this.searchText && this.filteredTests.length > 0) {
      this.resultMessage = 'showing ' + this.filteredTests.length + ' results starting with \'' + this.selectedLetter + '\'';
    } else if (!this.selectedLetter && this.searchText && this.filteredTests.length > 0) {
      this.resultMessage = 'showing ' + this.filteredTests.length + ' results containing \'' + this.searchText + '\''; 
    } else if (!this.selectedLetter && !this.searchText) {
      this.resultMessage = 'showing all ' + this.filteredTests.length + ' results';
    } else {
      this.resultMessage = 'no results matching the search criteria';
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
