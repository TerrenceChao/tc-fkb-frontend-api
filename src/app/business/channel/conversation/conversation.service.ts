import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WebSocketService } from '../../socket/web-socket.service';
import { Conversation } from './Conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private webSocketService: WebSocketService;
  private recordMap: Map<string, Array<Conversation>> = new Map();
  constructor() {}

  /**
   * @param {WebSocketService} webSocketService
   * @memberof ConversationService
   */
  setWebSocket(webSocketService: WebSocketService): void {
    this.webSocketService = webSocketService;
  }

  /**
   * @param {string} ciid
   * @returns {Array<Conversation>}
   * @memberof ConversationService
   */
  showList(ciid: string): Array<Conversation> {
    return this.recordMap.has(ciid) ?
      this.recordMap.get(ciid).sort(this.sortByDatetime) : [];
  }

  /**
   * @private
   * @param {*} a
   * @param {*} b
   * @returns {number}
   * @memberof ConversationService
   */
  private sortByDatetime(a: Conversation, b: Conversation): number {
    return a.datetime < b.datetime ? 1 : -1;
  }

  /**
   * @param {any} reqPacket
   * @memberof ConversationService
   */
  send(reqPacket: any): void {
    this.webSocketService.sendConversation(reqPacket);
  }

  /**
   * @param {Conversation} resPacket
   * @memberof ConversationService
   */
  receive(resPacket: Conversation): void {
    this.appendOneRecord(resPacket.ciid, resPacket);
  }

  /**
   * @param {string} ciid
   * @memberof ConversationService
   */
  remove(ciid: string):void {
    this.recordMap.delete(ciid);
  }

  /**
   * @private
   * @param {string} ciid
   * @param {Conversation} record
   * @memberof ConversationService
   */
  private appendOneRecord(ciid: string, record: Conversation): void {
    if ( ! this.recordMap.has(ciid)) {
      this.recordMap.set(ciid, []);
    }

    this.recordMap.get(ciid).push(record);
  }

  /**
   * @param {*:{uid, ciid, convLimit, convSkip}} reqPacket
   * @memberof ConversationService
   */
  getList(reqPacket: any): void {
    this.webSocketService.getConversationList(reqPacket);
  }

  /**
   * @param {*:{ciid, list}} resPacket
   * @memberof ConversationService
   */
  subscribeList(resPacket: any): void {
    this.appendRecords(resPacket.ciid, resPacket.list);
  }

  /**
   * @private
   * @param {string} ciid
   * @param {Array<Conversation>} records
   * @memberof ConversationService
   */
  private appendRecords(ciid: string, records: Array<any>): void {
    if ( ! this.recordMap.has(ciid)) {
      this.recordMap.set(ciid, []);
    }

    this.recordMap.get(ciid).concat(records);
    console.log(`conversation records updated: ${JSON.stringify(records, null, 2)}`)
  }
}
