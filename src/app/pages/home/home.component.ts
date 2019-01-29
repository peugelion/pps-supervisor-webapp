import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '@pepsi-app/providers/state.service';
import { AppPagesService } from '@pepsi-app/providers/app-pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isSupervizor = false;

  constructor(
    private stateService: StateService,
    public router: Router,
    public _appPagesService: AppPagesService
  ) {
    this.isSupervizor = stateService.getSupervizor();
    if (!this.isSupervizor) {
      router.navigate(['login']);
    }
  }

}
