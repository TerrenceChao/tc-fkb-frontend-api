import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";

import { InvitationService } from "./invitation.service";
import { ChannelService } from "./channel.service";
import { ConversationService } from "./conversation.service";
import { MessageAppSettings } from "../app-settings/MessageAppSettings";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  private socket;
  constructor(
    private invitationService: InvitationService,
    private channelService: ChannelService,
    private conversationService: ConversationService
  ) {
    invitationService.setWebSocket(this);
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
      sessionId: "session id",
      msgToken: "msg token",
      uid: "Alice",
      limit: 5,
      skip: 10
    });
    return this;
  }

  /**
   * checkout: any, ObjectConstructor (lib.es5.d.ts)
   */
  logout(packet: any): WebSocketService {
    // logout => leave channel & user(uid)
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.LOGOUT);
    return this;
  }

  getChannelList(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.GET_CHANNEL_LIST);
    return this;
  }

  createChannel(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.CREATE_CHANNEL);
    return this;
  }

  leaveChannel(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.LEAVE_CHANNEL);
    return this;
  }

  sendConversation(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.SEND_CONVERSATION);
    return this;
  }

  getConversationHistory(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.GET_CONVERSATION);
    return this;
  }

  getChannelInvitationHistory(packet: any): void {
    this.socket.emit(
      MessageAppSettings.REQUEST_EVENTS.GET_INVITATION_LIST,
      packet
    );
  }

  sendInvitation(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.SEND_INVITATION);
    return this;
  }

  dialWithInvitation(packet: any): WebSocketService {
    this.socket.emit(MessageAppSettings.REQUEST_EVENTS.DEAL_WITH_INVITATION);
    return this;
  }

  // RESPONSE_EVENTS
  subscribeChannelList(): WebSocketService {
    // get ch list while user logging
    let channelService = this.channelService;
    this.socket.on(MessageAppSettings.RESPONSE_EVENTS.CHANNEL_LIST, function(
      packet
    ) {
      console.log(JSON.stringify(packet, null, 2));
      // channelService.subscribeList(packet);
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

  subscribeChannelInvitationHistory(): WebSocketService {
    // 1) get invitation list while user logging
    // 2) make a request
    let invitationService = this.invitationService;
    this.socket.on(
      MessageAppSettings.RESPONSE_EVENTS.INVITATION_LIST_FROM_CHANNEL,
      function(packet) {
        invitationService.subscribeChannelHistory(packet);
      }
    );
    return this;
  }

  subscribeComingChannelInvitation(): WebSocketService {
    let invitationService = this.invitationService;
    this.socket.on(
      MessageAppSettings.RESPONSE_EVENTS.INVITATION_FROM_CHANNEL_TO_ME,
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
        console.log(JSON.stringify(packet, null, 2));
        // conversationService.subscribeHistory(packet);
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
        // conversationService.subscribeComing(packet);
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
