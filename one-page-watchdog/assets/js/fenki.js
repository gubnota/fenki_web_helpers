(function(window) {
"use strict";
if (window !== top) {return;}
if (!! app) {return window.app;}
var document = window.document;
  var app = (function() {
      var id = Math.ceil(Math.random() * 1000); //unique id
      var lang = 'en';
      var url = "";
      var keys = ['Reload','Answer','Top','Prev','Next','Menu'];
      var dic =
      {
      	'en':{"Reload":'Reload',"Answer":'Answer',"Top":'Top',"Prev":'Prev',"Next":'Next',"Menu":'Menu'}
      };
      var cards = [];
      function add(className,classFunction){//extend Library
        app[className] = classFunction;
      }
      function del(className){//remove property
        delete app[className];
      }
          var param = {'$':{'id':id,'lang':lang,'keys':keys,'dic':dic},'add':add,"del":del};

      return param;
  })();

  window.app = app;
  return app;
})(this);
