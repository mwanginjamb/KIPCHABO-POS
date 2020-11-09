import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Collection } from "../models/collection.model";
import { Collectionline } from "../models/collectionline.model";

@Injectable({
  providedIn: "root",
})
export class CollectionService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  get Collections() {
    return this.http
      .get<Collection[]>(`${this.url}site/get?service=GreenLeafCollectionList`)
      .pipe(take(1));
  }

  // Create New Sales Invoice

  createCollection() {
    return this.http.get<Collection>(`${this.url}site/leafcollection`);
  }

  // Retrieve Sales Invoice Card / Details
  collectionCard(id: string) {
    return this.http.get<Collection>(
      `${this.url}site/leafcollectioncard/?id=${id}`
    );
  }

  // Post Lines Data
  createLine(DocNo: string) {
    return this.http.post<Collectionline>(
      `${this.url}site/leafcollectionline?DocNo=${DocNo}`,
      JSON.stringify({})
    );
  }

  // Update Line

  updateCollectionLine(line: Collectionline) {
    return this.http.post<Collectionline>(
      `${this.url}site/updateleafcollectionline`,
      JSON.stringify(line)
    );
  }

  // Fetch Line to Update
  getLine(No: number, LineNo: string) {
    return this.http.get<Collectionline>(
      `${this.url}site/collectionlinetoupdate?No=${No}&Weighment_No=${LineNo}`
    );
  }

  // Post Collection Header

  postCollection(collection: Collection) {
    return this.http.post<Collection>(
      `${this.url}site/updateleafcollection`,
      JSON.stringify(collection)
    );
  }

  // Get Shades

  get Shades() {
    return this.http.get(`${this.url}site/get?service=Shades`).pipe(take(1));
  }

  get Farmers() {
    return this.http
      .get(`${this.url}site/get?service=VendorList`)
      .pipe(take(1));
  }
}
