import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from './channels.component';

@NgModule({
  declarations: [ChannelsComponent],
  imports: [CommonModule],
  exports: [ChannelsComponent]
})
export class ChannelsModule { }
