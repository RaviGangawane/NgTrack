// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYnJhc2thbSIsImEiOiJja3NqcXBzbWoyZ3ZvMm5ybzA4N2dzaDR6In0.RUAYJFnNgOnn80wXkrV9ZA',
  },
   firebaseConfig : {
    apiKey: "AIzaSyCvtild5UJdQqpax2vWsBN6mhC5megh20Y",
    authDomain: "itrack-9b96d.firebaseapp.com",
    projectId: "itrack-9b96d",
    storageBucket: "itrack-9b96d.appspot.com",
    messagingSenderId: "826989372548",
    appId: "1:826989372548:web:186765bdced7ca2fa80ed1",
    measurementId: "G-8B4T34D891"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
