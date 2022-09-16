import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpService } from './services/http-service';
import { AnchorPipe } from './pipes/anchor.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, AnchorPipe],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
