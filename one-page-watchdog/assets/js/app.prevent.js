// prevents pinch zoom
(function(window,document) {
if (window !== top) {return;}
if (!! prevent) {return window.app.prevent;}
  var prevent = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);

  window.app.prevent = prevent;
  return prevent;
})(window,document);
app.prevent.init = function(){
  if ('ontouchstart' in window) {
  document.body.addEventListener('touchmove', function(e){ e.preventDefault();e.stopPropagation(); }, { passive: false });
  window.addEventListener('touchstart', function (e) {app.prevent.touchHandler(e);}, false);
  }
};
app.prevent.touchHandler = function(event){
    if(event.touches.length > 1){
        //the event is multi-touch
        //you can then prevent the behavior
        event.preventDefault();
    }
};

app.prevent.preventMotion = function(event){
    window.scrollTo(0, 0);
    event.preventDefault();
    event.stopPropagation();
};
