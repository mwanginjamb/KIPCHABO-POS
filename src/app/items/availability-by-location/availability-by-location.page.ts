import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-availability-by-location',
  templateUrl: './availability-by-location.page.html',
  styleUrls: ['./availability-by-location.page.scss'],
})
export class AvailabilityByLocationPage implements OnInit, OnDestroy {

Items: any;
isLoading = true;

itemSub: Subscription;
searchTerm: string = null;
searched: {} = null;

  constructor(
    private itemService: ItemService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.itemSub = this.itemService.items.subscribe(result => {
      // console.log(result);
      this.Items = [...result];
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      })
      .then(alertEl => {
        alertEl.present();
      });
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
  }


}
