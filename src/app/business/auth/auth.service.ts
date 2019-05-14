import { Injectable } from '@angular/core';
import { WebSocketService } from '../socket/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private webSocketService: WebSocketService) {}

  signup() {
    // submit registrated data
  }

  login() {}

  isLoggedIn() {
    localStorage.setItem('msgToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnR1c2VyYWdlbnQiOiJNb3ppbGxhLzUuMCAoWDExOyBMaW51eCB4ODZfNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83My4wLjM2ODMuNzUgU2FmYXJpLzUzNy4zNiIsInVpZCI6IjM0NWIxYzRjLTEyOGMtNDI4Ni04NDMxLTc4ZDE2ZDI4NWYzOCIsImlhdCI6MTU1Nzg0MDU1NCwiZXhwIjoxNTU3OTI2OTU0fQ.Na4DSIoPPoxBrgeTqPzm7a4-KcXy-4FSewRN1T7A91Y');
    localStorage.setItem('sessionId', 'session id');
    localStorage.setItem('uid', '345b1c4c-128c-4286-8431-78d16d285f38');
    localStorage.setItem('nickname', 'Alice');
    localStorage.setItem('clientuseragent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36');
    localStorage.setItem('inviLimit', '10');
    localStorage.setItem('inviSkip', '0');
    localStorage.setItem('chanLimit', '10');
    localStorage.setItem('chanSkip', '0');
    localStorage.setItem('convLimit', '10');
    localStorage.setItem('convSkip', '0');

    console.log(JSON.stringify({
        msgToken: localStorage.getItem('msgToken'),
        clientuseragent: localStorage.getItem('clientuseragent'),
        uid: localStorage.getItem('uid'),
        nickname: localStorage.getItem('nickname'),
      },
      null,
      2)
    );

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
