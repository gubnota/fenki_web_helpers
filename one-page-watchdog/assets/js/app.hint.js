// hint words
(function(window,document) {
if (window !== top) {return;}
if (!! hint) {return window.app.hint;}
  var hint = (function(window,document) {
      var parent = window.app;//parent
          var param = {'$':parent.$};
      return param;
  })(window,document);
  window.app.hint = hint;
  return hint;
})(window,document);

app.hint.init = function (opts) {
var opts = app.var(opts,{c:app.$.c});
var c = opts.c;
app.hint.hint();
};
app.hint.hint = function(opts){
	opts = app.var(opts,{c:app.$.c,i:0});
	var c = opts.c, i = ""+opts.i;
	var ids = Object.keys(c.words);
	if (typeof i == 'undefined' || ids.indexOf(i) == -1)
	{
			i = ids[0];
	}
	var m = dom.sel('#content');
	var hint = dom.sel('#hint');
	var img = dom.sel('#hint_image');
	dom.clr('#hint');dom.clr('#hint_image');
	if (!hint){
	hint = document.createElement('div');
	hint.setAttribute('id','hint');
	m.appendChild(hint);
	}
if (!!c.current_game && c.current_game=='word' && !!c.quest[i]) {
	hint.innerText = c.quest[i];
}
	if (!img){
	img = document.createElement('div');
	img.setAttribute('id','hint_image');
	m.appendChild(img);
	}
if (c.settings.use_pictures && !! c.images[i]) {
	dom.clr('#hint_image');
	var pic = document.createElement('img');
	pic.setAttribute('src', c.images[i]);
	img.appendChild(pic);

}
//<div id="canvas" style="display: block;">a thing to control the flow</div>
//<div id="canvas_img" style="display: none"></div>
};