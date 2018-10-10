import { Component, OnInit } from "@angular/core";

import { AuthService } from "../business-services/auth.service";
import { UserService } from "../business-services/user.service";
import { ChannelService } from "../business-services/channel.service";
import { ConversationService } from "../business-services/conversation.service";

@Component({
  selector: "app-gate",
  templateUrl: "./gate.component.html",
  styleUrls: ["./gate.component.css"]
})
export class GateComponent implements OnInit {
  featureSelecter: string = "user";
  channelList: Array<any> = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private channelService: ChannelService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn();
  }

  selectFeature(feature: string): void {
    this.featureSelecter = feature;

    switch (feature) {
      case "user":
        break;
      case "friends":
        break;
      case "channels":
        this.getChannelList();
        break;
      case "setting":
        break;
    }
  }

  protected getChannelList(): void {
    this.channelService
      .getList()
      .subscribe(chList => (this.channelList = chList));
  }
}
