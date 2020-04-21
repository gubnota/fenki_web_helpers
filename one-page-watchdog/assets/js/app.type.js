// type words
(function(window,document) {
if (window !== top) {return;}
if (!! type) {return window.app.type;}
  var type = (function(window,document) {
      var parent = window.app;//parent
      var settings = {fill:true};//fill the whole screen entirely
      var $ = {"id":parent.id}; // all app.type specific data goes here
          var param = {'$':parent.$,settings:settings};
      return param;
  })(window,document);

  window.app.type = type;
  return type;
})(window,document);
app.type.skip = function(){
app.type.pressed_skip = true;
app.type.word();
};
app.type.press = function (e) {
var c = app.$.c;
var letter = dom.sel('#word span.active');
// console.log("'"+e+"'","'"+letter.innerText.toLowerCase()+"'");

if (letter.innerText.toLowerCase() == e  
	|| (letter.innerText.toLowerCase() == '_' && e == '')
	|| (letter.innerText.toLowerCase() == '\'' && e == '’')
	)
{
letter.classList.remove('active');
	if (!!letter.nextSibling)
	{
		letter.nextSibling.classList.add('active');
	}
	else {
		if (c.mistakes > 5) c.total_mistakes++;
		c.mistakes > 5 ? app.prize.fail() : app.prize.right();
		setTimeout(app.type.word, 820);
	}
}
else{
		if (typeof c.mistakes == 'undefined')
		{
			c.mistakes = 0;
		}
	c.mistakes++;
}
//var didFindLetter = false;
};

app.type.init = function (opts) {
dom.del('#flip_styler'); app.type.pressed_skip = false;
var opts = app.var(opts,{c:app.$.c});
var c = opts.c;
app.$.current_game='type';
app.menu.show();
var s = dom.sel('#skip');s.setAttribute('data-callback','app.type.skip');
app.score.show();
app.clr();
app.keyboard.show('app.type.press');
app.type.word(opts);
};

// adds word
app.type.word = function(opts){
  opts = opts || {};
  opts = app.var(opts,{c:app.$.c,i:0});
  var c = opts.c, i = opts.i;
  var ids = Object.keys(c.words);
	c.mistakes = 0;
	if (typeof c.total_mistakes == 'undefined')
	{
		c.total_mistakes = 0;
	}
	if (typeof i == 'undefined' || ids.indexOf(i) == -1)
	{
		if (typeof c.type_pointer == 'undefined')
		{
			c.type_pointer = 0;
		}
		else {
		c.type_pointer++;
		if (c.type_pointer == ids.length){
			c.type_pointer = 0;
			if (!app.type.pressed_skip) app.score.set(app.score.get(1)+1,1);
			if (c.total_mistakes<10) {
				if (!app.type.pressed_skip) app.prize.won();
			}
			else {
				if (!app.type.pressed_skip) app.prize.fail(1);
			}

	    if (!app.type.pressed_skip) setTimeout(app.games.build, 3000);
		} 
		}
		i = ids[c.type_pointer];
	}
	var word = dom.sel('#word');
	if (!word){
	var m = dom.sel('#content');
	word = document.createElement('div');
	word.setAttribute('id','word');
	word.classList.add('center','allcaps');
	m.appendChild(word);
	}
	dom.clr('#word');
var word2 = c.words[i];
word2.split('').forEach(function(item,id){
	var letter = document.createElement('span');
	if (id == 0) {letter.classList.add('active');}
	if (item == ' ') {item = '_';}
	letter.innerText = item;
	word.appendChild(letter);
});
app.score.set(ids.length-c.type_pointer,2);
app.hint.hint({i:ids[c.type_pointer]});
//<div id="word" class="allcaps"></div>
//<span data-letter="v" class="">v</span>
};
