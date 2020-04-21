// lessons words
(function(window,document) {
if (window !== top) {return;}
if (!! lessons) {return window.app.lessons;}
  var lessons = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);
  window.app.lessons = lessons;
  return lessons;
})(window,document);
app.lessons.build = function(result)
{
  app.current_page = "lessons";
  app.menu.show();
//  result = [result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0],result[0]];
  var m = dom.sel('#content');
  var parent = document.createElement('div');
  parent.classList.add('lessons');

  result.forEach( function(element, index) {
  var l = document.createElement('div');
  l.classList.add('lesson');
  if (element.new == '1')
      l.classList.add('new');
  l.innerText = app.typeface.capitalize(element.name);
  l.setAttribute('data-id', element.id);
  l.setAttribute('data-time', element.time);

  app.tap([l],function(event){
  if (event.currentTarget.classList.contains('active')) return;
  if (!event.currentTarget.classList.contains('active'))
  {
    event.currentTarget.classList.add('active');
//      app.snd.play({url:app.snd.library.click});
      setTimeout(function(e){
        e.classList.remove('active');
      }, 200, event.currentTarget);
      app.call({f:"app.games.init", args:[app.$.user,event.target.getAttribute('data-id')]});
  }
  });

  parent.appendChild(l);
  });
m.appendChild(parent);
}
app.lessons.init = function(){
app.db.get_lessons({f:'app.lessons.build'});
};
