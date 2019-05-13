import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private webSocketService: WebSocketService;
  private recordMap: Map<string, any> = new Map();
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
   * @returns {Array<any>}
   * @memberof ConversationService
   */
  showList(ciid: string): Array<any> {
    return this.recordMap.has(ciid) ?
      this.recordMap.get(ciid).sort(this.sortByDatetime) : [];
  }

  /**
   * @private
   * @param {*} a
   * @param {*} b
   * @returns {Number}
   * @memberof ConversationService
   */
  private sortByDatetime(a: any, b: any): Number {
    return a.datetime < b.datetime ? 1 : -1;
  }

  /**
   * @param {*:{chid, ciid, sender, content, type, datetime}} reqPacket
   * @memberof ConversationService
   */
  send(reqPacket: any): void {
    this.webSocketService.sendConversation(reqPacket);
  }

  /**
   * @param {*:{chid, ciid, sender, content, type, datetime}} resPacket
   * @memberof ConversationService
   */
  receive(resPacket: any): void {
    this.appendOneRecord(resPacket.ciid, resPacket);
  }

  /**
   * @private
   * @param {string} ciid
   * @param {*:{chid, ciid, sender, content, type, datetime}} record
   * @memberof ConversationService
   */
  private appendOneRecord(ciid: string, record: any): void {
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
   * @param {Array<any>} records
   * @memberof ConversationService
   */
  private appendRecords(ciid: string, records: Array<any>): void {
    if ( ! this.recordMap.has(ciid)) {
      this.recordMap.set(ciid, []);
    }

    this.recordMap.get(ciid).concat(records);
  }
}
