import { Component, OnInit, Input } from "@angular/core";
import { ChannelService } from "../business-services/channel.service";
import { ConversationService } from "../business-services/conversation.service";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.css"]
})
export class ChannelsComponent implements OnInit {
  @Input()
  channelInfoID: string;
  chList: Array<any> = [];
  currentChannelConv: Array<any> = [];
  constructor(
    private channelService: ChannelService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.getConversations(this.channelInfoID);
  }

  getConversations(ciid: string): void {
    this.conversationService
      .getConversations(ciid)
      .subscribe(conversations => (this.currentChannelConv = conversations));
  }
}
