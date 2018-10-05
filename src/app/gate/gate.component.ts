import { Component, OnInit } from "@angular/core";
import { AuthService } from "../business-services/auth.service";

@Component({
  selector: "app-gate",
  templateUrl: "./gate.component.html",
  styleUrls: ["./gate.component.css"]
})
export class GateComponent implements OnInit {
  featureSelecter: string = "user";
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn();
  }

  selectFeature(feature: string): void {
    this.featureSelecter = feature;
  }
}
