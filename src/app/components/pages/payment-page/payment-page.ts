import { Component } from '@angular/core';
import { PaymentModel } from '../../../models/PaymentModel';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http-service';
import { Router } from '@angular/router';
import { Status } from '../../../models/StatusModel';
import { CartModel } from '../../../models/CartModel';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'payment-page',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {
  payment: PaymentModel = {
    cardDto: {
      nTarget: '',
      dateExpiration: '',
      cvv: '',
      holderName: '',
    },
    concept: '',
    amount: 0,
    status: Status.PENDING,
  };

  isHiding: boolean = false;
  showMessage: boolean = false;
  showErrorMessage: boolean = false;
  cart!: CartModel;

  constructor(
    private http: HttpService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.http.getCartOfUser().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.payment.amount = this.cart.cartItems.reduce(
          (acc, item) => item.artwork.price * item.quantity,
          0,
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  realizarPago() {
    this.http.pay(this.payment).subscribe({
      next: () => {
        this.vaciarCarro();
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
      },
    });
  }
  vaciarCarro() {
    const id = this.cart.id.toString();
    this.http.clearCart(id).subscribe({
      next: () => {
        console.log('SE HA VACIADO EL CARRITO');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    this.realizarPago();
  }
}
