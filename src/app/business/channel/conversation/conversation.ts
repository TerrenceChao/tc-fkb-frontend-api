export class Conversation {
  constructor(ciid: string, sender: string, content: string, type: string) {
    this.ciid = ciid;
    this.sender = sender;
    this.content = content;
    this.type = type;
    this.datetime = new Date();
  }
  ciid: string;
  sender: string;
  content: string;
  type: string;
  datetime: Date;
}
