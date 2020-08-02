import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { Alphabet } from '../models/alphabet.model';
import { Test } from '../models/test.model';
import { TestsService } from '../services/tests.service';
import { take } from 'rxjs/operators';
import { SearchResponse } from '../models/search-response.model';
import { SearchRequest } from '../models/search-request.model';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit, OnDestroy {

  alphabet = Alphabet;        // const string array of the alphabet in lowercase

  tests: Test[] = [];         // the tests displayed on the current page

  searchText: string = '';        // text received throught the route or user input
  tempSearchText: string = '';    // temporary holder while user is typing text in input
  selectedLetter: string = '';    // user selected letter
  resultMessage: string = '';     // message to display after a search is complete

  pageEvent: PageEvent = {
    pageSize: 10,             // number of items to display on the page
    pageIndex: 0,             // number of which page is to be displayed
    length: 0                 // total number of available items
  }

  searchRequest: SearchRequest = {          // search request object to send through our test service
    pageSize: this.pageEvent.pageSize,
    pageIndex: this.pageEvent.pageIndex,
    selectedLetter: this.selectedLetter,
    searchText: this.searchText,
  };

  private testsService$: Subscription;       // subscription to a service to make test-related api calls
  private params$: Subscription;             // subscription to receive route parameters

  constructor(private route: ActivatedRoute, private testsService: TestsService) {}

  /*
    Should subscribe to the route parameters and call an initial search through a pageChange
  */
  ngOnInit() {
    this.params$ = this.route.params.subscribe(params => {
      this.searchText = '';
      this.selectedLetter = '';
      if (params['search']) {
        this.searchText = params['search'].toLowerCase();
      }
      this.onPageChange({pageSize: this.pageEvent.pageSize, pageIndex: 0, length: 0})
    });
  }

  /*
    Should subscribe to testsService and receive one emission of the search response
    Should set the tests to display and the total tests available (pageEvent.length)
    Should construct the result message to display 
  */
  doSearch() {
    this.testsService$ = this.testsService.searchTests(this.searchRequest).pipe(take(1)).subscribe((res: SearchResponse) => {
      this.tests = res.tests;
      this.pageEvent.length = res.length;
      this.constructResultMessage();
    });
  }

  /*
    Should set the pageEvent's pageIndex and pageSize, then perform a search
  */
  onPageChange(pageEvent: PageEvent) {
    this.pageEvent.pageIndex = pageEvent.pageIndex;
    this.pageEvent.pageSize = pageEvent.pageSize;
    this.doSearch();
  }

  /*
    Should set selectedLetter or unselect it if it is already selected
    Should call a pageChange, setting the pageIndex back to the first page
  */
  onLetterClick(letter: string) {
    this.selectedLetter = this.selectedLetter==letter ? '' : letter;
    this.onPageChange({pageSize: this.pageEvent.pageSize, pageIndex: 0, length: 0})
  }

  /*
    Should set searchText to what the user has typed (tempSearchText)
    Should call a pageChange setting the pageIndex back to the first page
  */
  onSearchClick() {
    this.searchText = this.tempSearchText;
    this.onPageChange({pageSize: this.pageEvent.pageSize, pageIndex: 0, length: 0})
  }

  /*
    Should set searchText to what the user has typed (tempSearchText)
    Should call a pageChange setting the pageIndex back to the first page
  */
  clearFilter() {
    this.searchText = '';
    this.tempSearchText = '';
    this.selectedLetter = '';
    this.onPageChange({pageSize: this.pageEvent.pageSize, pageIndex: 0, length: 0})
  }

  /*
    Should set resultMessage depending on varying conditions of:
        - selectedLetter
        - searchText
        - pageEvent.length
  */
  private constructResultMessage() {
    if (this.selectedLetter && this.searchText && this.pageEvent.length > 0) {
      this.resultMessage = 'showing ' + this.pageEvent.length + ' results starting with \'' + this.selectedLetter + '\' containing \'' + this.searchText + '\''; 
    } else if (this.selectedLetter && !this.searchText && this.pageEvent.length > 0) {
      this.resultMessage = 'showing ' + this.pageEvent.length + ' results starting with \'' + this.selectedLetter + '\'';
    } else if (!this.selectedLetter && this.searchText && this.pageEvent.length > 0) {
      this.resultMessage = 'showing ' + this.pageEvent.length + ' results containing \'' + this.searchText + '\''; 
    } else if (!this.selectedLetter && !this.searchText) {
      this.resultMessage = 'showing all ' + this.pageEvent.length + ' results';
    } else {
      this.resultMessage = 'no results matching the search criteria';
    }
  }

  /*
    Should unsubscribe from all subscriptions
  */
  ngOnDestroy() {
    this.params$.unsubscribe();
    this.testsService$.unsubscribe();
  }

}
