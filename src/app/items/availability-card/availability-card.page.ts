import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { Itembalance } from 'src/app/models/itembalance.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-availability-card',
  templateUrl: './availability-card.page.html',
  styleUrls: ['./availability-card.page.scss'],
})
export class AvailabilityCardPage implements OnInit, OnDestroy {

  card: Itembalance;
  cardSub: Subscription;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const ItemNo = this.activatedRoute.snapshot.paramMap.get('No');
 
    // Get Item Balance Card
    this.cardSub = this.itemService.itemBalance(ItemNo).subscribe(res => {
      console.log(res);
      this.card = res;
    });
  }

  ngOnDestroy(){
    if (this.cardSub){
      this.cardSub.unsubscribe();
    }
  }

}
