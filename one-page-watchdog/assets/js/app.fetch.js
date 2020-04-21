(function(window,document) {
if (window !== top) {return;}
if (!! fetch) {return window.app.fetch;}
  var fetch = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);

  window.app.fetch = fetch;
  return fetch;
})(window,document);
app.fetch.css = function () {
  var a = app.dom('#app_fetch_style');
  if (!a){
    a = document.createElement('style');
    a.setAttribute('id','app_fetch_style');
    a.innerHTML = ["html, body { ","height: 100%; ","margin: 0;}","#loader_container { ","position: fixed; ",
    "width: 100%; ","height: 100%; ","left: 0; ","top: 0; ","z-index: 100; ","min-height: 100%; ",
    "background: #093656; ","overflow: hidden;","} ","#loader { ","height: 3rem; ",
    "background: #11649e; ","border-radius: 2rem; ","padding: 10px; ",
    "box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3); ","margin: 0; ",
    "position: absolute; ","top: 50%; ","left: 50%; ","transform: translate(-50%,-50%); ",
    "width: 99%; ","box-sizing: border-box; ","z-index: 1000; ","} ","#loader > span { ",
    "width: 0%; ","display: block; ","height: 100%; ","border-radius: 2rem; ",
    "background-color: rgb(249,238,162); ","background-image: -webkit-gradient( ",
    "linear, ","left bottom, ","left top, ","color-stop(0, rgb(249,238,162)), ",
    "color-stop(1, rgb(228,199,0)) ","); ","background-image: -moz-linear-gradient( ",
    "center bottom, ","rgb(249,238,162) 37%, ","rgb(228,199,0) 69% ","); ","box-shadow: ",
    "inset 0 2px 9px rgba(255,255,255,0.3), ","inset 0 -2px 6px rgba(0,0,0,0.4); ",
    "position: relative; ","overflow: hidden; ","} ","#loader > span:after { ",
    "content: \"\"; ","position: absolute; ","top: 0; left: 0; bottom: 0; right: 0; ",
    "background-image: ","-webkit-gradient(linear, 0 0, 100% 100%, ",
    "color-stop(.25, rgba(255, 255, 255, .2)), ",
    "color-stop(.25, transparent), color-stop(.5, transparent), ",
    "color-stop(.5, rgba(255, 255, 255, .2)), ",
    "color-stop(.75, rgba(255, 255, 255, .2)), ",
    "color-stop(.75, transparent), to(transparent) ","); ",
    "background-image: -moz-linear-gradient( -45deg, rgba(255, 255, 255, .2) 25%, ",
    "transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, ",
    "transparent 75%, transparent); ",
    "z-index: 1; ","background-size: 50px 50px; ","background-size: 50px 50px; ","animation: move 2s linear infinite; ",
    "border-radius: 2rem; ","overflow: hidden; ","}"," ","@keyframes move { ","0% { ","background-position: 0 0; ","} ",
    "100% { ","background-position: 50px 50px; ","}}",
  "#loader_bar.animated{transition:width 0.4s}"].join('');
    document.body.appendChild(a);
  }
};
app.fetch.loading = function(clean_content){
clean_content = clean_content||false;
var s = dom.sel('#content');
if (clean_content) dom.clr('#content');
var loader = document.createElement('div');
loader.classList.add('loading');
loader.setAttribute('id','spinner');
loader.innerHTML = "Loading&#8230;";
s.appendChild(loader);
};
app.fetch.loaded = function(){
dom.sel('#spinner').remove();
};
app.fetch.html = function () {
  var el = document.getElementById('loader_container');
  if (!el){
  	el = document.createElement('div');
  	el.setAttribute('id','loader_container');
  	var el2 = document.createElement('div');
  	el2.setAttribute('id','loader');
  	var el3 = document.createElement('span');
  	el3.setAttribute('id','loader_bar');
  	el2.appendChild(el3);
  	el.appendChild(el2);
  	document.body.insertBefore(el,document.body.firstChild);
  }
  app.fetch.myBar = document.getElementById('loader_bar');
};
app.fetch.init= function () {
  if (!this.step) {
  this.progress=0;
  this.step=1;
  this.percentage='0%';
  this.start=0;
  this.end=0;
}
this.pending=true;
this.results=[];
};
app.fetch.animate= function () {//slowly move the slider even in case of 404
};
app.fetch.clean = function () {
  if(this.show_progress){
  dom.del('#app_fetch_style');
  dom.del('#loader');
  dom.del('#loader_container');
  }
};

