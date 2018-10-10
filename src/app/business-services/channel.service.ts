import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ConversationService } from "./conversation.service";

@Injectable({
  providedIn: "root"
})
export class ChannelService {
  private channelList: Array<any> = [];
  constructor(private conversationService: ConversationService) {}

  createChannel(channelName: string) {}

  /**
   * 1) How to dymatic add channel if being invited??
   */
  joinChannel(channel: any) {}

  /**
   * 2) How to dymatic remove channel if you have leaved a channel?
   */
  leaveChannel(ciid: string) {}

  getList(): Observable<Array<any>> {
    return of(this.channelList);
  }

  subscribeList(channels: Array<any>): void {
    // few things have to remind...
    this.channelList = channels;
    console.log(JSON.stringify(this.channelList, null, 2));
  }
}
