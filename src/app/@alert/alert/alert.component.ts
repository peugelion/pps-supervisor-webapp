import { Component, OnInit, Input } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

/* https://material.angular.io/components/snack-bar/overview */

export interface Message {
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
  // @Input('message') message: Message;
  message: Message;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
      // // const horizontalPosition: MatSnackBarHorizontalPosition = ;
      // // const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
      // this.snackBar.open(this.errorText, 'Zatvori', {
      //   duration : this.duration,
      //   panelClass : ['ui', 'negative', 'message'],
      //   // horizontalPosition:  horizontalPosition,
      //   // verticalPosition: verticalPosition,
      //   horizontalPosition:  'end',
      //   verticalPosition: 'bottom',
      // });
      this.showAlert(this.message);
  }

  showAlert(message: Message | any) {
    if (message != null) {
      // there is a message to show, so change snackbar style to match the message type
      message = this.initMsgDefaults(message);

      if (message.type === 'error') {
        this.snackBar.open(message.text, undefined, { duration: message.duration * 1000, verticalPosition: 'bottom', panelClass: ['ui', 'negative', 'message'] });
      } else if (message.type === 'success') {
        this.snackBar.open(message.text, undefined, { duration: message.duration * 1000, verticalPosition: 'bottom', panelClass: ['ui', 'positive', 'message'] });
      } else {
        this.snackBar.open(message.text, message.action, { duration: message.duration * 1000, verticalPosition: 'bottom', panelClass: message.panelClass });
      }
    }
  }

  // pomocna

  initMsgDefaults(message: Message | any) {
    if (!message.action) message.action = 'Zatvori';
    if (!message.duration) message.duration = 3;
    if (!message.verticalPosition) message.verticalPosition = 'bottom';
    if (!message.panelClass) message.panelClass = ['ui', 'message'];
    return message;
  }

}
