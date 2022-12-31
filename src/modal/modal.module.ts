import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHostDirective } from './directive/modal-host.directive';
import { ModalComponent } from './component/modal/modal.component';
import { ModalService } from './service/modal.service';

@NgModule({
  declarations: [ModalHostDirective, ModalComponent],
  imports: [CommonModule],
  exports: [],
  providers: [ModalService],
})
export class ModalModule {}
