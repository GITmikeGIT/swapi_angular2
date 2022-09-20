import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ApiCallComponent } from "./components/api-call/api-call.component";
import { TabComponent } from "./components/tab/tab.component";
import { AnchorPipe } from "./pipes/anchor.pipe";
import { HttpService } from "./services/http.service";

const components = [AppComponent, TabComponent, ApiCallComponent];
const pipes = [AnchorPipe];
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [...pipes, ...components],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
