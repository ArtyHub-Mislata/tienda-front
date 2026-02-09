import { Component } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { CartModel } from '../../../models/CartModel';
import { CurrencyPipe } from '@angular/common';
import { CartItemModel } from '../../../models/CartItemModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito-page',
  imports: [CurrencyPipe, RouterLink],
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
  get total(): number {
    return this.cart.cartItems.reduce((acc, item) => acc + item.artwork.price * item.quantity, 0);
  }
  increaseQuantity(item: CartItemModel) {
    item.quantity++;
    this.updateCart();
  }
  decreaseQuantity(item: CartItemModel) {
    item.quantity--;
    this.updateCart();
  }
  updateCart() {
    this.httpService.updateCart(this.cart).subscribe({
      next: (cart) => {
        console.log(cart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
