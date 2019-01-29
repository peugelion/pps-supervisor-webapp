import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { LiquidCache } from 'ngx-liquid-cache';
import { Router } from '@angular/router';

const API_ROOT = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */
const LOGIN_PATH = '/api/login';  // URL to web api
const LOGOUT_PATH = '/api/logout';  // URL to web api

const WORKER_ROUTES_PATH = '/api/dashboard/workerRoutes';
const ROUTE_DETAILS_PATH = '/api/dashboard/route-details'; // + Fk_Partner
const API_ROUTE_DETAILS = `${API_ROOT}${ROUTE_DETAILS_PATH}`;

// const INSERT_KOMECIJALISTA_PRAVO_PATH = '/api/dashboard/insertKomercijalistaPravo';
const KPIS_RPT_DAILY_SALES_ByCustBySKU_PATH = '/api/dashboard/KPIsReport/dailySalesByCustomerBySKU';

const KPIS_RPT_DAILY_SALES_ByAreaBySKU_PATH = '/api/dashboard/KPIsReport/dailySalesByAreaBySKU';
const KPIS_RPT_DAILY_SALES_ByArea_PATH = '/api/dashboard/KPIsReport/dailySalesByArea';
const KPIS_RPT_DAILY_SALES_ByCustomer_PATH = '/api/dashboard/KPIsReport/dailySalesByCustomer';

