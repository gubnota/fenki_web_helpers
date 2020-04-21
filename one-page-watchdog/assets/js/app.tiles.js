// tiless surfaces onto rectangles; controls geometry, how big are tiles
(function(window,document) {
if (window !== top) {return;}
if (!! tiles) {return window.app.tiles;}
  var tiles = (function(window,document) {
      var parent = window.app;//parent
      var settings = {fill:true};//fill the whole screen entirely
      var $ = {"id":parent.id}; // all app.tiles specific data goes here
          var param = {'$':parent.$,settings:settings};
      return param;
  })(window,document);

  window.app.tiles = tiles;
  return tiles;
})(window,document);
// // it - iterator: you can use the same tile several times
// app.tiles.table = function (c, it) {
//   app.menu.show();
//   if (!c) {c = app.$.c;}
//   if (!it) {it = Object.keys(c.words);}
//   c.tiles = {};
//   let tbl = dom.yield('table');
//   tbl.classList.add('g','pairs');
//   for (var i = 0; i < c.settings.rows; i++) {
//     var tr = dom.yield('tr'); tr.classList.add('smallcaps');
//     for (var j = 0; j < c.settings.cols; j++) {
//       var td = dom.yield('td'); td.classList.add('crd');//,'back'
//       var tile = app.tiles.tile(c,it[i+j]);
//       c.tiles[it[i]] = tile;
//       td.appendChild(tile);
//       tr.appendChild(td);
//    }
//    tbl.appendChild(tr);
// }
// var f = document.querySelector('#content');
// f.appendChild(tbl);
// };

app.tiles.tile = function(c, i) {
  var g = document.createElement('div');
  g.classList.add('flip-container');//g.classList.add('block');
  if (c.settings.init_back) {g.classList.add('flipped');}

  var b = document.createElement('div');
  b.classList.add('flipper');
  var d = document.createElement('div');
  d.classList.add('front');//d.classList.add('block');
  if (c.settings.blue_front) {d.classList.add('blue');}
  if (c.settings.card_back && c.settings.use_pictures && c.images[i])
  {
  d.innerHTML = "<img src=\""+c.images[i]+"\" />";
  }
  else {
  d.innerHTML = "<p><strong>"+c.words[i]+"</strong></p>";
  }
  var j = document.createElement('div');
  j.classList.add('back');
  if (c.settings.blue_back) {j.classList.add('blue');}
  if (c.settings.card_back) {
    j.classList.add('tile');
}
  else {
  if (c.settings.use_pictures && c.images[i])
  {
  j.innerHTML = "<img src=\""+c.images[i]+"\" />";
  }
else{
  j.innerHTML = app.typeface.break_by_commas(c.quest[i]);
  }
}
  b.appendChild(d);
  b.appendChild(j);
  g.appendChild(b);
  return g;
};
app.tiles.tiles = function(c, it) {
c = c || app.$.c; app.$.c = c;
it = it || Object.keys(c.words);
app.menu.show();
c.tiles = {};
    it.forEach(function(i,k){
    var g = app.tiles.tile(c,i);
    var f = document.querySelector('#content');
    c.tiles[i] = g;
    f.appendChild(g);
  });
return c;
};
app.tiles.set_orientate_event = function(c){
  window.addEventListener('orientationchange', function () {app.tiles.orientate(c);}, false);
  window.addEventListener('resize', function () {app.tiles.orientate(c);}, false);
  window.setTimeout(function(){app.tiles.orientate(c);}, 0);
};
app.tiles.touch_event_handler = function(event) {
event.currentTarget.classList.toggle('flipped');
};

app.tiles.event = function (c) {// put event listeners
  c = c||app.$.c;
  app.tap(Object.values(c.tiles),function(event){
  app.tiles.touch_event_handler(event);
  });
};

app.tiles.pairs_event = function (c) {// put event listeners
  c = c||app.$.c;
  app.tap(Object.values(c.tiles),function(event){
  app.tiles.pairs_event_handler(event);
  });
};

app.tiles.init = function (c) {
c = c || app.$.c; app.$.c = c;
c = app.tiles.tiles(c, Object.keys(c.words));
    app.tiles.set_orientate_event(c);
    app.tiles.event(c);
};

