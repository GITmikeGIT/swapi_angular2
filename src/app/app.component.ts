import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './services/http-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpService) {}
  swapi$: Observable<any>;
  status: string = 'idle';

  apiUrl: string = 'https://swapi.dev/api';

  ngOnInit() {
    this.callApi(this.apiUrl, 'OnInit');
  }

  callApi(url: string, source?: string) {
    this.setStatus(`${source} => call`);
    this.swapi$ = this.http.get(url).pipe(
      tap({
        next: (val) => {
          this.setStatus(`${source} => tap -> next`);
        },
        error: (error) => {
          this.setStatus(`${source} => tap -> error -> ${error.message}`);
          console.log(error.message);
        },
        complete: () => this.setStatus(`${source} => tap -> completed`),
      })
    );
  }

  setStatus(message: string) {
    this.status = message;
  }
}
