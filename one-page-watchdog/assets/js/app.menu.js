// 
(function(window,document) {
if (window !== top) {return;}
if (!! menu) {return window.app.menu;}
  var menu = (function(window,document) {
      var parent = window.app;//parent
      var settings = {fill:true};//fill the whole screen entirely
          var param = {'$':parent.$,settings:settings};
      return param;
  })(window,document);

  window.app.menu = menu;
  return menu;
})(window,document);

app.menu.handler = function(id){
  if (id == 'sound')
  {
    var b = app.dom('#sound');
    if (b.classList.contains('icon-sound'))
    {
    app.$.muted = true; localStorage.setItem('muted',true);
    b.classList.remove('icon-sound');b.classList.add('icon-mute');
    }
    else {
    app.$.muted = false; localStorage.setItem('muted',false);
    b.classList.remove('icon-mute');b.classList.add('icon-sound');
    }
  }
  if (id == 'skip')
  {
  }
  if (id == 'home')
  {
    if (!!app.current_page && (app.current_page == "games" || app.current_page == "lessons"))
    {app.lessons.init();}
  else {app.games.build();}
  }
};
app.menu.show = function(object){
dom.clr('#content');
if (typeof object == 'undefined') object = "app.menu.handler";
var prototype_object = [{'class':'icon-home','callback':'app.menu.handler',id:'home'},{'class':'icon-sliders','callback':'app.menu.handler',id:'settings'},{'class':'icon-sound','callback':'app.menu.handler',id:'sound'},{'class':'icon-angle-double-right','callback':'app.menu.handler',id:'skip'}];
if (typeof object == 'string') {
var callback = object;
object = prototype_object;
object.forEach( function(element, index) {
  element.callback = callback;

if (element.id =='sound' && (localStorage.getItem('muted') === 'true' || (!!app.$.muted && app.$.muted)))
{
    element.class = 'icon-mute'; app.$.muted=true;
}

});
}

//if (typeof object !== 'object' || Object.keys(object).length<1) {}
app.$.menubar = object;
app.$.menubars_objects=[];
//object = {left:{callback:cb,content:content,class:class},right:{},center:{}};
var c = app.dom('#content');
var m = app.dom('#menu');
if (!m) {
  m = document.createElement('h1');
  m.setAttribute('id', 'menu');
  c.appendChild(m);
}

Object.values(object).forEach( function(element, index) {
var button = document.createElement('span');
button.classList.add(element.class.split(' '));
button.innerText = element.text||'';
button.setAttribute('data-callback', element.callback||'app.menu.handler');
if (!!element.id) {button.setAttribute('id',element.id);}
app.$.menubars_objects.push(button);
m.appendChild(button);
app.tap([button],function(event){
if (event.target.classList.contains('pressed')) return;
if (!event.target.classList.contains('pressed'))
  event.target.classList.add('pressed');
  setTimeout(function(e){
      e.classList.remove('pressed');
  }, 200, event.target);
// app.snd.play({url:'/assets/snd/error.mp3'});
app.call({f:event.target.getAttribute('data-callback'), args: [event.target.getAttribute('id')]});
});
});
app.menu.set_orientate_event();
};

app.menu.orientate = function(){
dom.del('#menu_styler');
var j = document.createElement('style'); j.setAttribute('id','menu_styler');
document.body.appendChild(j);
var fontsize = 1;
var w = app.$.w||window.innerWidth;
var h = app.$.h||window.innerHeight-app.dom('#menu').clientHeight;
var cols = 1, rows = 6;
fontsize = Math.ceil(Math.min(w,h)/(Math.max(cols,rows)));
j.innerHTML = [".lesson,.game {font-size: ",0.4*fontsize,"px;line-height:",0.8*fontsize,"px}"].join('');
};
app.menu.set_orientate_event = function(){
  window.addEventListener('orientationchange', function () {app.menu.orientate();}, false);
  window.addEventListener('resize', function () {app.menu.orientate();}, false);
  window.setTimeout(function(){app.menu.orientate();}, 0);
};
