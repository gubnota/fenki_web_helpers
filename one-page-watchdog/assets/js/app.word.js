// word words
(function(window,document) {
if (window !== top) {return;}
if (!! word) {return window.app.word;}
  var word = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);

  window.app.word = word;
  return word;
})(window,document);
app.word.press = function (e) {
var c = app.$.c;
var letters = dom.all('#word span');
var found = false; var finished = false;
[].forEach.call(letters,function(element, index) {
  var lowercase_letter = element.getAttribute('data-letter').toLowerCase();
  var letter = element.getAttribute('data-letter');
if (lowercase_letter == e || 
  (lowercase_letter == '_' && e == '') || 
  (lowercase_letter == '\'' && e == '’')
  )
{
  found = true;
  element.classList.add('active');
  element.innerText  = element.getAttribute('data-letter');
    if (dom.all('#word span').length == dom.all('#word span.active').length)
    {
      finished = true;
    }
  }
});

  if (!found) {
      if (typeof c.mistakes == 'undefined')
      {
        c.mistakes = 0;
      }
    c.mistakes++;
  }
if (finished)
  {
    if (c.mistakes <= 5) app.score.set(app.score.get(1)+1,1);
    if (c.mistakes > 5) {c.total_mistakes++; app.prize.fail();} else {app.prize.right();}
    setTimeout(app.word.word, 820);
  }
};

app.word.init = function (opts) {
dom.del('#flip_styler'); app.word.pressed_skip = false;
opts = opts || {};
opts = app.var(opts,{c:app.$.c});
var c = opts.c;
c.current_game='word';
app.menu.show();
var s = dom.sel('#skip');s.setAttribute('data-callback','app.word.skip');
app.score.show();
app.clr();
app.keyboard.show('app.word.press');
app.keyboard.sticky_keys = true;
app.word.word(opts);
};

app.word.skip = function(){
app.word.pressed_skip = true;
app.word.word();
};

// adds word
app.word.word = function(opts){
  app.keyboard.unstick();
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
    if (typeof c.word_pointer == 'undefined')
    {
      c.word_pointer = 0;
    }
    else {
    c.word_pointer++;
    if (c.word_pointer == ids.length){
      c.word_pointer = 0;
            if (c.total_mistakes<10) {
          if (!app.word.pressed_skip) app.score.set(app.score.get(1)+1,1);
          if (!app.word.pressed_skip) app.prize.won();
    if (!app.word.pressed_skip) setTimeout(app.games.build, 3000);
            }
          else {
           if (!app.word.pressed_skip) app.prize.fail(1);
    if (!app.word.pressed_skip) setTimeout(app.games.build, 3000);
          }
    } 
    }
    i = ids[c.word_pointer];
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
  if (item == ' ') {item = '_';}
  letter.innerText = '_';
  letter.setAttribute('data-letter',item);
  word.appendChild(letter);
});
app.score.set(ids.length-c.word_pointer,2);
app.hint.hint({i:ids[c.word_pointer]});
};