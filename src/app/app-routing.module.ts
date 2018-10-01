import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GateComponent } from "./gate/gate.component";
import { ChannelsComponent } from "./channels/channels.component";

const routes: Routes = [
  { path: "gate", component: GateComponent },
  // { path: "", redirectTo: "gate", pathMatch: "full" },
  { path: "channels", component: ChannelsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
