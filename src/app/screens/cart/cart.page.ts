/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Food } from 'src/app/models/food.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;

  foods: Food[] = [];
  tempF: Food[] = [];

  constructor(private cartService: CartService,
    private alertCtrl: AlertController) {
      this.tempF = this.foods;
     }

  ngOnInit() {
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id);
  }

  onDecrease(item: CartItem) {
    if(item.quantity === 1) {this.removeFromCart(item);};
    this.cartService.changeQty(-1, item.id);
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Remove',
      message: 'Are you sure you want to remove item',
      buttons: [
        {
          text: 'yes',
          //handler: () => this.cartService.removeItem(item.id),
          handler: () =>this.cartService.removeItem(item.id),
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }

  search(data){

    const value = data.target.value;

    this.foods = this.tempF;

    const filter = this.foods.filter(el => el.title.toLowerCase().includes(value.toLowerCase()));

    this.foods = filter;

  }

   test1 = [
    {
      code: 123456,
      order: [
        {
          id: 4,
          title: 'Vase',
          price: 320,
          image: 'assets/images/i4.jpg',
          description:
            'Rechargable driller with 18v ksjkhsjs isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj',
        }
      ]
    },
    {
      code: 123457,
      order: [
        {
          id: 5,
          title: 'Vase',
          price: 320,
          image: 'assets/images/i5.jpg',
          description:
            'Rechargable driller with 18v ksjkhsjs isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj',
        }
      ]
    },
    {
      code: 123458,
      order: [
        {
          id: 6,
          title: 'Vase',
          price: 320,
          image: 'assets/images/i6.jpg',
          description:
            'Rechargable driller with 18v ksjkhsjs isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj',
        }
      ]
    }

  ];

}
