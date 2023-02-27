import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoaderStatus {
  status: boolean,
  params?: {task: string/* , complite: boolean */}[]
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader = new BehaviorSubject<LoaderStatus>({status: false});

  constructor() { }

  show(data: LoaderStatus) {
    let current = this.loader.getValue();
    this.loader.next({ ...current, ...data });
  }

  hide() {
    this.loader.next({status: false});
  }

  attach(): Observable<LoaderStatus> {
    return this.loader.asObservable();
  }

}