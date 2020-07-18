import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from './item.service';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

Items: any;

itemSub: Subscription;
searchTerm: string = null;
searched: {} = null;
appSub: Subscription;

  constructor( private itemService: ItemService, public platform: Platform) {
    this.appSub = this.platform.backButton.subscribeWithPriority(666666, () => {
      if ( this.constructor.name === 'ItemsPage' ) {
          if (window.confirm("Do you want to exit the app?")) {
            navigator['app'].exitApp();
          }
      }
    });
   }

  ngOnInit() {

    this.itemSub = this.itemService.items
    .subscribe(result => {
      console.log(result);
      this.Items = [...result];
    });

  }

  searchItem($event) {
    const searchItems = [... this.Items];

    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.Items = searchItems.filter((prod) => {
        if ( prod.Description && prod.Description.length > 1 ){
          return ( prod.Description.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.initializeItems();
    }

  }

  initializeItems() {
    this.itemSub = this.itemService.items
    .subscribe(result => {
      console.log(result);
      this.Items = [...result];
    });
  }

  ngOnDestroy() {
    if ( this.itemSub ) {
      this.itemSub.unsubscribe();
    }

    if (this.appSub ) {
      this.appSub.unsubscribe();
    }

  }

}
