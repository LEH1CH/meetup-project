import { ComponentFactoryResolver, ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MeetupEditComponent } from './meetup-edit/meetup-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private containerRef!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  showModal(containerRef: ViewContainerRef): void {
    this.containerRef = containerRef;
    this.showModalSubject.next(true);
  }

  hideModal(): void {
    this.showModalSubject.next(false);
    this.containerRef.clear();
  }

  onModalStateChange(): Observable<boolean> {
    return this.showModalSubject.asObservable();
  }

  open(component: any, containerRef: ViewContainerRef): any {
    const componentFactory = this.resolver.resolveComponentFactory(component);
    this.showModal(containerRef);
    
    const componentRef = containerRef.createComponent(componentFactory);
    return componentRef.instance;
  }
}
