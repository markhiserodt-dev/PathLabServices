import { OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";

export class BaseComponent implements OnDestroy {
  ngUnsubscribe = new Subject<void>();

  resetForm(group: FormGroup): void {

    Object.keys(group.controls).forEach((key: string) => {

      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);

      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (resetRegistrationForm) passing it
      // the FormGroup so we can get to the form controls in it

      if (abstractControl instanceof FormGroup) {
        this.resetForm(abstractControl);
      } else {
        // If the control is not a FormGroup then we know it's a FormControl
        abstractControl.setValue('');
        abstractControl.setErrors(null);
      }

    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}