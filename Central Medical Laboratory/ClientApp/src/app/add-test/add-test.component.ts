import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { take } from 'rxjs/operators';
import { Test } from '../models/test.model';
import { TestsService } from '../services/tests.service';
import { BaseComponent } from '../shared/base-component';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent extends BaseComponent implements OnInit {

  testForm: FormGroup = new FormGroup({
    code: new FormControl(undefined || '', Validators.required),
    name: new FormControl('', Validators.required),
    cptCode: new FormControl(undefined || ''),
    preferredRequirement: new FormControl(''),
    alternateRequirement: new FormControl(''),
    minimumVolume: new FormControl (''),
    transportTemp: new FormControl(''),
    tat: new FormControl(''),
    methodology: new FormControl(''),
    daysPerformed: new FormControl(''),
    specialInstructions: new FormControl(''),
    comments: new FormControl(''),
    testIncluded: new FormControl(''),
    performingLab: new FormControl(''),
    clinicalSignificance: new FormControl('')
  });

  constructor(private testsService: TestsService, private dialogRef: MatDialogRef<AddTestComponent>) {
    super();
  }

  ngOnInit() {
    
  }

  addTest() {
    const test: Test = {
      id: 0,
      code: +this.testForm.get('code').value,
      name: this.testForm.get('name').value,
      cptCode: +this.testForm.get('cptCode').value,
      preferredRequirement: this.testForm.get('preferredRequirement').value,
      alternateRequirement: this.testForm.get('alternateRequirement').value,
      minimumVolume: this.testForm.get('minimumVolume').value,
      transportTemp: this.testForm.get('transportTemp').value,
      tat: this.testForm.get('tat').value,
      methodology: this.testForm.get('methodology').value,
      daysPerformed: this.testForm.get('daysPerformed').value,
      specialInstructions: this.testForm.get('specialInstructions').value,
      comments: this.testForm.get('comments').value,
      testIncluded: this.testForm.get('testIncluded').value,
      performingLab: this.testForm.get('performingLab').value,
      clinicalSignificance: this.testForm.get('clinicalSignificance').value
    };

    this.testsService.addTest(test).pipe(take(1)).subscribe((test: Test) => {
      this.dialogRef.close(test);
    });
  }

  close() {
    this.dialogRef.close(undefined);
  }

}