app.fetch.arr = function(opts){
opts = opts || {};
opts = app.var(opts,{urls:[],callback:'app.log',show:false,loading:true,this:app,type:"blob"});
var urls = opts.urls;
if (opts.show) {
  this.css();
  this.html();
  this.show_progress = true;
}
else {
  this.show_progress = false;
}
if (opts.loading) app.fetch.loading(true);
this.init();
this.step = 1 / (urls.length || 1);
app.fetch.start = new Date().getTime();
	app.fetch.progress = 0;
	app.fetch.percentage = '0%';
  if (window.debug == 1){
  // app.dom('#debugger .contents').innerHTML = '';
}
  if (this.show_progress){
  app.fetch.myBar.style.width = app.fetch.percentage;
app.fetch.myBar.classList.add('animated');
app.fetch.update_progress_bar_setInterval = setInterval(function(){
	app.fetch.end = new Date().getTime();
	if (app.fetch.end - app.fetch.start / 3000 > app.fetch.progress)
	{
	app.fetch.progress = Math.min(1, app.fetch.progress + 0.01);
    app.fetch.percentage = Math.floor(app.fetch.progress*100)+'%';
    app.fetch.myBar.style.width = app.fetch.percentage;
    if (app.fetch.progress==1)
    {
      clearInterval(app.fetch.update_progress_bar_setInterval);
            setTimeout(function(){
            app.fetch.clean();
          },500);
    }
	}
},150);
}
urls.forEach(function(url, i) { // (1)
app.fetch.results[i] = null;
fetch(url)
.then(function (response) {
  if (response.status == 200)
{
  if (opts.type == 'blob') {return response.blob();}
  else {return response.json();}
}
// app.fetch.results.push(null);
})
.then(function(myBlob) {
if (opts.type == 'blob')
{
  var objectURL = URL.createObjectURL(myBlob);
  var if200 = myBlob instanceof Blob; // non-404
   if (if200) {app.fetch.results[i] = objectURL;}
}
else {
  app.fetch.results[i] = myBlob;
}
    app.fetch.progress = Math.min(1, app.fetch.progress+app.fetch.step);
    app.fetch.percentage = Math.floor(app.fetch.progress*100)+'%';

      if (i+1 == urls.length) {
      app.fetch.pending=false;//download worker is finished
    	app.fetch.progress = 1; app.fetch.percentage = '100%';
      app.fetch.clean();
      if (app.fetch.show_progress)
     	  {clearInterval(app.fetch.update_progress_bar_setInterval);}
        if (urls.length == 1 && opts.type != 'blob')
        {
        var result = myBlob;
        app.call({f:opts.callback,args:[result],this:opts.this});
        }
        else {
        var result = {};
        urls.forEach(function(key, idx){result[key] = app.fetch.results[idx]});
        app.call({f:opts.callback,args:[result],this:opts.this});
        }
    }
    if (app.fetch.show_progress){
    app.fetch.myBar.style.width = app.fetch.percentage;
}

}).catch(function (r) {
  // clearInterval(app.fetch.update_progress_bar_setInterval);
        setTimeout(function(){
          app.fetch.pending=false;
        app.fetch.clean();
      },3000);
});
});

};
// replaces in app.$.c entries with its blob: counterparts
app.fetch.blob = function(opts){
opts = opts || {};
opts = app.var(opts,{result:{},urls:{}});
for (key in opts.urls)
{
  if (opts.result.hasOwnProperty(opts.urls[key])){
    opts.urls[key] = opts.result[opts.urls[key]];
  }
}
return opts.urls;
}
// callback to replace in app.$.c entries with its blob: counterparts
app.fetch.blob_callback = function(result){
for (var k in this){
  if (result.hasOwnProperty(this[k])) this[k] = result[this[k]];
}
};