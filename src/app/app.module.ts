import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ChannelsComponent } from "./channels/channels.component";

import { AppRoutingModule } from "./app-routing.module";
import { GateComponent } from "./gate/gate.component";
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppBootstrapModule } from "./app-bootstrap/app-bootstrap.module";

@NgModule({
  declarations: [AppComponent, ChannelsComponent, GateComponent],
  imports: [BrowserModule, AppBootstrapModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
