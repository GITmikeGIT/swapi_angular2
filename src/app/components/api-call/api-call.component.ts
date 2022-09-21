import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, tap } from "rxjs";
import { TAG_NAME } from "src/app/helpers/constants/tag-name.constant";
import { SourceEnum } from "./../../helpers/enums/source.enum";
import { HttpService } from "./../../services/http.service";

@Component({
  selector: "api-call",
  templateUrl: "./api-call.component.html",
  styleUrls: ["./api-call.component.css"],
})
export class ApiCallComponent {
  constructor(private http: HttpService) {}

  @Input() apiUrl: string = "https://swapi.dev/api";
  @Input() disabled: boolean = false;
  @Output() newStatusEvent = new EventEmitter<string>();

  swapi$: Observable<any>;

  ngOnInit() {
    this.callApi(this.apiUrl, this.sourceInit());
  }

  callApi(url: string, source: string = "emptySource"): void {
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

  handleClick(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (TAG_NAME in target && target[TAG_NAME].toLowerCase() === "a") {
      this.apiUrl = target.innerHTML;
      this.callApi(this.apiUrl, this.sourceClick());
    }
  }

  setStatus(message: string) {
    this.newStatusEvent.emit(message);
  }

  sourceChange(): string {
    return SourceEnum.CHANGE;
  }
  sourceSend(): string {
    return SourceEnum.SEND;
  }
  sourceInit(): string {
    return SourceEnum.INIT;
  }
  sourceClick(): string {
    return SourceEnum.CLICK;
  }
}
