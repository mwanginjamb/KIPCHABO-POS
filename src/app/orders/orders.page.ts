import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Subscription } from 'rxjs';
import { Salesorder } from '../models/salesorder.model';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
   orders: Invoice[];
   orderSub: Subscription;
   isLoading = false;

   searchTerm: string = null;

  constructor( private orderService: OrderService, private popoverCtrl: PopoverController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.orderSub = this.orderService.orders.subscribe(result => {
      console.log(result);
      this.orders = [...result];
      this.isLoading = false;
    }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      }).then(alertEl => {
        alertEl.present();
      });
    });

  }

  ionViewWillEnter() {
  }

  async presentPopover(event) {
    return await this.popoverCtrl.create({
      component: PopoverComponent,
      event
    }).then(pop => {
      pop.present();
    });
  }

  searchInvoice($event) {
    const searchItems = [... this.orders];

    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.orders = searchItems.filter((invoice) => {
        if ( invoice.Sell_to_Customer_Name && invoice.Sell_to_Customer_Name.length > 1 ){
          return ( invoice.Sell_to_Customer_Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.initializeItems();
    }

  }

  initializeItems() {
    this.orderSub = this.orderService.orders.subscribe(result => {
      console.log(result);
      this.orders = [...result];
      this.isLoading = false;
    }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      }).then(alertEl => {
        alertEl.present();
      });
    });
  }

  ngOnDestroy() {
    if (this.orderSub ) {
      this.orderSub.unsubscribe();
    }
  }

}
