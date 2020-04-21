// helps to format words/phrases and to divide text by commas, semmicolons
(function(window,document) {
if (window !== top) {return;}
if (!! typeface) {return window.app.typeface;}
  var typeface = (function(window,document) {
      var parent = window.app;//parent
      var settings = {fill:true};//fill the whole screen entirely
          var param = {'$':parent.$,settings:settings};
      return param;
  })(window,document);

  window.app.typeface = typeface;
  return typeface;
})(window,document);
app.typeface.htmlentities = function(text)
{
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
app.typeface.break_by_commas = function(text){
var edited = "";
if (text.indexOf(';') !== -1)
{
	edited = '<ul><li>';
	edited += text.split(';').join('</li> <li>');
	edited += '</li></ul>';
}
else if (text.indexOf(',') !== -1)
{
	edited = '<ul><li>';
	edited += text.split(',').join('</li> <li>');
	edited += '</li></ul>';

}
else {edited = '<p>'+text+'</p>';}
return edited;
};

app.typeface.capitalize = function(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
};