import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() status: boolean = false;
  @Output() buttonClicked = new EventEmitter<void>();

  addToggle() {
    if (window.innerWidth <= 850) {
      this.buttonClicked.emit();
    }
  }
}
