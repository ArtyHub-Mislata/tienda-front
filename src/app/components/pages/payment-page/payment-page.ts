import { Component } from '@angular/core';
import { PaymentModel } from '../../../models/PaymentModel';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http-service';
import { Router } from '@angular/router';
import { Status } from '../../../models/StatusModel';

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
    amount: 0,
    status: Status.PENDING,
  };

  isHiding: boolean = false;
  showMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private http: HttpService, private router: Router) {}

  onSubmit() {
    this.http.pay(this.payment).subscribe({
      next: () => {
        this.showMessage = true;
        this.isHiding = false;
        setTimeout(() => {
          this.isHiding = true;
          setTimeout(() => {
            this.showMessage = false;
            this.isHiding = false;
          }, 500);
        }, 3000);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.showErrorMessage = true;
        this.isHiding = false;
        setTimeout(() => {
          this.isHiding = true;
          setTimeout(() => {
            this.showErrorMessage = false;
            this.isHiding = false;
          }, 500);
        }, 3000);
        this.router.navigate(['/payment']);
      },
    });
  }
}
