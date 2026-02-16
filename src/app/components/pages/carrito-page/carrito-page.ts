import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { CartModel } from '../../../models/CartModel';
import { CommonModule } from '@angular/common';
import { CartItemModel } from '../../../models/CartItemModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './carrito-page.html',
  styleUrl: './carrito-page.scss',
})
export class CarritoPage implements OnInit {
  cart!: CartModel;
  
  showToast: boolean = false;
  isHidingToast: boolean = false;
  toastMessage: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.httpService.getCartOfUser().subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (err) => console.log(err),
    });
  }

  get total(): number {
    return this.cart?.cartItems?.reduce((acc, item) => acc + item.artwork.price * item.quantity, 0) || 0;
  }

  increaseQuantity(item: CartItemModel) {
    item.quantity++;
    this.updateCart();
  }

  decreaseQuantity(item: CartItemModel) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  removeItem(item: CartItemModel) {
    this.cart.cartItems = this.cart.cartItems.filter(i => i.id !== item.id);
    
    this.httpService.updateCart(this.cart).subscribe({
      next: () => {
        this.triggerToast(`"${item.artwork.name}" eliminada de tu colección`);
      },
      error: (err) => {
        console.error(err);
        this.loadCart();
      }
    });
  }

  updateCart() {
    this.httpService.updateCart(this.cart).subscribe({
      next: (cart) => console.log('Carrito actualizado'),
      error: (err) => console.log(err),
    });
  }

  private triggerToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    this.isHidingToast = false;
    setTimeout(() => {
      this.isHidingToast = true;
      setTimeout(() => {
        this.showToast = false;
        this.isHidingToast = false;
      }, 500);
    }, 2500);
  }
}