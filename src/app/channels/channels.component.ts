import { Component, OnInit } from "@angular/core";
import { ChannelService } from "../business-services/channel.service";
import { ConversationService } from "../business-services/conversation.service";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.css"]
})
export class ChannelsComponent implements OnInit {
  public currentChannelConv: Array<any> = [];
  constructor(
    private channelService: ChannelService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.getConversations("ciid B");
  }

  getConversations(ciid: string): void {
    this.currentChannelConv = this.conversationService.getConversations(ciid);
  }
}
