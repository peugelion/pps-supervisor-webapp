import { Component, OnInit } from '@angular/core';
import { StateService } from '@pepsi-app/providers/state.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.scss']
})
export class KorisnikComponent implements OnInit {
  supervisor: any;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.supervisor = this.stateService.getSupervisor();
  }

}
