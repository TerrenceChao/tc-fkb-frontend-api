import { Url } from 'url';

export class User {
  constructor(uid: string, nickname: string) {
    this.uid = uid;
    this.nickname = nickname;
  }

  uid: string;
  nickname: string;
  firstName: string;
  lastName: string;
  shot: Url;
}
