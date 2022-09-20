import { Component, Input } from "@angular/core";
@Component({
  selector: "tab",
  template: "<h2>{{ name }}</h2>",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent {
  @Input() name: string;
}
