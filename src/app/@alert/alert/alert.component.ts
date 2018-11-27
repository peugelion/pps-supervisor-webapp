import { Component, OnInit, Input } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
// import { Alert } from '@angular/compiler/src/i18n/i18n_ast';

/* https://material.angular.io/components/snack-bar/overview */

export interface Alert {
  type: string;
  text: string;
  action: string;
  duration: number;
  verticalPosition: string;
  panelClass: Array<string>;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  // @Input('errorText') errorText: string;
  // @Input('duration') duration: number;
  // @Input('alert') alert: Alert;
  alert: Alert;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
      // // const horizontalPosition: MatSnackBarHorizontalPosition = ;
      // // const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
      // this.snackBar.open(this.errorText, 'Zatvori', {
      //   duration : this.duration,
      //   panelClass : ['ui', 'negative', 'alert'],
      //   // horizontalPosition:  horizontalPosition,
      //   // verticalPosition: verticalPosition,
      //   horizontalPosition:  'end',
      //   verticalPosition: 'bottom',
      // });
      this.showAlert(this.alert);
  }

  showAlert(alert: Alert | any) {
    if (alert != null) {
      // there is a alert to show, so change snackbar style to match the alert type
      alert = this.initMsgDefaults(alert);
      console.log(alert);
      if (alert.type === 'error') {
        this.snackBar.open(alert.text, undefined, {
          duration: alert.duration * 1000, verticalPosition: 'bottom', panelClass: ['ui', 'negative', 'message']
        });
      } else if (alert.type === 'success') {
        console.log('success');
        this.snackBar.open(alert.text, alert.action, {
          duration: alert.duration * 1000, verticalPosition: 'bottom', panelClass: ['ui', 'positive', 'message']
        });
      } else {
        console.log('else');
        this.snackBar.open(alert.text, alert.action, {
          duration: alert.duration * 1000, verticalPosition: 'bottom', panelClass: alert.panelClass
        });
      }
    }
  }

  // pomocna

  initMsgDefaults(alert: Alert | any) {
    if (!alert.action) { alert.action = 'Zatvori'; }
    if (!alert.duration) { alert.duration = 3; }
    if (!alert.verticalPosition) { alert.verticalPosition = 'bottom'; }
    if (!alert.panelClass) { alert.panelClass = ['ui', 'message']; }
    return alert;
  }

}
