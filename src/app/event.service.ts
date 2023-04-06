import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private onDataUpdated = new Subject<any>();

  public onDataUpdated$ = this.onDataUpdated.asObservable();

  updateData(data: any) {
    this.onDataUpdated.next(data);
  }


}
