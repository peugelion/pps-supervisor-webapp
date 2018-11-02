import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {
  @Input('route') route;

  constructor() { }

  ngOnInit() {
  }

}
