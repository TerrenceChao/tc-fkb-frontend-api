import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { ChannelService } from '../business/channel/channel.service';
import { Channel } from '../business/channel/channel';
import { ConversationService } from '../business/channel/conversation/conversation.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit, OnChanges {
  @Input()
  currentChannel: Channel = {
    chid: '',
    ciid: '',
    name: '',
    creator: '',
    invitees: [],
    members: [],
    latestSpoke: new Date(),
    lastGlimpse: new Date()
  };

  chList: Array<Channel> = [];
  currentChannelConv: Array<any> = [];
  saying: string = '';
  constructor(
    private channelService: ChannelService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.chList = this.channelService.showList();
    // this.currentChannel = this.chList.indexOf(0);
    console.log(`this.currentChannel: ${JSON.stringify(this.currentChannel), null, 2}`);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(`changes: ${JSON.stringify(changes, null, 2)}`);

    for (let propName in changes) {
      if (propName === 'currentChannel') {
        let changedProp = changes[propName];
        this.getHistory(changedProp.currentValue);
      }
    }
  }

  private getHistory(ciid: string): void {
    this.conversationService
      // .getHistory(ciid)
      // .subscribe(conversations => (this.currentChannelConv = conversations));
  }

  sendConversation(content: any) {
    if (this.saying === '') {
      return;
    }

    this.conversationService.send({
      // chid: this.currentChannel.chid,
      // ciid: this.currentChannel.ciid,
      sender: localStorage.getItem('uid'),
      content: content,
      type: 'text',
      datetime: Date.now()
    });

    this.saying = '';
    // this.getHistory(this.currentChannel);
  }
}
