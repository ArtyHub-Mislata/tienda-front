import { Component } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { OrderModel } from '../../../models/OrderModel';

@Component({
  selector: 'app-order-page',
  imports: [],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
})
export class OrderPage {
  constructor(private httpService: HttpService) {}
  orders!: OrderModel[];

  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.httpService.getOrdersOfUsers().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
