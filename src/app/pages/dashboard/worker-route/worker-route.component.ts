import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-worker-route',
  templateUrl: './worker-route.component.html',
  styleUrls: ['./worker-route.component.scss']
})
export class WorkerRouteComponent {
  isTableLayoutActive = this.getTableLayoutActive();
  filterStr = '';

  @Input('route') route;
  // @Input('workerRoutes') workerRoutes;
  workerRoutes: Array<any> = null;
  // workerRoutesParsed: Array<any> = null;
  @Input() set workerRoutesInput(val: any) {
    this.workerRoutes = val;
    if (this.isTableLayoutActive) {
      // console.log('isTableLayoutActive -> parseWorkerRoutes', val.length);
      // this.workerRoutesParsed = this.parseWorkerRoutes(val);
    }
  }

  constructor() { }

  applyFilter(filterValue: string) {
    this.filterStr = filterValue;
  }

  getTableLayoutActive() {
    const isTableLayoutActive = localStorage.getItem('tableLayoutActive');
    return JSON.parse(isTableLayoutActive);
  }

  setTableLayoutActive(isTableLayoutActive) {
    localStorage.setItem('tableLayoutActive', isTableLayoutActive); // true or false
    localStorage.setItem('isTableLayoutActive', isTableLayoutActive); // true or false
    this.isTableLayoutActive = isTableLayoutActive;
    // if (isTableLayoutActive && !this.workerRoutesParsed) {
    //   this.workerRoutesParsed = this.parseWorkerRoutes(this.workerRoutes);
    // }
  }

  //

  /* skracujem datume i stringove za table layout */
  // parseWorkerRoutes(workerRoutes: Array<any>) {
  //   // console.log('parse WR uso');
  //   workerRoutes.map(route => route.PauzaMinuta = route.PauzaMinuta.replace(0, '').replace('0:00', ''));
  //   return workerRoutes;
  // }
}
