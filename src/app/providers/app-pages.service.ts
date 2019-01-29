import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs';
// import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppPagesService {

  pages = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'world',
      // permissions: isSupervisor;
    },
    {
      title: 'Odblokiraj unos porudžbine',
      route: '/odblokiraj-unos-porudzbine',
      icon: 'redo'
    }
  ];

  reportPages = [
    {
      title: 'By Customer by SKU',
      route: '/report-daily-sales-kpis/by-customer-by-sku',
    },
    {
      title: 'By Area by SKU',
      // route: '/report-daily-sales-kpis/by-xyz',
      route: '/report-daily-sales-kpis/by-xyz/1',
    },
    {
      title: 'By Area by SKU_8OZ',
      // route: '/report-daily-sales-kpis/by-xyz/true',
      route: '/report-daily-sales-kpis/by-xyz/2',
    },
    {
      title: 'By area',
      route: '/report-daily-sales-kpis/by-xyz/3',
    },
    {
      title: 'By Area Orange',
      route: '/report-daily-sales-kpis/by-xyz/4',
    },
    {
      title: 'By Area_8OZ',
      route: '/report-daily-sales-kpis/by-xyz/5',
    },
    {
      title: 'By Area_8OZ Orange',
      route: '/report-daily-sales-kpis/by-xyz/6',
    },
    {
      title: 'By Customer',
      route: '/report-daily-sales-kpis/by-xyz/7',
    },
    {
      title: 'By Customer_8OZ',
      route: '/report-daily-sales-kpis/by-xyz/8',
    },
    {
      title: 'By Outlet',
      route: '/report-daily-sales-kpis/by-xyz/9',
    },
  ];
  // sharedVariable$ = new ReplaySubject(1);
  // updateValue(value) {
  //     this.sharedVariable$.next(value);
  // }
  // constructor() { }
}
