import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  NgbDropdownModule,
  NgbTooltipModule,
  NgbModalModule
} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgbModalModule.forRoot()
  ],
  exports: [NgbDropdownModule, NgbTooltipModule, NgbModalModule]
})
export class AppBootstrapModule {}
