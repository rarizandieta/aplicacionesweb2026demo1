import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() username: string = '';

  @Output() logoutEvent = new EventEmitter<void>();

  onLogout(): void {
    this.logoutEvent.emit();
  }
}
