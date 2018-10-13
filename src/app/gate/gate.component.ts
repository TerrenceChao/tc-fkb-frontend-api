import { Component, OnInit } from "@angular/core";

import { AuthService } from "../business-services/auth.service";
import { UserService } from "../business-services/user.service";
import { FriendService } from "../business-services/friend.service";
import { ChannelService } from "../business-services/channel.service";

@Component({
  selector: "app-gate",
  templateUrl: "./gate.component.html",
  styleUrls: ["./gate.component.css"]
})
export class GateComponent implements OnInit {
  featureSelecter: string = "user";

  friendList: Array<any> = [];
  channelList: Array<any> = [];
  currentChannel: string = "";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private friendService: FriendService,
    private channelService: ChannelService
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

  getChannelList(): void {
    this.channelService
      .getList()
      .subscribe(chList => (this.channelList = chList));
    // this.channels.getList();
    // this.channelList = this.channels.chList;
  }

  selectChannel(ciid: string): void {
    this.currentChannel = ciid;
    console.log(`this.currentChannel is ${this.currentChannel}`);
    // this.conversationService.getConversations(ciid);
    // this.channels.channelInfoID = ciid;
    // this.channels.getConversations(ciid);
  }
}
