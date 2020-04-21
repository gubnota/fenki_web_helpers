// 
(function(window,document) {
if (window !== top) {return;}
if (!! counter) {return window.app.counter;}
  var counter = (function(window,document) {
      var parent = window.app;//parent
      var settings = {fill:true};//fill the whole screen entirely
          var param = {'$':parent.$,settings:settings};
      return param;
  })(window,document);

  window.app.counter = counter;
  return counter;
})(window,document);

app.counter.show = function(callback){
//app.call(callback,'');
var c = app.dom('#content');
var b = document.createElement('div');
b.setAttribute('id','counter');
var d = document.createElement('div');
d.classList.add('menu_placeholder');
var keys = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,-,<space>,\''.split(',');
for (var i = 0; i < keys.length; i++) {
  var s = document.createElement('span');
  s.innerText = keys[i];
  if (keys[i] == 'i' || keys[i] == 'q' || keys[i] == 'y' && !app.smallscreen())
  {
    s.classList.add('clr');
  }
  if (keys[i].length == 7) {s.classList.add('space');}
  b.appendChild(s);
}
d.appendChild(b);
c.appendChild(d);
};