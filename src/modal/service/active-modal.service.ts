import { Injectable } from '@angular/core';
import { ModalRef } from '../model/modalRef';

@Injectable({
  providedIn: 'root',
})
export class ActiveModal {
  public modalRef: ModalRef | null = null;

  constructor() {}

  public close(data: any = null) {
    this.modalRef?.close(data);
  }

  public dismiss(data: any = null) {
    this.modalRef?.dismiss(data);
  }
}
