import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import * as _ from 'lodash';

import { InvitationService } from './invitation.service';
import { ChannelService } from './channel.service';
import { ConversationService } from './conversation.service';
import { MessageAppSettings } from '../app-settings/MessageAppSettings';

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

    this.conversationService.setWebSocket(this);
  }

  initSocket(): WebSocketService {
    this.socket = socketIo(MessageAppSettings.DOMAIN);
    return this;
  }

  subscribeEvents(): WebSocketService {
    this.subscribeChannelList()
      .subscribeChannelCreated()
      .subscribeChannelRemoved()
      .subscribeChannelInvitationHistory()
      .subscribeComingChannelInvitation()
      .subscribeConversationHistory()
      .subscribeComingConversation();
    return this;
  }

  // REQUEST_EVENTS
  login(): WebSocketService {
    // use sessionId & msgToken to check if a user is authenticated.
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.LOGIN, {
      msgToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnR1c2VyYWdlbnQiOiJNb3ppbGxhLzUuMCAoWDExOyBMaW51eCB4ODZfNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83My4wLjM2ODMuNzUgU2FmYXJpLzUzNy4zNiIsInVpZCI6IjM0NWIxYzRjLTEyOGMtNDI4Ni04NDMxLTc4ZDE2ZDI4NWYzOCIsImlhdCI6MTU1NzU4MzU4NywiZXhwIjoxNTU3NjY5OTg3fQ.MEZytOwjalp2_zj3TtdDaad2pPzq0q-7i_8WSk7m8WE',



      sessionId: 'session id',
      uid: '345b1c4c-128c-4286-8431-78d16d285f38',
      nickname: 'Alice',
      clientuseragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',

      inviLimit: 10,
      inviSkip: 10,
      chanLimit: 10,
      chanSkip: 10,
      convLimit: 10,
      convSkip: 10
    });
    return this;
  }

  /**
   * checkout: any, ObjectConstructor (lib.es5.d.ts)
   */
  logout(packet: any): WebSocketService {
    // logout => leave channel & user(uid)
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.LOGOUT, packet);
    return this;
  }

  getChannelList(packet: any): WebSocketService {
    this.socket.emit(
      MessageAppSettings.REQUEST_EVENTS.GET_CHANNEL_LIST,
      packet
    );
    return this;
  }

  createChannel(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.CREATE_CHANNEL, packet);
    return this;
  }

  leaveChannel(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.LEAVE_CHANNEL, packet);
    return this;
  }

  sendConversation(packet: any): WebSocketService {
    this.socket.emit(
      MessageAppSettings.REQUEST_EVENTS.SEND_CONVERSATION,
      packet
    );
    return this;
  }

  getConversationHistory(packet: any): WebSocketService {
    this.socket.emit(
      MessageAppSettings.REQUEST_EVENTS.GET_CONVERSATION,
      packet
    );
    return this;
  }

  getChannelInvitationHistory(packet: any): void {
    this.socket.emit(
      MessageAppSettings.REQUEST_EVENTS.GET_INVITATION_LIST,
      packet
    );
  }

  sendInvitation(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.SEND_INVITATION, packet);
    return this;
  }

  dealWithInvitation(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.DEAL_WITH_INVITATION);
    return this;
  }

  // RESPONSE_EVENTS
  subscribeChannelList(): WebSocketService {
    // get ch list while user logging
    let channelService = this.channelService;
    // let conversationService = this.conversationService;
    this.socket.on(MessageAppSettings.RESPONSE_EVENTS.CHANNEL_LIST, function(
      packet
    ) {
      console.log(JSON.stringify(packet, null, 2));
      channelService.subscribeList(
        packet.data.map(channel => {
          channel.conversations = null;
          delete channel.conversations;
          return channel;
        })
      );

      // conversationService.subscribeHistory(
      //   packet.data.map(channel => {
      //     return {
      //       ciid: channel.ciid,
      //       conversations: channel.conversations
      //     };
      //   })
      // );
    });
    return this;
  }

  subscribeChannelCreated(): WebSocketService {
    let channelService = this.channelService;
    this.socket.on(MessageAppSettings.RESPONSE_EVENTS.CHANNEL_CREATED, function(
      packet
    ) {
      console.log(JSON.stringify(packet, null, 2));
      // channelService.subscribeNewCreated(packet);
    });
    return this;
  }

  subscribeChannelRemoved(): WebSocketService {
    let channelService = this.channelService;
    this.socket.on(MessageAppSettings.RESPONSE_EVENTS.CHANNEL_REMOVED, function(
      packet
    ) {
      console.log(JSON.stringify(packet, null, 2));
      // channelService.subscribeRemoved(packet);
    });
    return this;
  }

  subscribeChannelJoined(): WebSocketService {
    this.socket.on(MessageAppSettings.RESPONSE_EVENTS.CHANNEL_JOINED, (packet) => {
      console.log(JSON.stringify(packet, null, 2))
      // this.channelService.subscribeJoined(packet)
    })
    return this;
  }

  WebSocketServiceLeft(): WebSocketService {
    this.socket.on(MessageAppSettings.RESPONSE_EVENTS.CHANNEL_LEFT, (packet) => {
      console.log(JSON.stringify(packet, null, 2))
      // this.channelService.subscribeLeft(packet)
    })
    return this;
  }

  subscribeChannelInvitationHistory(): WebSocketService {
    // 1) get invitation list while user logging
    // 2) make a request
    let invitationService = this.invitationService;
    this.socket.on(
      MessageAppSettings.RESPONSE_EVENTS.INVITATION_LIST,
      function(packet) {
        invitationService.subscribeChannelHistory(packet);
      }
    );
    return this;
  }

  subscribeComingChannelInvitation(): WebSocketService {
    let invitationService = this.invitationService;
    this.socket.on(
      MessageAppSettings.RESPONSE_EVENTS.INVITATION_TO_ME,
      function(packet) {
        console.log(JSON.stringify(packet, null, 2));
        // invitationService.subscribeComingFromChannel(packet);
      }
    );
    return this;
  }

  subscribeConversationHistory(): WebSocketService {
    let conversationService = this.conversationService;
    this.socket.on(
      MessageAppSettings.RESPONSE_EVENTS.CONVERSATION_LIST,
      function(packet) {
        // console.log(JSON.stringify(packet, null, 2));
        conversationService.subscribeHistory(packet);
      }
    );
    return this;
  }

  subscribeComingConversation(): WebSocketService {
    let conversationService = this.conversationService;
    this.socket.on(
      MessageAppSettings.RESPONSE_EVENTS.CONVERSATION_FROM_CHANNEL,
      function(packet) {
        console.log(JSON.stringify(packet, null, 2));
        conversationService.subscribeComing(packet);
      }
    );
    return this;
  }

  subscribeMessageAppAlert(): WebSocketService {
    this.socket.on(MessageAppSettings.RESPONSE_EVENTS.EXCEPTION_ALERT, function(
      packet
    ) {
      console.log(JSON.stringify(packet, null, 2));
    });
    return this;
  }
}
