import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gate",
  templateUrl: "./gate.component.html",
  styleUrls: ["./gate.component.css"]
})
export class GateComponent implements OnInit {
  featureSelecter: string = "user";
  constructor() {}

  ngOnInit() {}

  selectFeature(feature: string): void {
    this.featureSelecter = feature;
  }
}
