import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Test } from '../models/test.model';
import { BaseComponent } from '../shared/base-component';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent extends BaseComponent implements OnInit {

  title: string;
  id: number;

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

  constructor(private dialogRef: MatDialogRef<TestDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    super();
    this.title = data.title;
    this.id = data.id;
    if (data.test) {
      this.testForm.get('code').setValue(data.test.code);
      this.testForm.get('name').setValue(data.test.name);
      this.testForm.get('cptCode').setValue(data.test.cptCode);
      this.testForm.get('preferredRequirement').setValue(data.test.preferredRequirement);
      this.testForm.get('alternateRequirement').setValue(data.test.alternateRequirement);
      this.testForm.get('minimumVolume').setValue(data.test.minimumVolume);
      this.testForm.get('transportTemp').setValue(data.test.transportTemp);
      this.testForm.get('tat').setValue(data.test.tat);
      this.testForm.get('methodology').setValue(data.test.methodology);
      this.testForm.get('daysPerformed').setValue(data.test.daysPerformed);
      this.testForm.get('specialInstructions').setValue(data.test.specialInstructions);
      this.testForm.get('comments').setValue(data.test.comments);
      this.testForm.get('testIncluded').setValue(data.test.testIncluded);
      this.testForm.get('performingLab').setValue(data.test.performingLab);
      this.testForm.get('clinicalSignificance').setValue(data.test.clinicalSignificance);
    }
  }

  ngOnInit() {
  }

  save() {
    const test: Test = {
      id: this.id,
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

    this.dialogRef.close(test);
  }

  close() {
    this.dialogRef.close(undefined);
  }

}
