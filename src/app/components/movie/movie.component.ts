import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MovieModalComponent} from '../movie-modal/movie-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})


export class MovieComponent implements OnInit, OnDestroy {
  dataLoaded = false;
  movieUrl = '';
  movieData: any;
  starships: any = [];
  characters: any = [];
  planets: any = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private movieService: MoviesService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    const stateDate = this.router.getCurrentNavigation().extras.state;
    if (stateDate && stateDate.movieUrl) {
      this.movieUrl = stateDate.movieUrl;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {

    this.getMovie(this.movieUrl);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  getMovie(url): void {
    this.movieService.getMovie(url).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: any) => {
        this.movieData = res;
        this.getStarships(this.movieData.starships);
        this.getCharacters(this.movieData.characters);
        this.getPlanets(this.movieData.planets);
      }
    );
  }

  movieDetails(data: any, type: string): void {
    this.dialog.open(MovieModalComponent, {
      disableClose: true,
      width: '350px',
      autoFocus: false,
      data: {data, type},
    });
  }

  getCharacters(characters): void {
    for (const char of Object.keys(characters)) {
      this.movieService.getData(this.movieData.characters[char]).subscribe(
        (res: any) => {
          this.characters.push(res);
          this.characters.sort((a, b) => a.name < b.name ? -1 : 1);
          this.dataLoaded = true;
        },
        err => {
          this.snackbar.open(err.error.message, '', {
            duration: 2000
          });
          return err;
        }
      );
    }
  }

  getPlanets(planets): void {
    for (const planet of Object.keys(planets)) {
      this.movieService.getData(this.movieData.planets[planet]).subscribe(
        (res: any) => {
          this.planets.push(res);
          this.planets.sort((a, b) => a.name < b.name ? -1 : 1);
        },
        err => {
          this.snackbar.open(err.error.message, '', {
            duration: 2000
          });
          return err;
        }
      );
    }
  }

  getStarships(starships): void {
    for (const star of Object.keys(starships)) {
      this.movieService.getData(this.movieData.starships[star]).subscribe(
        (res: any) => {
          this.starships.push(res);
          this.starships.sort((a, b) => a.name < b.name ? -1 : 1);
        },
        err => {
          this.snackbar.open(err.error.message, '', {
            duration: 2000
          });
          return err;
        }
      );
    }
  }
}
