// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: location.protocol + '//' + location.hostname + ':3000', // eg 'http://localhost:3000', 'http://192.168.1.101:3000',
  // apiUrl: 'http://' + location.hostname + ':3000', // eg 'http://localhost:3000', 'http://192.168.1.101:3000',
  // apiUrl: 'http://localhost/api', // eg 'http://localhost:3000', 'http://192.168.1.101:3000',
  apiUrl: location.origin, // eg 'http://localhost:3000', 'http://localhost', 'http://192.168.1.101:3000'
  DATE_TIME_FMT: `dd.MM.yy H:mm`,
  DATE_FMT: `date`
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
