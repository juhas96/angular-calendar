import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayFilterPipe } from './array-filter.pipe';

@NgModule({
  declarations: [ArrayFilterPipe],
  imports: [CommonModule],
  exports: [ArrayFilterPipe],
})
export class PipeModule {}
