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
  // Flag to show the results section
  public showResultsSection = false;

  // Create a Reactive Form to get input values
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

  // Instanciate results classes
  public capitalizedRows: CapitalizedRow[] = [];
  public creditRows: CreditRow[] = [];

  // Final results of calculated benefit
  public capitalizedBenefit = 0;
  public creditBenefit = 0;

  onSubmit(): void {
    if (this.form.valid) {
      // Generate the results rows
      this.GeneratecapitalizedRowss(this.form.value);
      this.GeneratecreditRowss(this.form.value);

      // Show the results section
      this.showResultsSection = true;
    } else {
      this.showResultsSection = false;
    }
  }

  private GeneratecapitalizedRowss(values: any): void {
    // Get the separated values of input
    const Months: number = values.months as number;
    const InitialDate: Date = new Date(values.depositDate);
    const Amount: number = values.depositAmount as number;
    const Rate: number = values.depositRate as number;
    let newAmount: number = Amount;
    let newInterest: number;

    // Clear the current rows data
    this.capitalizedRows = [];
    this.capitalizedBenefit = 0;

    for (let index = 1; index < Months + 1; index++) {
      // Increment one month to InitialDate
      InitialDate.setMonth(InitialDate.getMonth() + 1);

      // Calculate the interest and new amount
      newInterest = (newAmount * (Rate / 100) / 360) * 30;
      newAmount += newInterest;

      // Calculate the final benefit
      this.capitalizedBenefit += newInterest;

      this.capitalizedRows.push(
        new CapitalizedRow(InitialDate, newInterest, newAmount)
      );
    }
  }

  private GeneratecreditRowss(values: any): void {
    // Get the separated values of input
    const Months: number = values.months as number;
    const InitialDate: Date = new Date(values.depositDate);
    const Amount: number = values.depositAmount as number;
    const Rate: number = values.depositRate as number;
    const Interest = (Amount * (Rate / 100) / 360) * 30;

    // Clear the current rows data
    this.creditRows = [];
    this.creditBenefit = 0;

    for (let index = 1; index < Months + 1; index++) {
      // Increment one month to InitialDate
      InitialDate.setMonth(InitialDate.getMonth() + 1);

      // Calculate the final benefit
      this.creditBenefit += Interest;

      this.creditRows.push(
        new CreditRow(InitialDate, Interest)
      );
    }
  }
}
