import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ChannelsComponent } from "./channels/channels.component";

import { AppRoutingModule } from "./app-routing.module";
import { GateComponent } from "./gate/gate.component";
import { AppBootstrapModule } from "./app-bootstrap/app-bootstrap.module";
import { UserComponent } from "./user/user.component";
import { SettingComponent } from "./setting/setting.component";
import { FriendsComponent } from "./friends/friends.component";

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    GateComponent,
    UserComponent,
    SettingComponent,
    FriendsComponent
  ],
  imports: [BrowserModule, FormsModule, AppBootstrapModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
