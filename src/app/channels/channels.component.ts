import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { ChannelService } from '../business/channel/channel.service';
import { Channel } from '../business/channel/channel';
import { Conversation } from '../business/channel/conversation/conversation';
import { User } from '../business/user/user';
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

  currentConversationList: Array<Conversation> = [];
  scrip = '';
  convType = 'text';

  user: User = new User(
    localStorage.getItem('uid'),
    'Alice'
  );

  constructor(
    private channelService: ChannelService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.chList = this.channelService.showList();
    this.currentChannel = this.chList[0];
    console.log(`this.currentChannel: ${JSON.stringify(this.currentChannel), null, 2}`);

    this.currentConversationList = this.conversationService.showList(this.currentChannel.ciid);
    console.log(`this.currentConversationList: ${JSON.stringify(this.currentConversationList), null, 2}`);
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
      // .subscribe(conversations => (this.currentConversationList = conversations));
  }

  sendConversation(content: any) {
    if (!this.scrip.trim()) {
      return;
    }

    this.conversationService.send(new Conversation(
      this.currentChannel.ciid,
      this.user.uid,
      content,
      this.convType
    ));

    this.scrip = '';
  }
}
