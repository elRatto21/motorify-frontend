import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrl: './shortcut.component.scss',
})
export class ShortcutComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() icon: string = 'link';

  constructor(private router: Router) {};

  navigate() {
    this.router.navigate([this.link]);
  }
}
