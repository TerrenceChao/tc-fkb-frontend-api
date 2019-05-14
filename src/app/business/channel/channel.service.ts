import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ConversationService } from './conversation/conversation.service';
import { WebSocketService } from '../socket/web-socket.service';
import { Channel } from './channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private list: Array<Channel> = [];
  private mapping: Map<string, Channel> = new Map();
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
   * @returns {Channel}
   * @memberof ChannelService
   */
  showOne(chid: string): any {
    return this.mapping.has(chid) ? this.mapping.get(chid) : {};
  }

  /**
   * @returns {Map<string, Channel>}
   * @memberof ChannelService
   */
  showMapping(): Map<string, Channel> {
    return this.mapping;
  }

  /**
   * @returns {Array<Channel>} channelList
   * @memberof ChannelService
   */
  showList(): Array<Channel> {
    // let list = [];
    // for (let [chid, channel] of this.mapping) {
    //   list.push(channel);
    // }

    return this.list;
  }

  /**
   * @param {string} uid
   * @param {number} chanLimit
   * @param {number} chanSkip
   * @memberof ChannelService
   */
  getList(uid: string, chanLimit: number = 10, chanSkip: number = 0): void {
    this.webSocketService.getChannelList({
      uid,
      chanLimit,
      chanSkip
    });
  }

  /**
   * @param {Array<Channel>} channelList
   * @memberof ChannelService
   */
  subscribeList(channelList: Array<Channel>): void {
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
   * @param {Channel} channelInfo
   * @memberof ChannelService
   */
  subscribeCreated(channelInfo: Channel): void {
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
   * @param {Channel} channelInfo
   * @memberof ChannelService
   */
  subscribeJoined(channelInfo: Channel): void {
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
   * PS. don't push duplicated channelInfo
   * @private
   * @param {Channel} channel
   * @memberof ChannelService
   */
  private appendChannel(channel: Channel): void {
    if ( ! this.mapping.has(channel.chid)) {
      this.mapping.set(channel.chid, channel);
      this.list.push(channel);
    }
    console.log(`channel list updated: ${JSON.stringify(this.list, null, 2)}`)
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
