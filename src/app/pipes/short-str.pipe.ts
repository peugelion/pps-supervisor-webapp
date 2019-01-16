import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortMonth'
})
/* 'JanuaryTY' => 'JanTY', ... column header string u izvestaju KPIs */
export class ShortMonthPipe implements PipeTransform { //

  str = '';

  transform(value: any, args?: any): any {
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return mL.some((v, i) => this.replaceStr(value, v, i)) ? this.str : value;
  }

  /* pomocna */
  replaceStr(value, v, i) {
    // const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    // const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (value.indexOf(v) >= 0) {
      this.str = value.replace(v, mS[i]); // !
      return true;
    } else {
      return false;
    }
  }

}

@Pipe({
  name: 'TYvsLY'
})
export class TyvsLyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.includes('TYvs') || value.includes('TDvs')) {
      return 'vs';
    }
    if (value.endsWith('TY')) {
      // console.log(value);
      return value.substring(0, value.length - 2);
    }
    if (value.endsWith('LY') && value !== 'MTDLY') {
      // console.log(value);
      return 'LY';
    }
    return value;
  }

}
