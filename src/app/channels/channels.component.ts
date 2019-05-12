import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { ChannelService } from '../business-services/channel.service';
import { ConversationService } from '../business-services/conversation.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit, OnChanges {
  @Input()
  channelInfoID: string = '';
  // chList: Array<any> = [];
  currentChannelConv: Array<any> = [];
  saying: string = '';
  constructor(
    // private channelService: ChannelService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    if (this.channelInfoID === '') {
      // find the latest channel in the feature
      return;
    }
    this.getHistory(this.channelInfoID);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(`changes: ${JSON.stringify(changes, null, 2)}`);

    for (let propName in changes) {
      if (propName === 'channelInfoID') {
        let changedProp = changes[propName];
        this.getHistory(changedProp.currentValue);
      }
    }
  }

  private getHistory(ciid: string): void {
    this.conversationService
      .getHistory(ciid)
      .subscribe(conversations => (this.currentChannelConv = conversations));
  }

  sendConversation(message: any) {
    if (this.saying === '') {
      return;
    }

    let channelInfoID = this.channelInfoID;
    this.conversationService.sendConversation({
      ciid: channelInfoID,
      uid: 'Jessica',
      convType: 'text',
      conversation: message,
      datetime: Date.now()
    });

    this.getHistory(this.channelInfoID);
    this.saying = '';
  }
}
