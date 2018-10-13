import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConversationService {
  private conversationHistories = {};
  constructor() {}

  getConversations(ciid: string): Observable<Array<any>> {
    return of(
      this.conversationHistories[ciid] ? this.conversationHistories[ciid] : []
    );
  }

  subscribeHistory(channelConversations: Array<any>) {
    channelConversations.reduce((manager, channel) => {
      console.log(JSON.stringify(channel, null, 2));

      if (manager[channel.ciid] === undefined) {
        manager[channel.ciid] = channel.conversations;
      } else {
        manager[channel.ciid] = this.concatConv(
          manager[channel.ciid],
          channel.conversations
        );
      }

      return manager;
    }, this.conversationHistories);
  }

  private concatConv(history: Array<any>, coming: Array<any>): Array<any> {
    // should be sorted by time(utc) ...
    return history.concat(coming);
  }
}
