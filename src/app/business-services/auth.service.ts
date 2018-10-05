import { Injectable } from "@angular/core";
import { WebSocketService } from "./web-socket.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private webSocketService: WebSocketService) {}

  signup() {
    // submit registrated data
  }

  login() {}

  isLoggedIn() {
    this.webSocketService
      .initSocket()
      .subscribeEvents()
      .login();
  }

  forgotPassword() {
    // submit email and send token to email
  }

  resetPassword() {
    // submit updated password
  }

  logout() {
    // clear cookie & local storage

    // emit logout to webSocketService
    this.webSocketService.logout({});
  }
}
