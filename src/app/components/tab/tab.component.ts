import { Component, Input } from "@angular/core";
@Component({
  selector: "tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent {
  @Input() name: string;
  @Input() tab: number;
  @Input() index: number;
}
