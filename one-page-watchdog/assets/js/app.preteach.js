(function(window,document) {
if (window !== top) {return;}
if (!! window.app.tiles.preteach) {return window.app.tiles.preteach;}
  var preteach = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);
  window.app.tiles.preteach = preteach;
  return preteach;
})(window,document);
app.tiles.preteach.skip = function(){
dom.sel('.flip-container').remove();
    if (dom.all('.flip-container').length == 0)
      app.games.build();
};
app.tiles.preteach.init = function (c) {
c = c || this.$.c; this.$.c = c;
var rows = 1, cols = 1;
//app.current_page == "preteach";
// app.log({rows:rows,cols,cols});
var no_cards = rows * cols;
var total_fruits = Object.keys(c.words).length;
var count_cells=0, cells=[];
var no_pairs = Math.min(no_cards, total_fruits);
var a2 = Object.keys(c.words);
a2 = app.shuffle(a2);
app.menu.show();
var s = dom.sel('#skip');s.setAttribute('data-callback','app.tiles.preteach.skip');
c.pairs = {};
a2.forEach(function(i,k){
    var f = document.querySelector('#content');
// if ((k)/cols%1 === 0)
// {
//     var clearfix = document.createElement('div');
//     clearfix.style.clear = 'both';
//     f.appendChild(clearfix);
// }
    // console.log({k:k,i:i,'c.words[i]':c.words[i],'c.quest[i]':c.quest[i]});
    //{k: 1, i: "2", c.words[i]: "trick", c.quest[i]: "scheme, game"}
    var g = document.createElement('div');
    g.classList.add('flip-container');
    g.setAttribute('data-id',i);
    var b = document.createElement('div');
    b.classList.add('flipper');
    var front = document.createElement('div');
    front.classList.add('front'); if (c.settings.blue_front) {front.classList.add('blue');}
    //front.innerHTML;
    var back = document.createElement('div');
    back.classList.add('back'); if (c.settings.blue_back) {back.classList.add('blue');}
    if (!!c.quest[i] || !!c.images[i] )
    {back.innerHTML = "<p><strong>"+c.words[i]+"</strong></p>";}
    else {
      back.classList.add('tile');
    }
    if (c.settings.use_pictures && c.images[i])
    {
    front.innerHTML = "<img src=\""+c.images[i]+"\" />";
    }
  else{
    var size = (c.quest[i].length>48) ? '0.6em' : '0.8em'; front.classList.add('blue');
    front.innerHTML = "<p style=\"font-size:"+size+"\"><strong>"+c.quest[i]+"</strong></p>";
    }
    b.appendChild(front);
    b.appendChild(back);
    g.appendChild(b);
    c.pairs[i] = g;
    f.appendChild(g);
  });
  app.tap(dom.all('.flip-container'),function(event){
if (dom.sel('.flip-container').classList.contains('flipped')) return;
  event.currentTarget.classList.add('flipped');
  var word_id = event.currentTarget.getAttribute('data-id');
  if (!!c.audio[word_id]){
  app.snd.play({url:c.audio[word_id]});
  }
  else if (c.settings.play_audio) {
  app.snd.play({txt:c.words[word_id]});
  }

    setTimeout(function(el){
    el.parentNode.removeChild(el);
    if (dom.all('.flip-container').length == 0)
      app.games.build();
  },1500,event.currentTarget);

  });
if (!!c.settings && c.settings.fill == true){
  window.addEventListener('orientationchange', function () {app.tiles.orientate(c,1,1);}, false);
  window.addEventListener('resize', function () {app.tiles.orientate(c,1,1);}, false);
  window.setTimeout(function(){app.tiles.orientate(c,1,1);}, 0);
  }
  this.$.с = c;
};
app.tiles.preteach.desorientate = function (c) {
  if (!c) {c = this.$.c;}
  app.$.settings.style.remove();
};
app.tiles.preteach.orientate = function (c,cols,rows) {

  c = c || this.$.c;
  cols = cols || c.settings.cols;
  rows = rows || c.settings.rows;
  // console.log(app.$.w,app.$.h);
  dom.del('#flip_styler');
  var j = document.createElement('style'); j.setAttribute('id','flip_styler');
  document.body.appendChild(j);
    c.settings.style = j;
    var width_2x2_tile,height_2x2_tile,fontsize;//,marw,marh,marmin;
      width_2x2_tile = Math.floor((app.$.w||window.innerWidth)/cols);
      height_2x2_tile = Math.floor((app.$.h||window.innerHeight)/rows);
      fontsize = Math.ceil(Math.min(app.$.w,app.$.h)/6);
    app.log({width_2x2_tile:width_2x2_tile||"auto",height_2x2_tile:height_2x2_tile||"auto"});
    j.innerHTML = [".flip-container, .front, .back {width:",width_2x2_tile,"px;height:",height_2x2_tile,"px; font-size: ",fontsize,"px;}.flip-container{margin:0!important;padding:0!important;}"].join('');
};
