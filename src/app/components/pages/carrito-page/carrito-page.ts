import { Component } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { CartModel } from '../../../models/CartModel';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-carrito-page',
  imports: [CurrencyPipe],
  templateUrl: './carrito-page.html',
  styleUrl: './carrito-page.scss',
})
export class CarritoPage {
  cart!: CartModel;

  constructor(private httpService: HttpService) {}
  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.httpService.getCartOfUser().subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
