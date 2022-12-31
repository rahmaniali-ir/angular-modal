import { ApplicationRef, ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../component/modal/modal.component';

export type ModalRefType = ComponentRef<ModalComponent>;

export type ModalOptions = {
  persistent?: boolean;
  input?: { [key in string]: any };
  customClass?: string;
};

export class ModalRef<T = any> {
  private component: any;
  private modalRef: ModalRefType;
  private appRef: ApplicationRef;
  public result: Subject<T | null> = new Subject<T | null>();
  private _options: ModalOptions = {};

  constructor(
    appRef: ApplicationRef,
    modalRef: ModalRefType,
    component: any,
    options: ModalOptions = {}
  ) {
    this.appRef = appRef;
    this.modalRef = modalRef;
    this.component = component;
    this._options = options;
  }

  public get instance() {
    return this.modalRef.instance;
  }

  public get options() {
    return this._options;
  }

  private destroy() {
    this.result.complete();

    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
  }

  public close(data: T | null = null) {
    this.result.next(data);
    this.destroy();
  }

  public dismiss(data: T | null = null) {
    this.result.error(data);
    this.destroy();
  }

  public setContentRef() {}
}
