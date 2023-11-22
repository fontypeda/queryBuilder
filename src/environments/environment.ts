// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  documentUrl: '/assets/api/elastic-document.php',
  searchUrl: '/assets/api/elastic-search.php',
  analyseUrl: '/assets/api/elastic-analyse.php',
  wordpressThemeUrl: './',
  wordpressPageUrl: '/',
  index: 'fud_augusta_doctyp2,fud_augusta_doctyp3'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
