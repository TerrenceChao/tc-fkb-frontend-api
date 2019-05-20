import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FriendsComponent } from './friends/friends.component';
import { ChannelsComponent } from './channels/channels.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'channels', component: ChannelsComponent },
  { path: 'setting', component: SettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
