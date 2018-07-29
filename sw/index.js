if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.register('/sw.js').then(function() {
      console.log("Registered");
    }).catch(function() {
      console.log("Uh oh :(");
    })
  });
}
