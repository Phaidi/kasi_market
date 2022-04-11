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

  foods: any[] = [];
  codeItems: any;

  tempF: any[] = [];
  test1 = this.tempF = [
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

  searchCode(data){

    const value = data.target.value;

    this.foods = this.tempF;

    
    const filter = this.test1.filter(el => el.code.toString() ==(value));
    this.foods = filter;
 
    if(value =='' || !filter){
      this.foods = []
      this.codeItems = [];
    };
  


  }

  getCodeProducts(code){
    const filter = this.test1.find(el => el.code.toString()==code);

    this.codeItems = filter.order;

    // console.log('Hello',filter.order)

  }

  addToCart(order){
    order[0].quantity = 1;
    order[0].name = order[0].title;
    // console.log(order[0])
    this.cartService.addToCart(order[0])
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();

  }

  
}
