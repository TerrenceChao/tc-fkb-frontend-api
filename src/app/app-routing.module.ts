import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChannelsComponent } from "./channels/channels.component";

const routes: Routes = [{ path: "channels", component: ChannelsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
