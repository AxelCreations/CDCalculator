import { Component } from '@angular/core';
import { CapitalizedRow } from './models/capitalized.model';
import { CreditRow } from './models/credit.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CDCalculator';
}
