// object library:
// converts links to blob: links, replaces images; forms app.$.c from add.db query result
(function(window,document) {
if (window !== top) {return;}
if (!! object) {return window.app.object;}
  var object = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);
  window.app.object = object;
  return object;
})(window,document);

app.object.init = function(c){
c = c || app.$.c; app.$.c = c;
  app.object.tasks = 0;
  app.object.pending_imgs = {};
  app.object.pending_snds = {};
  // app.object.sound_to_blob();
  app.object.images_to_blob();
  app.object.audio_to_blob();
  if (typeof c.callback != 'undefined') {
    setTimeout(function(){
    if (app.object.tasks > 1)
    app.call({f:c.callback, this: app});
    }, 200);
  }
};
//replace already existed img src="" with blob: links
app.object.images_replace = function(){
var o = dom.all('#content img');
o.forEach(function(k,i){
if (app.object.pending_imgs.hasOwnProperty(k.getAttribute('src'))){
k.setAttribute('src',app.object.pending_imgs[k.getAttribute('src')]);
}
});
};
app.object.images_to_blob = function(){
app.fetch.arr({urls:Object.values(app.$.c.images),loading:false,callback:'app.object.callback_handler',this:app.$.c.images});
};

app.object.audio_to_blob = function(){
app.fetch.arr({urls:Object.values(app.$.c.audio),loading:false,callback:'app.object.callback_handler',this:app.$.c.audio});
};

app.object.sound_to_blob = function(){
app.fetch.arr({urls:Object.values(app.snd.library),loading:false,callback:'app.object.callback_handler',this:app.snd.library});
};

// callback to replace in app.$.c.images/audio entries with its blob: counterparts
app.object.callback_handler = function(result){
app.object.tasks++;
for (var k in this){
  if (result.hasOwnProperty(this[k]) && result[this[k]] != null && result[this[k]].length>5) 
    {
      if ((this[k].indexOf('http://')!=-1 || 
        this[k].indexOf('https://')!=-1 || 
        this[k].indexOf('/')==0) && this[k]!='null' )
      this[k] = result[this[k]];
    }
 }
if (this === app.$.c.images)
{
  for (var k in result){
    if (result[k] != null)
    {
      if ((this[k].indexOf('http://')!=-1 || 
        this[k].indexOf('https://')!=-1 || 
        this[k].indexOf('/')==0) && this[k]!='null' )
      app.object.pending_imgs[k] = result[k];
    }
  }
  app.object.images_replace();
}
};

// forms app.$.c object from a db query('words')
app.object.c = function(result){

};