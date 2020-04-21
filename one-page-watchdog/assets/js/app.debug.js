/*
<div class="debugger_close">&times;</div>
<div id="debugger"style="display: none">
  <div class="contents"></div>
  <div class="debugger_close">&times;</div>
</div>
*/


//
// app.add('debugger',(function (window,document) {
// })(window,document));
// // app.debugger();
// var a = document.getElementsByTagName('body');
// document.body.appendChild(el1);
// document.body.appendChild(el2);
window.addEventListener('load', function() {
  if(!window.debug) return;
  var el1 = document.createElement('div');
  el1.className = 'debugger_close';
  el1.innerHTML = '&times;';
  var el2 = document.createElement('div');
  el2.setAttribute('id','debugger');
  el2.style.display='none';
  var el3 = document.createElement('div');
  el3.classList.add('contents');
  var el4 = el1.cloneNode(true);
  el4.innerHTML = '&times;';
  var el5 = document.createElement('span');
  el5.innerHTML = 'window.app_ver = '+ window.app_ver;
  el5.setAttribute('style','bottom:0px;position:fixed;color: #093656');
  el2.appendChild(el3);
  el2.appendChild(el5);
  el2.appendChild(el4);
  document.body.appendChild(el1);
  document.body.appendChild(el2);
app.tap(document.getElementsByClassName('debugger_close'),function(el) {
var a = document.getElementById('debugger');
if (a.style.display === 'none') {a.style.display='block';}
else {a.style.display='none';}
});

});

app.log = function (msg) { if (!window.debug) {console.log(msg); return;}
var out = "";
if (typeof(msg) == "object"){
if (Object.keys(msg).length>0){
Object.keys(msg).forEach(function(i,k){
  if (k == 0) {out += '{';}
    out +='<span style="color:#069; font-weight:bold">' + i + '</span>: <span style="color:#906">' + JSON.stringify(msg[i]);
    if (k == (Object.keys(msg).length-1)) {out +="</span>}";}
     else {out += "</span>, ";}
    if (typeof(msg[i]) == "object") out+="<br>\n";
});
}
else {
  out+=msg.toString();
}
}
else {out = app.typeface.htmlentities(msg);}
var time = new Date().toJSON();
var a = app.dom('#debugger .contents');
if (!!a){
a.innerHTML = a.innerHTML + time + " " + out + "<br>\n";
}
};
window.addEventListener('load', function() {
});