// const KPIS_RPT_RADNIK_PODREDJEN_PARTNER_PATH = '/api/dashboard/KPIsReport/radnikPodredjenPartner';
// const WORKER_PARTNERS_PATH = '/api/dashboard/workerPartners';
const TLNR_PARTNER_OPREMA_IZUZETAK_PATH = '/api/dashboard/tlnr/VratiPartnerOpremaIzuzetak';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient, public router: Router) { }

  // @LiquidCache('getWorkerRoutes {Fk_Radnik} {date}', { duration: 60 * 2 }) // kesira api rezulat X minuta
  getWorkerRoutes(Fk_Radnik, date) {
    const apiURL = `${API_ROOT}${WORKER_ROUTES_PATH}`;
    const httpOptions = {
      withCredentials: true,
      params: {
        'datum': date.toISOString(),
        'Fk_Radnik': Fk_Radnik,
        // 'parsirano': parsirano
      }
    };
    return this._http.get(apiURL, httpOptions);
  }

  //

  // @LiquidCache('getPositionsList {Fk_Partner} {dateStr}', { duration: 60 * 2 })
  async getPositionsList(Fk_Partner: number, dateStr: string) {
    try {
      const apiURL = `${API_ROUTE_DETAILS}/${Fk_Partner}`;
      const httpOptions = {
        withCredentials: true,
        params: {
          'date': dateStr
        }
      };
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  // @LiquidCache('getSinglePosition {Fk_Partner} {Fk_Pozicija} {dateStr}', { duration: 60 * 3 })
  async getSinglePosition(Fk_Partner: number, Fk_Pozicija: number, dateStr) {
    try {
      const apiURL = `${API_ROUTE_DETAILS}/${Fk_Partner}`;
      const httpOptions = {
        withCredentials: true,
        params: {
          'date': dateStr,
          'Fk_Pozicija': Fk_Pozicija.toString()
        }
      };
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  // @LiquidCache('getZalihe {Fk_Partner} {dateStr}', { duration: 60 * 5 })
  async getZalihe(Fk_Partner: number, dateStr: string) {
    try {
      const apiURL = `${API_ROOT}${ROUTE_DETAILS_PATH}/${Fk_Partner}`;
      const httpOptions = {
        withCredentials: true,
        params: {
          'date': dateStr,
          'Zalihe': 'true'
        }
      };
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  //


  // (SifraPreduzeca, user, Fk_Radnik,
  // Fk_Partner, date, Fk_St_670)
  async insertKomercijalistaPravo(Fk_RadnikSifra: number, Fk_Partner: number, dateStr: string, Fk_St_670: number) {
    try {
      // console.log('api insertKomercijalistaPravo: ', Fk_RadnikSifra, Fk_Partner, dateStr, Fk_St_670);
      const body = {
        'Fk_RadnikSifra': Fk_RadnikSifra.toString(),
        // 'Fk_Partner': Fk_Partner,
        'date': dateStr,
        'Fk_St_670': Fk_St_670.toString()
      };
      // console.log('api insertKomercijalistaPravo post body: ', body);
      // return await this._http.post(`${API_ROOT}${INSERT_KOMECIJALISTA_PRAVO_PATH}`, body, httpOptions).toPromise();
      return await this._http.post(`${API_ROOT}${ROUTE_DETAILS_PATH}/${Fk_Partner}`, body, { withCredentials: true }).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return e;
    }
  }

  //

  // @LiquidCache('dailySalesKPIsRptByCustomerBySKU {SifraPARTNER} {Datum_do}', { duration: 60 * 2 })
  async dailySalesKPIsRptByCustomerBySKU(SifraPARTNER: number, Datum_do: Date) {
    try {
      const apiURL = `${API_ROOT}${KPIS_RPT_DAILY_SALES_ByCustBySKU_PATH}/${SifraPARTNER}`;
      const httpOptions = {
        withCredentials: true,
        params: {
          'Datum_do': Datum_do ? Datum_do.toISOString() : null
        }
      };      // console.log('SifraPARTNER', SifraPARTNER, 'Datum_do', Datum_do, 'httpOptions', httpOptions);
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  // @LiquidCache('dailySalesKPIsRptByXYZ {SifraPARTNER} {Datum_do}', { duration: 60 * 2 })
  // async dailySalesKPIsRptByXYZ(Sifra_Radnika: number, Datum_do: Date, isCsd: 0 | 1, Dali8OZ: 0 | 1) {
  // async dailySalesKPIsRptByXYZ(Sifra_Radnika: number, Datum_do: Date, isCsd: 0 | 1, Dali8OZ: boolean) {
  async dailySalesKPIsRptByAreaBySKU(Sifra_Radnika: number, Datum_do: Date, isCsd: 0 | 1, Dali8OZ: boolean) {
    // async dailySalesKPIsRptByAreaBySKU(Sifra_Radnika: number, Datum_do: Date, isCsd: 0 | 1, reportNo: Number) {
    try {
      // console.log(`dailySalesKPIsRptByXYZ isCsd: ${isCsd}, Dali8OZ:`, Dali8OZ, +Dali8OZ);
      const apiURL = `${API_ROOT}${KPIS_RPT_DAILY_SALES_ByAreaBySKU_PATH}/${Sifra_Radnika}`;
      // const httpOptions = {
      //   withCredentials: true,
      //   params: {
      //     'Datum_do': Datum_do ? Datum_do.toISOString() : null,
      //     'isCsd': isCsd.toString(),
      //     'Dali8OZ': (+Dali8OZ).toString()
      //   }
      // };

      const params = {};
      params['Datum_do'] = Datum_do ? Datum_do.toISOString() : null;
      if (!!+isCsd) {
        params['isCsd'] = '1';
      }
      // const dali8OZ = !!+(reportNo - 1);  // reportNo = 1 -> dali8OZ = false,  reportNo = 2 -> dali8OZ = true
      // const dali8OZ = !!+(reportNo - 1);
      if (Dali8OZ) {
        params['Dali8OZ'] = '1';
      }
      const httpOptions = {
        'withCredentials': true,
        'params': params
      };

      // console.log('Sifra_Radnika', Sifra_Radnika, 'Datum_do', Datum_do, 'httpOptions', httpOptions);
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  async dailySalesKPIsRptByXYZ(reportNo: number, Datum_do: Date, isCsd: 0 | 1) {
    try {
      // console.log(`dailySalesKPIsRptByXYZ reportNo: ${reportNo}, isCsd: ${isCsd}`);
      // console.log('[1, 2].indexOf(reportNo) :', [1, 2].indexOf(reportNo), [1, 2].indexOf(reportNo) + 1);
      // console.log('reportNo === (1 || 2)    :', reportNo === (1 || 2));
      if ([3, 4, 5, 6].indexOf(reportNo) + 1) {
        // console.log('loadDailySalesByArea (rpts 3-6)');
        // return await this.loadDailySalesByArea();
      }
      // isCSD = reportNo === 1
      const apiURL = `${API_ROOT}${KPIS_RPT_DAILY_SALES_ByArea_PATH}`;
      const params = {};
      params['Datum_do'] = Datum_do ? Datum_do.toISOString() : null;
      const isOrange = [4, 6].indexOf(reportNo) + 1; // rpt 4 or 6
      if (isOrange) {
        params['isOrange'] = '1';
      } else if (!!+isCsd) {
        params['isCsd'] = '1';
      } else {
        params['isLipton'] = '1';
      }
      const Dali8OZ = [5, 6].indexOf(reportNo) + 1; // rpt 5 or 6
      if (Dali8OZ) {
        params['Dali8OZ'] = '1';
      }
      const httpOptions = {
        'withCredentials': true,
        'params': params
      };
      // console.log('Datum_do', Datum_do, 'httpOptions', httpOptions);
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  async dailySalesKPIsRptByCustomer(Sifra_Radnika: number, Datum: Date, isCsd: 0 | 1, Dali8OZ: boolean, isOutlet: boolean) {
    try {
      const apiURL = `${API_ROOT}${KPIS_RPT_DAILY_SALES_ByCustomer_PATH}/${Sifra_Radnika}`;
      const params = {};
      params['Datum'] = Datum ? Datum.toISOString() : null;
      if (!!+isCsd) {
        params['isCsd'] = '1';
      }
      if (Dali8OZ) {
        params['Dali8OZ'] = '1';
      }
      if (isOutlet) {
        params['isOutlet'] = '1';
      }
      const httpOptions = {
        'withCredentials': true,
        'params': params
      };

      // console.log('Sifra_Radnika', Sifra_Radnika, 'Datum_do', Datum_do, 'httpOptions', httpOptions);
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  //

  /* tlnr */
  vratiPartnerOpremaIzuzetak() {
    const apiURL = `${API_ROOT}${TLNR_PARTNER_OPREMA_IZUZETAK_PATH}`;
    return this._http.get(apiURL, { withCredentials: true });
  }

  handleHttpError(err) {
    console.warn(err.status, err.error);
    if (err.status === 401) {
      this.router.navigate(['login']);
    }
    return err;
  }
}
