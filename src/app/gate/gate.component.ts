import { Component, OnInit } from '@angular/core';

import { AuthService } from '../business/auth/auth.service';
import { UserService } from '../business/user/user.service';
import { FriendService } from '../business/friend/friend.service';
import { ChannelService } from '../business/channel/channel.service';
import { Channel } from '../business/channel/channel';
import { FEATURES } from './feature';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  featureSelecter: string = FEATURES.USER;
  currentChannel: Channel = {
    chid: '5cd06b8462f49f4bdfc007ca',
    ciid: 'c220ed87-a67d-4d74-8403-3f79b1088bf2',
    name: 'Room 18',
    creator: '345b1c4c-128c-4286-8431-78d16d285f38',
    invitees: [
      '6d23430a-ccef-47b7-b1eb-2cf70e6bd9ca',
      'c32f7185-31aa-40c3-b0a2-d0b68b35c783'
    ],
    members: [
      '345b1c4c-128c-4286-8431-78d16d285f38'
    ],
    latestSpoke: new Date('2019-05-12T10:45:22.234Z'),
    lastGlimpse: new Date('2019-05-06T17:14:44.925Z')
  };
  friendList: Map<string, any> = new Map();
  channelList:  Channel[] = [this.currentChannel];

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
      case FEATURES.USER:
        break;
      case FEATURES.FRIEND:
        break;
      case FEATURES.CHANNEL:
        this.getChannelList();
        break;
      case FEATURES.SETTING:
        break;
    }
  }

  getChannelList(): void {
    let uid = localStorage.getItem('uid');
    this.channelService.getList(uid);
  }
}
