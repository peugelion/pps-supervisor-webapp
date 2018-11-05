import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-worker-route',
  templateUrl: './worker-route.component.html',
  styleUrls: ['./worker-route.component.css']
})
export class WorkerRouteComponent implements OnInit {
  @Input('route') route;

  constructor() { }

  ngOnInit() {
  }

}