app.tiles.pairs = function(c){
c = c || app.$.c; app.$.c = c;
var rows = c.settings.rows, cols = c.settings.cols;
var no_cards = rows * cols;
var fruits,fruits2, fruits3, total_fruits, count_cells, cells, no_pairs, iterator, picked, found, locked, cell_positions;
fruits=";"; fruits2=[]; fruits3=[]; total_fruits = Object.keys(c.words).length;
count_cells = 0; iterator = 0; cells=[]; picked=[]; found=[]; locked = false; cell_positions=[];
no_pairs = Math.min(Math.floor(no_cards/2), total_fruits);

var a = Object.keys(c.words);
a = app.shuffle(a);
a = a.slice(0, no_pairs);
//console.log(a,a2);
var a2 = a.concat(a);//doubled
a2 = app.shuffle(a2);
app.menu.show();
c.tiles = {}; c.pairs = a2; c.picked=[]; c.locked=false; c.pairs_found=[];
a2.forEach(function(i,k){
var g = app.tiles.tile(c,i); // i = original index, k = length
c.tiles[k] = g;
app.dom('#content').appendChild(g);
})
app.tiles.set_orientate_event(c);
app.tiles.pairs_event(c);
};
/* returns {word_id: "2", nth: "0"} JSON object, where word_id refers to c.words.id and nth is number of the tile */
app.tiles.find_pairs_word_id = function(el){
var c = app.$.c;
var a = Object.values(c.tiles);
for (var b in a) {
  if (a[b] === el) {return {word_id:c.pairs[b],nth:b};}
}
};
app.tiles.pairs_event_handler = function(event) {
var c = app.$.c;
var el = event.currentTarget;
//app.log({picked:c.picked,el:el});
if (c.picked.length<2 && el.classList.contains('flipped') && !c.locked)
{
var found = this.find_pairs_word_id(el);
c.picked.push(found);
el.classList.toggle('flipped');
//app.log({touched:found.nth});
}
if (c.picked.length==2) {
  c.locked = true;
  // setTimeout(function(c){c.locked = false;},1000,c);

  if (c.picked[0].word_id == c.picked[1].word_id)
  {
  app.snd.play({url:app.snd.library.right_answer});
  if (!!c.audio && !!c.audio[c.picked[0].word_id]){
  app.snd.play({url:c.audio[c.picked[0].word_id]});
  }
  else if (c.settings.play_audio) {
  app.snd.play({txt:c.words[c.picked[0].word_id]});
  }
  c.pairs_found.push(c.picked[0].nth);
  c.pairs_found.push(c.picked[1].nth);

  if (c.pairs_found.length == c.pairs.length)
    {
      setTimeout(app.prize.won,1000);
      setTimeout(app.games.build, 3000);
    }

  }

  else {
    app.snd.play({url:app.snd.library.wrong_answer});
  }

setTimeout(function(c){
    var a = Object.keys(c.tiles);
    for (var b in a) {
      if (c.pairs_found.indexOf(b)==-1)
          {c.tiles[b].classList.add('flipped');}
    }
  c.locked = false;
},1000,c);
   c.picked=[];

  }

};


app.tiles.desorientate = function (c) {
  if (!c) {c = app.$.c;}
  app.$.c.settings.style.remove();
};
app.tiles.orientate = function (c,cols,rows) {

var w = app.$.w||window.innerWidth;
var h = app.$.h||window.innerHeight;
if (!!app.dom('#menu')) 
  {
    h = h-app.dom('#menu').clientHeight;
    // if(!app.$.desktop && window.orientation % 180 == 0 && !app.$.pwa) {
    // w = w-app.dom('#menu').clientHeight;
    // }
    // else {
    // h = h-app.dom('#menu').clientHeight;
    // }
  }
  c = c || app.$.c;
  cols = cols || c.settings.cols;
  rows = rows || c.settings.rows;
  //console.log(app.$.w,app.$.h);
    dom.del('#flip_styler');
    var j = document.createElement('style'); j.setAttribute('id','flip_styler');
    document.body.appendChild(j);
    c.settings.style = j;
    var width_2x2_tile,height_2x2_tile,fontsize;//,marw,marh,marmin;
      width_2x2_tile = Math.floor((w)/cols);
      height_2x2_tile = Math.floor((h)/rows);
      fontsize = Math.ceil(Math.min(w,h)/(4.5*Math.max(cols,rows)));
//    app.log({width_2x2_tile:width_2x2_tile||"auto",height_2x2_tile:height_2x2_tile||"auto"});
    j.innerHTML = [".flip-container, .front, .back {width:",width_2x2_tile,"px;height:",height_2x2_tile,"px; font-size: ",fontsize,"px;}.flip-container{margin:0!important;padding:0!important;}"].join('');
};
