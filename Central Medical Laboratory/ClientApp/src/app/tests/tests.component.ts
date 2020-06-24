import { Component, OnInit, OnDestroy } from '@angular/core';
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

  tests = Tests;
  filteredTests: Test[] = [];

  searchText: string = '';
  selectedLetter: string = '';
  resultMessage: string = '';

  pageSize: number = 5;
  pageIndex: number = 0;
  pageLength: number = 0;

  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['search']) {
        this.searchText = params['search'].toLowerCase();
      } else {
        this.searchText = '';
        this.selectedLetter = '';
      }
      this.doSearch();
    });
  }

  doSearch() {
    if (!this.selectedLetter) {
      this.filteredTests = this.tests.filter((test: Test) => {
        return (test.name.toLowerCase().indexOf(this.searchText) > -1);
      });
    } else {
      this.filteredTests = this.tests.filter((test: Test) => {
        return (test.name.toLowerCase().indexOf(this.selectedLetter) == 0);
      });
      this.filteredTests = this.filteredTests.filter((test: Test) => {
        return (test.name.toLowerCase().indexOf(this.searchText) > -1);
      });
    }
    this.constructResultMessage();
    this.pageLength = this.filteredTests.length;
    this.filteredTests = this.filteredTests.slice(this.pageIndex * this.pageSize, this.pageSize * (this.pageIndex + 1));
  }

  onLetterClick(letter: string) {
    if (this.selectedLetter == letter) {
      this.selectedLetter = '';
    } else {
      this.selectedLetter = letter;
    }
    this.doSearch();
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.doSearch();
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
