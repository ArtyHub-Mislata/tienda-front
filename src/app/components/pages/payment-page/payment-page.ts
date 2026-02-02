import { Component } from '@angular/core';
import { PaymentModel } from '../../../models/PaymentModel';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'payment-page',
  imports: [FormsModule],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {
  payment: PaymentModel = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolderName: '',
    concept: '',
  };

  constructor(private http: HttpService, private router: Router) {}

  onSubmit() {
    console.log(this.payment);
    this.http.pay(this.payment).subscribe({
      next: (response: PaymentModel) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
