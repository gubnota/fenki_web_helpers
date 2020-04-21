// score words
(function(window,document) {
if (window !== top) {return;}
if (!! score) {return window.app.score;}
  var score = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);

  window.app.score = score;
  return score;
})(window,document);
app.score.show = function() {
	var m = dom.sel('#content');
	var l = document.createElement('div');
	l.classList.add('left');
	var sc1 = document.createElement('div');
	sc1.setAttribute('id','score');
	sc1.innerText='0';
	var sc2 = document.createElement('div');
	sc2.setAttribute('id','score2');
	sc2.innerText='0';
	l.appendChild(sc1);
	l.appendChild(sc2);
	m.appendChild(l);
};

app.score.get = function(id){
var score_id = 'score';
if (!!id && id == 2)
{
	score_id += '2';
}
return parseInt(dom.sel('#'+score_id).innerText);
};
app.score.set = function(i,id){
var score_id = 'score';
if (!!id && id == 2)
{
	score_id += '2';
}
i = ''+i || '0';
var elem = dom.sel('#'+score_id);
elem.innerText = i;
return i;
};