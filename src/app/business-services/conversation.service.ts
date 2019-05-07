import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { WebSocketService } from "./web-socket.service";

@Injectable({
  providedIn: "root"
})
export class ConversationService {
  private webSocketService: WebSocketService;
  private conversationHistories = {};
  constructor() {}

  setWebSocket(webSocketService: WebSocketService): ConversationService {
    this.webSocketService = webSocketService;
    return this;
  }

  getHistory(ciid: string): Observable<Array<any>> {
    return of(
      this.conversationHistories[ciid] ? this.conversationHistories[ciid] : []
    );
  }

  subscribeHistory(channelConversations: Array<any>) {
    channelConversations.reduce((histories, channel) => {
      console.log(JSON.stringify(channel, null, 2));

      if (histories[channel.ciid] === undefined) {
        histories[channel.ciid] = channel.conversations;
      } else {
        histories[channel.ciid] = this.concatConv(
          histories[channel.ciid],
          channel.conversations
        );
      }

      return histories;
    }, this.conversationHistories);
  }

  private concatConv(history: Array<any>, coming: Array<any>): Array<any> {
    // should be sorted by time(utc) ...
    return history.concat(coming);
  }

  sendConversation(packet: any) {
    console.log('send conv: ', JSON.stringify(packet, null, 2))
    this.webSocketService.sendConversation(packet);
  }

  subscribeComing(packet: any) {
    console.log(`subscribeComing: ${JSON.stringify(packet, null, 2)}`);
    if (packet.data === undefined) {
      return;
    }

    let histories = this.conversationHistories;
    let conversation = this.packConversation(packet);
    // console.log(`conversation: ${JSON.stringify(conversation, null, 2)}`);

    if (histories["ciid B"] === undefined) {
      histories["ciid B"] = [conversation];
    } else {
      histories["ciid B"] = this.concatConv(histories["ciid B"], [
        conversation
      ]);
    }
  }

  private packConversation(packet: any): any {
    let data = packet.data;
    return {
      sender: data.uid,
      type: data.type || "text",
      content: data.conversation,
      created_at: data.datetime
    };
  }
}
