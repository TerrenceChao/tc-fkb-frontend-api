import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FriendsComponent } from './friends/friends.component';
import { ChannelsComponent } from './channels/channels.component';
import { SettingComponent } from './setting/setting.component';
import { FEATURES } from './gate/feature';

const routes: Routes = [
  {
    path: FEATURES.USER,
    component: UserComponent
  },
  {
    path: FEATURES.FRIENDS,
    component: FriendsComponent
  },
  {
    path: FEATURES.CHANNELS,
    component: ChannelsComponent
  },
  {
    path: FEATURES.SETTING,
    component: SettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
