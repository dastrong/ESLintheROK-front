/* global navigator window */

// an older version of the site using CRA had a service worker that we need to remove/unregister here
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister().then(bool => {
          console.log('unregister: ', bool);
        });
      }
      window.location.reload();
    });
  });
}
