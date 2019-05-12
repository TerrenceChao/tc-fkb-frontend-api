import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ConversationService } from './conversation.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private list: Array<any> = [];
  private mapping: Map<string, any> = new Map();
  private webSocketService: WebSocketService;

  constructor(private conversationService: ConversationService) {}

  /**
   * @param {WebSocketService} webSocketService
   * @memberof ChannelService
   */
  setWebSocket(webSocketService: WebSocketService): void {
    this.webSocketService = webSocketService;
  }

  /**
   * @param {string} chid
   * @returns {*:{chid, ciid, name, creator, invitees, members, latestSpoke, lastGlimpse}}
   * @memberof ChannelService
   */
  showOne(chid: string): any {
    return this.mapping.has(chid) ? this.mapping.get(chid) : {};
  }

  /**
   * @returns {Array<any>} channelList
   * @memberof ChannelService
   */
  showList(): Array<any> {
    // let list = [];
    // for (let [chid, channel] of this.mapping) {
    //   list.push(channel);
    // }

    return this.list;
  }

  /**
   * @param {string} uid
   * @param {string} chanLimit
   * @param {string} chanSkip
   * @memberof ChannelService
   */
  getList(uid: string, chanLimit: string, chanSkip: string): void {
    this.webSocketService.getChannelList({
      uid,
      chanLimit,
      chanSkip
    });
  }

  /**
   * each item in channelList includes:
   * {chid, ciid, name, creator, invitees, members, latestSpoke, lastGlimpse}
   * @param {Array<any>} channelList
   * @memberof ChannelService
   */
  subscribeList(channelList: Array<any>): void {
    // don't push duplicated channelInfo
    channelList.forEach(channel => {
      this.appendChannel(channel);
    });
  }

  /**
   * @param {string} channelName
   * @param {string} uid
   * @memberof ChannelService
   */
  create(channelName: string, uid: string): void {
    this.webSocketService.createChannel({
      uid,
      channelName
    });
  }

  /**
   * @param {*:{chid, ciid, name, creator, invitees, members, latestSpoke, lastGlimpse}} channelInfo
   * @memberof ChannelService
   */
  subscribeCreated(channelInfo: any): void {
    this.appendChannel(channelInfo);
  }

  /**
   * @param {string} uid
   * @param {string} nickname
   * @param {string} chid
   * @memberof ChannelService
   */
  join(uid: string, nickname: string, chid: string): void {
    this.webSocketService.joinChannel({
      uid,
      nickname,
      chid
    });
  }

  /**
   * @param {*:{chid, ciid, name, creator, invitees, members, latestSpoke, lastGlimpse}} channelInfo
   * @memberof ChannelService
   */
  subscribeJoined(channelInfo: any): void {
    this.appendChannel(channelInfo);
  }

  /**
   * @param {string} uid
   * @param {string} nickname
   * @param {string} chid
   * @memberof ChannelService
   */
  leave(uid: string, nickname: string, chid: string): void {
    this.webSocketService.leaveChannel({
      uid,
      nickname,
      chid
    });
  }

  /**
   * @param {*:{chid}} resPacket
   * @memberof ChannelService
   */
  subscribeLeft(resPacket: any): void {
    this.removeChannel(resPacket.chid);
  }

  /**
   * @private
   * @param {*:{chid, ciid, name, creator, invitees, members, latestSpoke, lastGlimpse}} channel
   * @memberof ChannelService
   */
  private appendChannel(channel: any): void {
    if ( ! this.mapping.has(channel.chid)) {
      this.mapping.set(channel.chid, channel);
      this.list.push(channel);
    }
  }

  /**
   * @private
   * @param {string} chid
   * @memberof ChannelService
   */
  private removeChannel(chid: string): void {
    const NOT_FOUND = -1;
    const INDEX = this.list.map(channel => channel.chid).indexOf(chid);
    if (INDEX !== NOT_FOUND) {
      this.list.splice(INDEX, 1);
    }

    this.mapping.delete(chid);
  }
}
