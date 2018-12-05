import { Component } from '@angular/core';
import { SharedService } from '@pepsi-app/providers/shared.service';

@Component({
  selector: 'app-toggle-menu-btn',
  templateUrl: './toggle-menu-btn.component.html',
  styleUrls: ['./toggle-menu-btn.component.scss']
})
export class ToggleMenuBtnComponent {

  constructor(private _sharedService: SharedService) { }

  sidebarToggleEvent() {
    this._sharedService.emitMenuToggle(true);
  }
}
