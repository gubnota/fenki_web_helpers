// prizes surfaces onto rectangles; controls geometry, how big are prize
(function(window,document) {
if (window !== top) {return;}
if (!! prize) {return window.app.prize;}
  var prize = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$,playing:false};
      return param;
  })(window,document);

  window.app.prize = prize;
  return prize;
})(window,document);
// it - iterator: you can use the same tile several times
app.prize.won = function () {
if (app.prize.playing) return;
app.prize.playing = true;
dom.del('#win');

var prizes = ["golden_star.png",
"t-shirt.png",
"trophy_badge.png",
"uranus.png",
"congratulations.png"];
var i = Math.floor((Math.random()*prizes.length));
var prize = "/assets/img/"+prizes[i];
var b = document.createElement('div');
var c = document.createElement('img');
b.setAttribute('id','win'); c.classList.add('prize','bounceIn');
if (prize.indexOf('uranus') !== -1) {b.classList.add('space');}
if (prize.indexOf('t-shirt') !== -1) {b.classList.add('cyan');}
if (prize.indexOf('congratulations') !== -1) {b.classList.add('green');}
c.src=prize;
b.appendChild(c);
var d = app.dom('body');

setTimeout(function(){
d.appendChild(b);
app.snd.play({url:app.snd.library.lesson_complete});
setTimeout(function(){dom.del('#win');app.prize.playing=false;},2000);
},500);

};
app.prize.right = function(){
var audio = app.snd.library.right_answer;
app.snd.play({url:audio});
app.dom('#content').classList.add('flash');
setTimeout(function(){app.dom('#content').classList.remove('flash');},820);
};
app.prize.fail = function (full_round) {
full_round = full_round || false;
var audio = (full_round == true) ? app.snd.library.lesson_failed : app.snd.library.wrong_answer;
setTimeout(function(){
app.snd.play({url:audio});
app.dom('#content').classList.add('shake');
setTimeout(function(){app.dom('#content').classList.remove('shake');},820);
},500);
};