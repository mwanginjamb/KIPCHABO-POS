import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from './../item.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  card: Item ;
  itemSub: Subscription;
  constructor( private itemService: ItemService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    // Get Item No. from Url Parameters
   const id = this.activatedRoute.snapshot.paramMap.get('id');

   console.log(id);

   // Get Item Card

   this.itemService.itemcard(id).subscribe(cardInfo => {
      this.card = [...cardInfo][0]; // Reference the resulting array and access first element, which an obj
      console.log(this.card);
   });
  }

}
