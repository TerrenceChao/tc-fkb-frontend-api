import { Injectable } from "@angular/core";
import { socket } from "socket.io-client";

const socketDomain = "http://localhost:3003";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  constructor() {}
}
