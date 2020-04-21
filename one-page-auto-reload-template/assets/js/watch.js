app.debugger = function () {
  window.onload = function() {
  console.log("app_ver = "+window.app_ver,"loaded!");
  var tags =document.getElementsByTagName('meta');
  [].forEach.call(tags,function (a) {
    if (a.getAttribute('http-equiv')=='refresh'){
//    console.log("tag",a,"removed!");
    a.parentNode.removeChild(a);
    window.stop();
    }
  });

if (location.search.indexOf('watch') != -1 || true){
setInterval(function() {
  if (!app.$.pending_app_ver) {
    app.$.pending_app_ver = true;
    var time = app.gmtime();
    fetch('/assets/ver.json?'+time).then(function (response) {
    	return response.json();
    }).then(function(blob) {
      app.$.pending_app_ver = false;
    	if (parseInt(time)-parseInt(blob.app_ver)>2 && blob.app_ver != app_ver)
      {
        window.location.reload();
      }
    });
  }
}, 1000);
};

  };
};
app.debugger();
delete app.debugger;
if('serviceWorker' in navigator && location.search.indexOf('nosw') == -1 && !window.debug && false) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function(registration) {
          // console.log("Service Worker Registered");
         });
}
else {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister(); //console.log(registration);
} })
}
