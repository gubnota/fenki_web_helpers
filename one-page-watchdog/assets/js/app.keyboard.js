// forms a keyboard
(function(window,document) {
if (window !== top) {return;}
if (!! keyboard) {return window.app.keyboard;}
  var keyboard = (function(window,document) {
      var parent = window.app;//parent
      var sticky_keys = false;
          var param = {'$':parent.$,sticky_keys:sticky_keys};
      return param;
  })(window,document);

  window.app.keyboard = keyboard;
  return keyboard;
})(window,document);
app.keyboard.unstick = function(){
  [].forEach.call(dom.all('#keyboard > span.pressed'), function(element, index) {
  element.classList.remove('pressed');
  });
};
app.keyboard.show = function(callback){
//app.call({f:callback,args:['']});
app.keyboard.sticky_keys=false;
var e = document.createElement('div');
e.classList.add('centered');
var c = app.dom('#content');
var b = document.createElement('div');
b.setAttribute('id','keyboard');
var d = document.createElement('div');
d.classList.add('keyboard_placeholder');
var keys_objects = [];
var keys = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,-, ,’,z'.split(',');
for (var i = 0; i < keys.length; i++) {
  var s = document.createElement('span');
  s.innerHTML = keys[i];
  keys_objects.push(s);
  if (keys[i] == 'i' || keys[i] == 'q' || keys[i] == 'y')
  {
var br = document.createElement('br');
    b.appendChild(br);
  }
  if (keys[i]=== ' ') {s.classList.add('space');}
  b.appendChild(s);
}
e.appendChild(b);
c.appendChild(e);


  app.tap(Object.values(keys_objects),function(event){
    // if (event.currentTarget.innerHTML.length>1) return;
    // console.log(event.currentTarget.innerText);
  if (event.currentTarget.classList.contains('pressed')) return;
  if (!event.currentTarget.classList.contains('pressed'))
  {
    event.currentTarget.classList.add('pressed');
      app.snd.play({url:app.snd.library.click});
      app.call({f:callback, args:[event.target.innerText]});
  }
    if(!app.keyboard.sticky_keys){
    setTimeout(function(e){
      e.classList.remove('pressed');
    }, 100, event.currentTarget);
    }

  });
app.keyboard.set_orientate_event(b);
};

    document.addEventListener('keydown', event => {
        var key = event.key.toLowerCase();
          // if (key === ' ') {key = '<space>';}
        [].forEach.call(dom.all('#keyboard > span'), function(element, index) {
        // console.log('"'+element.innerText+'"','"'+key+'"');
          if (key === ' ' && element.innerText === '') {element.click();}
          else if (key === '\'' && element.innerText === '’') {element.click();}
          else if (element.innerText === key) {element.click();}
        });
    });

  app.keyboard.set_orientate_event = function(c){
  window.addEventListener('orientationchange', function () {app.keyboard.orientate(c);}, false);
  window.addEventListener('resize', function () {app.keyboard.orientate(c);}, false);
  window.setTimeout(function(){app.keyboard.orientate(c);}, 0);
};


app.keyboard.desorientate = function (c) {
  if (!c) {c = app.$.c;}
  this.style.remove();
};
app.keyboard.orientate = function (c,cols,rows) {

var w = app.$.w||window.innerWidth;
var h = app.$.h||window.innerHeight;
if (!!app.dom('#menu')) 
  {
    h = h-app.dom('#menu').clientHeight;
  }
  cols = 8;
  rows = 4;
  dom.clr('#keyboard_styler');
    var j = document.createElement('style'); j.setAttribute('id','keyboard_styler');
    document.body.appendChild(j);
    this.style = j;
    var line,margin,fontsize,span,space,extrasmall='';
/*791 - height, 724 - width
keyboard is 8 x 4 tiles
8 tiles should hold more than 75% of width and 20% of height
$size = Math.min(791*0.75/8, 724*0.20/4)
$margin = $size/10;
Space should be 4 tiles width + 7 spaces between tiles (margin value * 7)
Font size is 80% from $size
line-height = $size

width 834px

span 84px

space 396px
*/
      if (Math.min(h,w)<480) {
        extrasmall = 'none';
      }
      else {
        extrasmall = '';
      }
      if (extrasmall == 'none')
      {
      span = parseInt(Math.min(h/(rows+0.6)*0.7, w/(cols+1.4)))-2;
      }
      else {
      span = parseInt(Math.min(h/(rows+0.6)*0.45, w/(cols+1.4)*1))-2;
      }
      margin = parseInt(span/10);
      fontsize = parseInt(span*0.8);
      line = (span+fontsize)/2;
      space = 4*span + 6 * margin;
      app.log({extrasmall:extrasmall,w:w,h:h,'Math.min(h,w)':Math.min(h,w),'Math.min(h,w)<666':Math.min(h,w)<666});
      [].forEach.call(dom.all('#keyboard > br'), function(element, index) {
      element.style.display = extrasmall;
      });

//    app.log({width_2x2_tile:width_2x2_tile||"auto",height_2x2_tile:height_2x2_tile||"auto"});
    j.innerHTML = [
    "#keyboard span {width:",span,"px;height:",
    span,"px; font-size: ",fontsize,
    "px;margin: ",margin,"px; line-height:",line,"px;}#keyboard span.space{width:",space,"px}"].join('');
};
