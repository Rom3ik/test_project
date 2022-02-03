import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {UtilService} from '../../services/util.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  movies: any = [];

  constructor(
    private moviesService: MoviesService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.movies = this.route.snapshot.data.data.results;
    this.sortMoviesByEpisodeId(this.movies);
  }


  trackByEpisodeId(index, item): any {
    return item.episode_id;
  }

  sortMoviesByEpisodeId(movie): void {
    movie.sort((a, b) => {
      return a.episode_id - b.episode_id;
    });
  }

  goToMoviePage(movieUrl: string): void {
    this.router.navigate(['/movie'], {state: {movieUrl}});
  }

}
