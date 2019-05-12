import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import * as _ from 'lodash';

import { InvitationService } from './invitation.service';
import { ChannelService } from './channel.service';
import { ConversationService } from './conversation.service';
import { CONFIG } from '../app-settings/conversation/config';
import { EVENTS } from '../app-settings/conversation/events';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;
  constructor(
    private invitationService: InvitationService,
    private channelService: ChannelService,
    private conversationService: ConversationService
  ) {
    this.invitationService.setWebSocket(this);
    this.channelService.setWebSocket(this);
    this.conversationService.setWebSocket(this);
  }

  initSocket(): WebSocketService {
    this.socket = socketIo(CONFIG.DOMAIN);
    return this;
  }

  subscribeEvents(): WebSocketService {
    this
      .subscribePersonalInfo()
      .subscribeExceptionAlert()
      // common used for both friend/channel invitaiton
      .subscribeInvitationInRealtime()
      // common used for both friend/channel invitaiton
      .subscribeInvitationList()
      .subscribeChannelCreated()
      .subscribeChannelRemoved()
      .subscribeChannelJoined()
      .subscribeChannelLeft()
      .subscribeChannelList()
      .subscribeConversationInRealtime()
      .subscribeConversationList();
    return this;
  }

  // REQUEST
  login(): WebSocketService {
    // use sessionId & msgToken to check if a user is authenticated.
    this.socket.emit(EVENTS.REQUEST.LOGIN, {
      msgToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnR1c2VyYWdlbnQiOiJNb3ppbGxhLzUuMCAoWDExOyBMaW51eCB4ODZfNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83My4wLjM2ODMuNzUgU2FmYXJpLzUzNy4zNiIsInVpZCI6IjM0NWIxYzRjLTEyOGMtNDI4Ni04NDMxLTc4ZDE2ZDI4NWYzOCIsImlhdCI6MTU1NzU4MzU4NywiZXhwIjoxNTU3NjY5OTg3fQ.MEZytOwjalp2_zj3TtdDaad2pPzq0q-7i_8WSk7m8WE',



      sessionId: 'session id',
      uid: '345b1c4c-128c-4286-8431-78d16d285f38',
      nickname: 'Alice',
      clientuseragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',

      inviLimit: 10,
      inviSkip: 0,
      chanLimit: 10,
      chanSkip: 0,
      convLimit: 10,
      convSkip: 0
    });
    return this;
  }

  /**
   * checkout: any, ObjectConstructor (lib.es5.d.ts)
   */
  logout(packet: any): WebSocketService {
    // logout => leave channel & user(uid)
    this.socket.emit(EVENTS.REQUEST.LOGOUT, packet);
    return this;
  }

  extendValidity(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.EXTEND_VALIDITY, packet);
    return this;
  }

  getChannelList(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.GET_CHANNEL_LIST, packet);
    return this;
  }

  createChannel(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.CREATE_CHANNEL, packet);
    return this;
  }

  joinChannel(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.JOIN_CHANNEL, packet);
    return this;
  }

  leaveChannel(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.LEAVE_CHANNEL, packet);
    return this;
  }

  competeLock(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.COMPETE_LOCK, packet);
    return this;
  }

  releaseLock(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.RELEASE_LOCK, packet);
    return this;
  }

  sendConversation(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.SEND_CONVERSATION, packet);
    return this;
  }

  getConversationList(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.GET_CONVERSATION, packet);
    return this;
  }

  getChannelInvitationList(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.GET_INVITATION_LIST, packet);
    return this;
  }

  sendChannelInvitation(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.SEND_INVITATION, packet);
    return this;
  }

  dealWithChannelInvitation(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.DEAL_WITH_INVITATION);
    return this;
  }

  confirmChannelInvitation(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.CONFIRM_INVITATION);
    return this;
  }

  // used in friend invitation for temporary. (because you don't have notification service)
  sendMessage(packet: any): WebSocketService {
    this.socket.emit(EVENTS.REQUEST.SEND_MESSAGE);
    return this;
  }

  // RESPONSE
  subscribePersonalInfo(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.PERSONAL_INFO,
      packet => console.log(JSON.stringify(packet, null, 2))
    );
    return this;
  }

  subscribeExceptionAlert(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.EXCEPTION_ALERT,
      packet => console.log(JSON.stringify(packet, null, 2))
    );
    return this;
  }

  // common used for both friend/channel invitaiton
  subscribeInvitationInRealtime(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.INVITATION_TO_ME,
      packet => console.log(JSON.stringify(packet, null, 2))
    );
    return this;
  }

  // common used for both friend/channel invitaiton
  subscribeInvitationList(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.INVITATION_LIST,
      packet => this.invitationService.subscribeInvitationList(packet)
    );
    return this;
  }

  subscribeChannelCreated(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.CHANNEL_CREATED,
      packet => this.channelService.subscribeCreated(packet)
    );
    return this;
  }

  subscribeChannelRemoved(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.CHANNEL_REMOVED,
      // needn't call channelService
      packet => console.log(JSON.stringify(packet, null ,2))
    );
    return this;
  }

  subscribeChannelJoined(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.CHANNEL_JOINED,
      packet => this.channelService.subscribeJoined(packet)
    );
    return this;
  }

  subscribeChannelLeft(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.CHANNEL_LEFT,
      packet => this.channelService.subscribeLeft(packet)
    );
    return this;
  }

  subscribeChannelList(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.CHANNEL_LIST,
      channelList => {
        channelList.forEach(channel => {
          if (channel.conversations != null) {
            this.conversationService.subscribeList({
              ciid: channel.ciid,
              list: channel.conversations
            });

            channel.conversations = null;
            delete channel.conversations;
          }
        });

        this.channelService.subscribeList(channelList);
    });
    return this;
  }

  subscribeConversationInRealtime(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.CONVERSATION_FROM_CHANNEL,
      packet => this.conversationService.receive(packet)
    );
    return this;
  }

  subscribeConversationList(): WebSocketService {
    this.socket.on(
      EVENTS.RESPONSE.CONVERSATION_LIST,
      packet => this.conversationService.subscribeList(packet)
    );
    return this;
  }
}
