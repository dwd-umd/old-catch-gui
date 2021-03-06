import { Component, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.scss']
})
export class SearchContentComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      objid: new FormControl('', {
        validators: [Validators.required]
      }),
      start: new FormControl('', { validators: [this.validateStart] }),
      end: new FormControl('', { validators: [this.validateEnd] })
    });
  }

  onMOV() {
    const navigationExtras: NavigationExtras = {
      state: {
        objid: this.form!.get('objid')!.value
      }
    };
    this.router.navigate(['mov'], navigationExtras);
  }

  isFormSubmittable() {
    // Fail if errors
    const isObjidOK = !this.form!.get('objid')!.errors;
    const isStartOK = !this.form!.get('start')!.errors;
    const isEndOK = !this.form!.get('end')!.errors;
    if (!isObjidOK || !isStartOK || !isEndOK) return false;

    // Test end is greater than start
    const start = this.form!.get('start')!.value;
    const end = this.form!.get('end')!.value;
    const isStartNumeric = !!parseInt(start, 10);
    const isEndNumeric = !!parseInt(end, 10);
    if (isStartNumeric && isEndNumeric && start >= end) return false;

    return true;
  }

  validateStart(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === '') return null;
    const isNumeric = !!parseInt(control.value, 10);
    return isNumeric ? null : { validateStart: { value: control.value } };
  }

  validateEnd(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === '') return null;
    const isNumeric = !!parseInt(control.value, 10);
    return isNumeric ? null : { validateEnd: { value: control.value } };
  }
}
