export class Channel {
  chid: string;
  ciid: string;
  name: string;
  creator: string;
  invitees: Array<string>;
  members: Array<string>;
  latestSpoke: Date;
  lastGlimpse: Date;
}
