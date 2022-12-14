import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { TAG_NAME } from "./helpers/constants/tag-name.constant";
import { SourceEnum } from "./helpers/enums/source.enum";
import { HttpService } from "./services/http.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpService) {}
  swapi$: Observable<any>;
  status: string = "idle";
  loading: boolean = true;

  defaultUrl: string = "https://swapi.dev/api";
  apiUrl: string = this.defaultUrl;

  ngOnInit(): void {
    this.callApi(this.apiUrl, this.sourceInit());
  }

  callApi(url: string, source?: string): void {
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

  handleClick(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (TAG_NAME in target && target[TAG_NAME].toLowerCase() === "a") {
      this.apiUrl = target.innerHTML;
      this.callApi(this.apiUrl, this.sourceClick());
    }
  }
  sourceChange(): string {
    return SourceEnum.CHANGE;
  }
  sourceSubmit(): string {
    return SourceEnum.SUBMIT;
  }
  sourceInit(): string {
    return SourceEnum.INIT;
  }
  sourceClick(): string {
    return SourceEnum.CLICK;
  }
}
