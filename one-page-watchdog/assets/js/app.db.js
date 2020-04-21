// helps to format words/phrases and to divide text by commas, semmicolons
(function(window,document) {
if (window !== top) {return;}
if (!! db) {return window.app.db;}
  var db = (function(window,document) {
      var parent = window.app;//parent
      var settings = {fill:true};//fill the whole screen entirely
          var param = {'$':parent.$,settings:settings};
      return param;
  })(window,document);

  window.app.db = db;
  return db;
})(window,document);

app.db.get_lessons_handler = function(result)
{
  result.forEach( function(element, index) {
app.log(element, index);
  });
};
app.db.get_lessons = function(opts)
{
opts = app.var(opts,{f:'app.db.get_lessons_handler'});
if (typeof opts.user != 'string') 
  {
    opts.user = window.location.pathname;
    opts.user = opts.user.substr(opts.user.lastIndexOf('/')+1);
  }
if (opts.user == '') opts.user = 'guest';
app.$.user=opts.user;
var title = document.head.querySelector('title');
var name = (opts.user !== 'guest') ? app.typeface.capitalize(opts.user) : opts.user;
title.innerText = "Welcome, "+name+"!";
app.fetch.arr({urls:['/db.php?u='+opts.user+'&f=lessons&t='+new Date().getTime()],callback:opts.f,this:app,show:0,type:"json"});
};


app.db.get_words_handler = function(result)
{
  result.forEach( function(element, index) {
app.log(element, index);
  });
};
app.db.get_words = function(opts)
{
opts = app.var(opts,{f:'app.db.get_words_handler'});
  var id = parseInt(opts.id);
  if (isNaN(id)) return;
if (typeof opts.user != 'string') 
  {
    opts.user = window.location.pathname;
    opts.user = opts.user.substr(opts.user.lastIndexOf('/')+1);
  }
app.fetch.arr({urls:['/db.php?u='+opts.user+'&f=words&id='+id+"&t="+new Date().getTime()],callback:opts.f,this:app,show:0,type:"json"});
};
