import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit, OnDestroy {

  tests: any = [
    { id: 1, name: 'alpha test' },
    { id: 2, name: 'beta test' },
    { id: 3, name: 'gamma test' },
    { id: 4, name: 'delta test' },
    { id: 5, name: 'epsilon test' },
    { id: 6, name: 'zeta test' },
    { id: 7, name: 'eta test' },
    { id: 8, name: 'theta test' },
    { id: 9, name: 'iota test' },
    { id: 10, name: 'test1' },
    { id: 11, name: 'test2' },
    { id: 12, name: 'test3' },
    { id: 13, name: 'alpha2' }
  ];

  filteredTests: any = [];

  alphabet: any = [
    {value: 'a', selected: false},
    {value: 'b', selected: false},
    {value: 'c', selected: false},
    {value: 'd', selected: false},
    {value: 'e', selected: false},
    {value: 'f', selected: false},
    {value: 'g', selected: false},
    {value: 'h', selected: false},
    {value: 'i', selected: false},
    {value: 'j', selected: false},
    {value: 'k', selected: false},
    {value: 'l', selected: false},
    {value: 'm', selected: false},
    {value: 'n', selected: false},
    {value: 'o', selected: false},
    {value: 'p', selected: false},
    {value: 'q', selected: false},
    {value: 'r', selected: false},
    {value: 's', selected: false},
    {value: 't', selected: false},
    {value: 'u', selected: false},
    {value: 'v', selected: false},
    {value: 'w', selected: false},
    {value: 'x', selected: false},
    {value: 'y', selected: false},
    {value: 'z', selected: false},
  ];

  searchText: string = '';
  selectedLetter: string = '';
  resultMessage: string = '';

  private paramsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['search']) {
        this.searchText = params['search'];
      } else {
        this.searchText = '';
        this.unSelectLetters();
      }
      this.doSearch();
    });
  }

  doSearch() {
    if (!this.selectedLetter) {
      this.filteredTests = this.tests.filter(test => {
        return (test.name.indexOf(this.searchText) > -1);
      });
    } else {
      this.filteredTests = this.tests.filter(test => {
        return (test.name.indexOf(this.selectedLetter) == 0);
      });
      this.filteredTests = this.filteredTests.filter(test => {
        return (test.name.indexOf(this.searchText) > -1);
      });
    }
    this.constructResultMessage();
  }

  onLetterClick(letter: any) {
    if (letter.selected) {
      this.unSelectLetters();
    } else {
      this.unSelectLetters();
      letter.selected = true;
      this.selectedLetter = letter.value;
    }
    this.doSearch();
  }

  private unSelectLetters() {
    this.alphabet.forEach(letter => {
      letter.selected = false;
    });
    this.selectedLetter = '';
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
