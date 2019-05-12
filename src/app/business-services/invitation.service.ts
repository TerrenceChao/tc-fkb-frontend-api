import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { EVENTS } from '../app-settings/conversation/events';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private webSocketService: WebSocketService;
  constructor() {}

  setWebSocket(webSocketService: WebSocketService): InvitationService {
    this.webSocketService = webSocketService;
    return this;
  }

  getChannelInvitationList(reqPacket: any): any {
    this.webSocketService.getChannelInvitationList(reqPacket);
  }

  subscribeInvitationList(resPacket: any): any {
    // 1) assign resPacket into local data structure
    // 2) return resPacket
    console.log(JSON.stringify(resPacket, null, 2));
    return resPacket;
  }
}
