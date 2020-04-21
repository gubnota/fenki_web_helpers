// splits surfaces onto rectangles; controls geometry, how big are tiles
(function(window,document) {
if (window !== top) {return;}
if (!! split) {return window.app.split;}
  var split = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);

  window.app.split = split;
  return split;
})(window,document);


app.split.init = function (e) {
  window.scrollTo(0,0);
  var a = document.getElementsByTagName('html')[0];
  app.$.pwa = false;//standalone PWA fullscreen iOS app
  app.$.desktop = true; // no orientation property
  if(!!window.orientation)
   {
     app.$.desktop = false; // mobile device
     if (typeof window.navigator.standalone != 'undefined' && window.navigator.standalone)
     {
     app.$.pwa = true;
     }
    if(!app.$.pwa)
    {
    a.classList.add('landscape');
    }
}
if (app.smallscreen()) {a.classList.add('smallscreen');/*app.log('smallscreen');*/}
window.addEventListener('orientationchange', function () {app.split.orientate();}, false);
window.addEventListener('resize', function () {app.split.orientate();}, false);
  window.setTimeout(app.split.orientate, 0);
};

app.split.orientate = function (e) {
var out = {},w,h,tmp;
// check zoom level during user interaction, or on animation frame
// var currentZoom = app.dom('html').offsetWidth / window.innerWidth;
// out.currentZoom = currentZoom;
// after updating viewport tag, force the page to pick up changes
// app.dom('meta[name="viewport"]').setAttribute('content', "width=device-width; initial-scale=1.0");
// document.body.style.opacity = 0.9999;
// setTimeout(function(){
//     document.body.style.opacity = 1;
// }, 1);
w = window.innerWidth; h = window.innerHeight;
if(app.$.pwa) {
  out.standalone = app.$.pwa;
  h = app.dom('html').offsetHeight;
  w = app.dom('html').offsetWidth;
}
if(!app.$.desktop) {
  out.orientation = window.orientation;
}
if(!app.$.desktop && Math.abs(window.orientation) == 90) {
out.orientation_state = 'landscape'; app.$.orientation_state = 'landscape';
}
if(!app.$.desktop && window.orientation % 180 == 0) {
out.orientation_state = 'portrait'; app.$.orientation_state = 'portrait';
if(!app.$.pwa) {tmp = h; h = w; w = tmp;}
}//[portrait orientation
  out.height = h;
  out.width = w;
  app.$.w = w;
  app.$.h = h;
// app.log(out);
};
