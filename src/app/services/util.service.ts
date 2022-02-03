import {Injectable} from '@angular/core';
import {Params, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private router: Router) {

  }

  goTo(path: string, params?: any) {
    this.router.navigate([path], params);
  }

}
