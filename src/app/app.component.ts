import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './services/http.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpService) {}
  swapi$: Observable<any>;
  status: string = 'idle';
  loading: boolean = true;

  defaultUrl: string = 'https://swapi.dev/api';
  apiUrl: string = this.defaultUrl;

  ngOnInit() {
    this.callApi(this.apiUrl, 'OnInit');
  }

  callApi(url: string, source?: string): void {
    console.log(url);
    this.setStatus(`${source} => call`);
    this.swapi$ = this.http.get(url).pipe(
      tap({
        next: (val) => {
          this.setStatus(`${source} => tap -> next`);
        },
        error: (error) => {
          this.setStatus(`${source} => tap -> error -> ${error.message}`);
        },
        complete: () => this.setStatus(`${source} => tap -> completed`),
      })
    );
  }

  setStatus(message: string): void {
    this.status = message;
  }

  handleClick(event): void {
    event.preventDefault();
    event.stopPropagation();
    if (
      'tagName' in event.target &&
      event.target.tagName.toLowerCase() === 'a'
    ) {
      this.apiUrl = event.target.innerHTML;
      this.callApi(this.apiUrl, 'handleClick');
    }
  }
}
