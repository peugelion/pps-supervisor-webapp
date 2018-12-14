import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@pepsi-app/providers/api.service';
// import { AlertComponent } from '@pepsi-shared/alert/alert.component';

@Component({
  selector: 'app-tlnr',
  templateUrl: './tlnr.component.html',
  styleUrls: ['./tlnr.component.scss']
})
export class TlnrComponent implements OnInit {
  dataSource = null;
  columnLabels: string[] = [];
  displayedColumns: string[] = [];
  stickyCollumn = '';

  constructor(
    private apiService: ApiService,
    public router: Router,
    // public ppsAlert: AlertComponent,
  ) {
    this.vratiPartnerOpremaIzuzetak();
  }

  ngOnInit() {
  }

  vratiPartnerOpremaIzuzetak() {  // console.log('searchEmployeeRoutes USO', selection);
    this.apiService.vratiPartnerOpremaIzuzetak()
      .subscribe((r: Array<{}>) => {
        // this.segmentDimmed = false;
        console.log('vratiPartnerOpremaIzuzetak data', r);
        // this.columnLabels = data['columnLabels'];
        // this.columnLabels = r['columnLabels'];
        this.columnLabels = ['Sifra', 'Naziv Partnera', 'Adresa', 'Razlog posete', 'Datum Posete'];
        // this.displayedColumns = ['Sifra', 'Naziv', 'Adresa', 'Naziv_Stavke', 'DatumPosete'];
        /* https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string */
        this.displayedColumns = Object.keys(r['data'][0]).filter(e => e !== 'Fk_Partner'); // prikazi sve sem 'FK_partner' kolone
        console.log('this.displayedColumns', this.displayedColumns);
        this.stickyCollumn = 'Mesto';
        this.dataSource = r['data'];
      }, error => {
        error.status === 401 ? this.router.navigate(['login']) : console.warn(error.status, error.error);
        // this.ppsAlert.showErrorAlert({ 'text' : error.error + ' ' + error.status });
        // this.segmentDimmed = false;
      });
    // this.saveState(this.selectedDate, selection, null); /* save selected worker state */
    return true;
  }

}
