// 
(function(window,document) {
if (window !== top) {return;}
if (!! snd) {return window.app.snd;}
  var snd = (function(window,document) {
      var parent = window.app;//parent
      var $ = {"id":parent.id}; // all app.snd specific data goes here
          var param = {'$':parent.$,playing:false,bgplaying:false,queue:[],library:{
            right_answer:'/assets/snd/right_answer.mp3',
            click:'/assets/snd/click.m4a',
            lesson_complete:'/assets/snd/lesson_complete.mp3',
            lesson_failed:'/assets/snd/lesson_failed.mp3',
            wrong_answer:'/assets/snd/wrong_answer.mp3',
            background: '/assets/snd/loop.m4a'
          }};
      return param;
  })(window,document);
  window.app.snd = snd;
  return snd;
})(window,document);
//app.snd.library - stores all app related sounds to replace with blob: and access locally
app.snd.tts = function(text, lang){
if (typeof lang != 'string') {lang = 'en'};
return location.protocol + "//fanyi.baidu.com/gettts?lan="+lang+"&text="+encodeURIComponent(text)+"&spd=4&source=web";
};
app.snd.play = function(o){ 
if (!!app.$.muted && app.$.muted) return;
//{url:url,txt:txt,type:type,type:type}
if (!o instanceof Object ||
  (typeof o.url == 'undefined' && 
    typeof o.txt == 'undefined')
  ) {return;}
if (typeof o.txt == 'string')
{
  o.url = app.snd.tts(o.txt, o.lang);
  o.type = "audio/mp3";
}

if (typeof o.url == 'string')
{

  // if (typeof o.volume == 'undefined') {o.volume = 1.0;}
  if (typeof o.type != 'string')
  {
  var a = ['mp3','m4a','ogg','wav'];
    for(var i in a){
    if (o.url.indexOf(a[i]) !== -1) {o.type = 'audio/'+a[i]; break;}
    }
    if (typeof o.type != 'undefined'){
      for(var i in a){
      if (o.type.indexOf(a[i]) == 0) {o.type = 'audio/'+a[i]; break;}
      }
    }
    if(typeof o.type != 'string') {o.type = 'audio/mp3';}
  }
  var a = new Audio(o.url); a.type=o.type;
  if (!!o.volume)
  {
  a.setAttribute('volume', o.volume);
  a.volume = o.volume;
  // app.log({'a.volume':a.volume,"o.volume":o.volume});
  }
  if (!!o.background) {
    a.loop = "loop";
    if (this.bgplaying) {this.bgplaying.pause();}
      this.bgplaying=a;
      a.play();
  }
  else {
  app.snd.queue.push(a);
  for(var i = 0; i<app.snd.queue.length; i++){
  app.snd.queue[i].addEventListener('ended', (function(arg1){
      return function(){
        app.snd.queue.shift();
        if (app.snd.queue.length>0) {app.snd.queue[0].play();}
      };
    }(i)));
  }
  if (app.snd.queue.length>0){app.snd.queue[0].play();}
}
}

};

app.snd.handleTouch = function(e){
if(app.snd.touched){return;}
app.snd.touched=true; var j = 0; var c = e.target;
while (!c.classList.contains('snd') || j>8) {j++; c = c.parentElement;}
if (!c.classList.contains('snd')) {return;}
c.classList.add('touched');
    setTimeout(function(){c.classList.remove('touched');},1500);
    setTimeout(function(){app.snd.touched=false;},300);
    var pls = c.getAttribute('data')||c.getAttribute('data-text')||c.innerText, l = c.getAttribute('lang')||'en';
    var type = "audio/mp3";
            if (pls.search('blob:')==0 || pls.search('https://')==0 || pls.search('http://')==0 || pls.search('/')>-1)
            {//absolute path link
            var src = new URL(pls, window.location.href).href;
            if (pls.search('.m4a')==-1) {type = "audio/m4a";}
            else if (pls.search('.ogg')==-1) {type = "audio/ogg";}
            }
            else {
            var src = app.snd.tts(pls, l);
            }
        app.snd.play(src,type);
};
