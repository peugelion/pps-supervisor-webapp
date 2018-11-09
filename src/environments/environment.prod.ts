export const environment = {
  production: true,
  // apiUrl: location.protocol + '//' + location.hostname + ':3000', // eg 'http://localhost:3000', 'http://192.168.1.101:3000',
  // apiUrl: 'http://' + location.hostname + ':3000', // eg 'http://localhost:3000', 'http://192.168.1.101:3000',
  // apiUrl: 'http://localhost/api', // eg 'http://localhost:3000', 'http://192.168.1.101:3000',
  apiUrl: location.origin, // eg 'http://localhost:3000', 'http://localhost', 'http://192.168.1.101:3000'
  DATE_TIME_FMT: `dd.MM.yy H:mm`,
  DATE_FMT: `date`
};
