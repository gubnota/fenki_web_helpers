"use strict";
(function(window,document) {
if (window !== top) {return;}
if (!! app) {return window.app;}
  var app = (function(window,document) {
    /**
  	 * Create the constructor
  	 * @param {String} selector The selector to use
  	 */
      var id = Math.ceil(Math.random() * 1000); //unique id
      var data = {"id":id,'pending_app_ver':false,c:false}; // all app specific data goes here

          var param = {'id':id,'$':data,'window':window,'document':document};
      return param;
  })(window,document);

  window.app = app;
  return app;
})(window,document);
app.dom = function (selector) {
return document.querySelector(selector);
};

(function(window,document) {
if (window !== top) {return;}
if (!! dom) {return window.dom;}
  var dom = (function(window,document) {
          var param = {'window':window,'document':document};
      return param;
  })(window,document);

  window.dom = dom;
  return dom;
})(window,document);

dom.sel = function (selector) {
return document.querySelector(selector);
};

dom.all = function (selector) {
return document.querySelectorAll(selector);
};
dom.yield = function (selector) {
return document.createElement(selector);
};

dom.del = function (selector) {
 this.elems = document.querySelectorAll(selector);
 if (typeof this.elems[Symbol.iterator]){
 this.elems.forEach(
   function(currentValue, currentIndex, listObj) {currentValue.remove(currentValue);
   });
   }
};
dom.clr = function (selector) {
    this.elems = document.querySelectorAll(selector);
   if (typeof this.elems[Symbol.iterator]){
 this.elems.forEach(
   function(currentValue, currentIndex, listObj) {currentValue.innerHTML = '';
   });
 }
return this.elems;
};

app.shuffle = function (array) {
  return array.sort(() => Math.random() - 0.5);
};

app.json = function (json) {//make a new instance of a JSON object
  return JSON.parse(JSON.stringify(json));
};

//app.gmtime('','toJSON') => "2019-09-03T09:50:39.870Z"
//app.gmtime('','ymdHis') => "190903094947"
app.gmtime = function(c,fmt){//converts local time to GMT time
  if (typeof c == 'undefined' || c === 'now' || c === '')  {
    var a = new Date();
  } else {
    var a = new Date(c);
  }
  if (typeof fmt != 'undefined' && fmt != 'ymdHis') {return a[fmt]();}
  return a.getUTCFullYear().toString().substr(2)+""+((a.getUTCMonth()+1)+"").padStart(2,"0")+""+(a.getUTCDate()+"").padStart(2,"0")+""+(a.getUTCHours()+"").padStart(2,"0")+""+(a.getUTCMinutes()+"").padStart(2,"0")+""+(a.getUTCSeconds()+"").padStart(2,"0");
}

app.call = function(opts){
opts = opts || {};
opts = window.app.var(opts,{f:'console.log',args:[],this:app});
var function_name = opts.f, args = opts.args, app = opts.this;
if (typeof function_name == 'function')
{
  return function_name.apply(app, args);
}
else if (typeof function_name == 'string')
{
var b = function_name.split('.');
if (!self.hasOwnProperty(b[0])) {return;}
var c = self[b[0]];
for (var i in b){
if (i==0) {continue;}
if (!c.hasOwnProperty(b[i])) {return;}
c = c[b[i]];
}
return c.apply(app, args);
}
}

app.smallscreen = function(){
  var w = app.$.w || window.innerWidth, h = app.$.h || window.innerHeight;
if (Math.min(w,h)<680 && Math.max(w,h)<1000) {return true;}
return false;
};

// adds clear fix after the last elem in #contents
app.clr = function(){
var m = dom.sel('#content');
var c = document.createElement('div');
c.classList.add('clr');
m.appendChild(c);
};
// mix default options with applied options in json options – extend non-mentioned params to applied one
app.var = function(options,default_options){
options = options || {};
default_options = default_options || {};
for (var key in default_options)
{
if (!options.hasOwnProperty(key)) options[key] = default_options[key];
}
return options;
};
