// games words
(function(window,document) {
if (window !== top) {return;}
if (!! games) {return window.app.games;}
  var games = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);
  window.app.games = games;
  return games;
})(window,document);
app.games.build = function(){
app.menu.show();
app.current_page = "games";
var games = {
  0:{name:"preteach",f:"app.tiles.preteach.init"},
  1:{name:"pairs",f:"app.tiles.pairs"},
  2:{name:"type",f:"app.type.init"},
  3:{name:"word",f:"app.word.init"}
};


  var m = dom.sel('#content');
  var parent = document.createElement('div');
  parent.classList.add('games');
 
for (var e in games) {
  var l = document.createElement('div');
  l.classList.add('game');
  l.innerText = app.typeface.capitalize(games[e].name);
  l.setAttribute('data-f', games[e].f);
  l.setAttribute('data-name', games[e].name);

  app.tap([l],function(event){
  if (event.currentTarget.classList.contains('active')) return;
  if (!event.currentTarget.classList.contains('active'))
  {
    event.currentTarget.classList.add('active');
      // app.snd.play({url:app.snd.library.click});
      setTimeout(function(e){
        e.classList.remove('active');
      }, 200, event.currentTarget);
      app.current_page = event.target.getAttribute('data-name');
      app.call({f:event.target.getAttribute('data-f'), args:[],this:app});
  }
  });
  parent.appendChild(l);
}
m.appendChild(parent);
//app.object.init();
};
app.games.form_c = function(result){
  var c = {settings:{
      fill:true,//fill the tiles to the full screen
      use_pictures:true,//use pictures as backgrounds
      init_back:true,//initially flipped tiles
      rows:4,
      cols:4,
      card_back:true,//using cards back instead of c.quest field
      blue_back:false,//blue back side
      blue_front:false, //blue front side
      play_audio:true
    },words:{},quest:{},images:{},audio:{}};
  if (!! app.$.c && !! app.$.c.settings) app.var(c.settings,app.$.c.settings);

  result.forEach( function(elem, index) {
    c.words[elem.id]=elem.word;
    c.quest[elem.id]=elem.quest;
    c.audio[elem.id]=elem.audio;
    c.images[elem.id]=elem.image;
  });
  app.$.c = c;
 app.games.build();
};
app.games.init = function(user,id){
app.db.get_words({user:app.$.user,id:id,f:'app.games.form_c'});
};
