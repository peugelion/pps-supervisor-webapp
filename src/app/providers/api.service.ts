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

  // @LiquidCache('dailySalesKPIsRptByAreaBySKU {SifraPARTNER} {Datum_do}', { duration: 60 * 2 })
  // async dailySalesKPIsRptByAreaBySKU(Sifra_Radnika: number, Datum_do: Date, isCsd: 0 | 1, Dali8OZ: 0 | 1) {
  async dailySalesKPIsRptByAreaBySKU(Sifra_Radnika: number, Datum_do: Date, isCsd: 0 | 1, Dali8OZ: boolean) {
    try {
      // console.log(`dailySalesKPIsRptByAreaBySKU isCsd: ${isCsd}, Dali8OZ:`, Dali8OZ, +Dali8OZ);
      const apiURL = `${API_ROOT}${KPIS_RPT_DAILY_SALES_ByAreaBySKU_PATH}/${Sifra_Radnika}`;
      const httpOptions = {
        withCredentials: true,
        params: {
          'Datum_do': Datum_do ? Datum_do.toISOString() : null,
          'isCsd': isCsd.toString(),
          'Dali8OZ': (+Dali8OZ).toString()
        }
      };      // console.log('Sifra_Radnika', Sifra_Radnika, 'Datum_do', Datum_do, 'httpOptions', httpOptions);
      return await this._http.get<any[]>(apiURL, httpOptions).toPromise();
    } catch (e) {
      this.handleHttpError(e);
      return [];
    }
  }

  // @LiquidCache('dailySalesKPIsRptByCustomerBySKU {SifraPARTNER} {Datum_do}', { duration: 60 * 5 })
  // async radnikPodredjenPartner(query: string) {
  //   try {
  //     const apiURL = `${API_ROOT}${KPIS_RPT_RADNIK_PODREDJEN_PARTNER_PATH}/${query}`;
  //     return await this._http.get<any[]>(apiURL, {withCredentials: true}).toPromise();
  //   } catch (e) {
  //     this.handleHttpError(e);
  //     return [];
  //   }
  // }

  //

  // @LiquidCache('getWorkerPartners {Fk_Radnik} {date}', { duration: 60 * 2 }) // kesira api rezulat X minuta
  // getWorkerPartners(Fk_Radnik, query: string) {
  //   const apiURL = `${API_ROOT}${WORKER_PARTNERS_PATH}/${Fk_Radnik}/${query}`;
  //   return this._http.get(apiURL, {withCredentials: true});
  // }

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
