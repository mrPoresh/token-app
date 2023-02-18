import { Injectable } from '@angular/core';

const w = () => {
  return window;
};

@Injectable({
  providedIn: 'root'
})
export class WindowProviderService {

  constructor() { }

  get window(): any {
    return w();
  }

}
