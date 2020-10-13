import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CapitalizedRow } from './models/capitalized.model';
import { CreditRow } from './models/credit.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public showResultsSection = false;
  form = new FormGroup({
    months: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(12)
    ]),
    depositDate: new FormControl('', [
      Validators.required
    ]),
    depositAmount: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    depositRate: new FormControl('', [
      Validators.required,
      Validators.min(0.5)
    ])
  });

  public capitalizedRow: CapitalizedRow[] = [];
  public creditRow: CreditRow[] = [];

  onSubmit(): void {
    if (this.form.valid) {
      this.showResultsSection = true;
    } else {
      this.showResultsSection = false;
    }
  }
}
