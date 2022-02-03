import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) {
  }

  getAllMovies() {
    return this.http.get(environment.URLS.GET_ALL_MOVIES);
  }
  getMovie(url){
    return this.http.get(url);
  }
  getData(url) {
      return this.http.get(url);
  }
}
