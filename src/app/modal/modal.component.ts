import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {
  showModal = false;
  private modalSubscription: Subscription;

  constructor(private modalService: ModalService) {
    this.modalSubscription = this.modalService.onModalStateChange().subscribe(show => {
      this.showModal = show;
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  hideModal(): void {
    this.modalService.hideModal();
  }
}
