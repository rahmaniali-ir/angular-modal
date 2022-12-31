import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalHostDirective } from '../../directive/modal-host.directive';
import { ActiveModal } from '../../service/active-modal.service';
import { ModalRef } from '../../model/modalRef';

@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() content!: any;
  @Input() modalRef!: ModalRef;

  @HostBinding('attr.persistent')
  @Input()
  persistent: boolean = false;

  @Input()
  @HostBinding('attr.class')
  windowClass: string | null = null;

  @ViewChild(ModalHostDirective, { static: true })
  ModalHost!: ModalHostDirective;

  constructor(private injector: Injector) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadComponent();
    }, 0);
  }

  @HostListener('click', ['$event'])
  public onClickOutside(e: MouseEvent) {
    if (!this.modalRef.options.persistent) this.dismiss();
  }

  public preventDefault(e: MouseEvent) {
    e.stopPropagation();
  }

  public close() {
    this.modalRef.close();
  }

  public dismiss() {
    this.modalRef.dismiss();
  }

  private loadComponent() {
    const viewContainerRef = this.ModalHost.viewContainerRef;
    viewContainerRef.clear();

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: ActiveModal,
          useValue: {
            modalRef: this.modalRef,
            close: this.modalRef.close.bind(this.modalRef),
            dismiss: this.modalRef.dismiss.bind(this.modalRef),
          },
        },
      ],
    });

    const componentRef = viewContainerRef.createComponent<any>(this.content, {
      injector: injector,
    });

    if (this.modalRef.options.input) {
      for (let key in this.modalRef.options.input) {
        componentRef.instance[key] = this.modalRef.options.input[key];
      }
    }
  }
}
