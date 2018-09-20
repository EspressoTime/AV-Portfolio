if (navigator.serviceWorker){ //only run if service workers are supported by that browser

  navigator.serviceWorker.register('service-worker.js', {scope: './'}).then(function() { 
    console.log('Service worker registration successful.');
  }).catch(function() {
    console.log('Service worker registration failed.');
  });
};