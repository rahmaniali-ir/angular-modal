import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { ModalComponent } from '../component/modal/modal.component';
import { ModalRef, ModalOptions } from '../model/modalRef';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ModalRef[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open<T = any>(component: any, options: ModalOptions = {}) {
    const componentRef = this.appendToView(component);
    componentRef.instance.windowClass = options.customClass || '';

    const ref = new ModalRef<T>(this.appRef, componentRef, component, options);
    componentRef.instance.modalRef = ref;
    componentRef.instance.persistent = !!options.persistent;

    this.modals.push(ref);
    return ref;
  }

  private appendToView(component: any) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(ModalComponent)
      .create(this.injector);

    componentRef.instance.content = component;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    return componentRef;
  }
}
