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

  tempSearchText: string = '';    // temporary holder while user is typing text in input
  resultMessage: string = '';     // message to display after a search is complete
  loadingResults: boolean = true;   // boolean to know when user is waiting for api call to return

  pageEvent: PageEvent = {
    pageSize: 10,             // number of items to display on the page
    pageIndex: 0,             // number of which page is to be displayed
    length: 0                 // total number of available items
  }

  searchRequest: SearchRequest = {          // search request object to send through our test service
    pageSize: this.pageEvent.pageSize,
    pageIndex: this.pageEvent.pageIndex,
    selectedLetter: '',                     // user selected letter
    searchText: '',                         // text received throught the route or user input
  };

  private testsService$: Subscription;       // subscription to a service to make test-related api calls
  private params$: Subscription;             // subscription to receive route parameters

  constructor(private route: ActivatedRoute, private testsService: TestsService) {}

  /*
    Should subscribe to the route parameters and call an initial search through a pageChange
  */
  ngOnInit() {
    this.params$ = this.route.params.subscribe(params => {
      this.searchRequest.searchText= '';
      this.searchRequest.selectedLetter = '';
      if (params['search']) {
        this.searchRequest.searchText = params['search'].toLowerCase();
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
    this.loadingResults = true;
    this.testsService$ = this.testsService.searchTests(this.searchRequest).pipe(take(1)).subscribe((res: SearchResponse) => {
      this.tests = res.tests;
      this.pageEvent.length = res.length;
      this.constructResultMessage();
      this.loadingResults = false;
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
    this.searchRequest.selectedLetter = this.searchRequest.selectedLetter==letter ? '' : letter;
    this.onPageChange({pageSize: this.pageEvent.pageSize, pageIndex: 0, length: 0})
  }

  /*
    Should set searchText to what the user has typed (tempSearchText)
    Should call a pageChange setting the pageIndex back to the first page
  */
  onSearchClick() {
    this.searchRequest.searchText = this.tempSearchText;
    this.onPageChange({pageSize: this.pageEvent.pageSize, pageIndex: 0, length: 0})
  }

  /*
    Should set all variables back to defaults
    Should call a pageChange setting the pageIndex back to the first page
  */
  clearFilter() {
    this.searchRequest.searchText = '';
    this.tempSearchText = '';
    this.searchRequest.selectedLetter = '';
    this.onPageChange({pageSize: this.pageEvent.pageSize, pageIndex: 0, length: 0})
  }

  /*
    Should set resultMessage depending on varying conditions of:
        - selectedLetter
        - searchText
        - pageEvent.length
  */
  private constructResultMessage() {
    if (this.searchRequest.selectedLetter && this.searchRequest.searchText && this.pageEvent.length > 0) {
      this.resultMessage = 'showing ' + this.pageEvent.length + ' results starting with \'' + this.searchRequest.selectedLetter + '\' containing \'' + this.searchRequest.searchText + '\''; 
    } else if (this.searchRequest.selectedLetter && !this.searchRequest.searchText && this.pageEvent.length > 0) {
      this.resultMessage = 'showing ' + this.pageEvent.length + ' results starting with \'' + this.searchRequest.selectedLetter + '\'';
    } else if (!this.searchRequest.selectedLetter && this.searchRequest.searchText && this.pageEvent.length > 0) {
      this.resultMessage = 'showing ' + this.pageEvent.length + ' results containing \'' + this.searchRequest.searchText + '\''; 
    } else if (!this.searchRequest.selectedLetter && !this.searchRequest.searchText) {
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
