import { Component, OnInit } from '@angular/core';

import { AuthService } from '../business/auth/auth.service';
import { UserService } from '../business/user/user.service';
import { FriendService } from '../business/friend/friend.service';
import { ChannelService } from '../business/channel/channel.service';
import { FEATURES } from './feature';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  featureSelecter: string = FEATURES.USER;

  friendList: Map<string, any> = new Map();
  channelList:  Map<string, any> = new Map();
  currentChannel: string = '';

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
    // let uid = localStorage.getItem('uid');
    // this.channelService.getList(uid);
  }
}
