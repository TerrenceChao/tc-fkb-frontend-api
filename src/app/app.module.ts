import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GateComponent } from './gate/gate.component';
import { UserComponent } from './user/user.component';
import { FriendsComponent } from './friends/friends.component';
// import { ChannelsComponent } from './channels/channels.component';
import { SettingComponent } from './setting/setting.component';

import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppRoutingModule } from './app-routing.module';
import { ChannelsModule } from './channels/channels.module';

@NgModule({
  declarations: [
    AppComponent,
    GateComponent,
    UserComponent,
    FriendsComponent,
    // ChannelsComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppBootstrapModule,
    AppRoutingModule,
    ChannelsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
