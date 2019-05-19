import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelsComponent } from './channels.component';

@NgModule({
  declarations: [ChannelsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChannelsComponent]
})
export class ChannelsModule { }
