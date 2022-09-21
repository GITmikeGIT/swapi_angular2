import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  status: string = "idle";
  tab: number = 0;
  disabled: boolean = true;
  apiRoutes: Array<string> = ["API", "People", "Starship", "Planet"];
  apiRoutesUrl: Array<string> = [
    "https://swapi.dev/api",
    "https://swapi.dev/api/people/",
    "https://swapi.dev/api/starships/",
    "https://swapi.dev/api/planets/",
  ];

  setStatus(message: string): void {
    this.status = message;
  }
}
