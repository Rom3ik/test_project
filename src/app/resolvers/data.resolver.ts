import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {MoviesService} from '../services/movies.service';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<Observable<any>> {
  constructor(private moviesService: MoviesService,
              private authService: AuthService) {
  }


  resolve(): Observable<any> {
    return this.moviesService.getAllMovies();
  }
}
