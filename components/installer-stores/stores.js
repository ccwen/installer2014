var Reflux=Require("reflux");
var actions=Require("actions");
var testdata=[
  {dbid:"Installer",title:"Installer",path:"installer"}
  ,{dbid:"tipitaka",title:"Pali Tipitaka",path:"tipitaka"}
  ,{dbid:"cbeta",title:"CBETA大正藏",path:"cbeta2014"}
  ,{dbid:"yinshun",title:"印順法師佛學著作集",path:"yinshun"}
]

var data=[];

var jsonp=function(url,callback,context) {
  var script=document.getElementById("jsonp");
  if (!script) {
    script=document.createElement('script');
    script.setAttribute('id', "jsonp");
    document.getElementsByTagName('head')[0].appendChild(script); 
  }
  window.jsonp_handler=function(data) {
    callback.apply(context,[data]);
  }
  script.setAttribute('src', url);
}

var downloaded = Reflux.createStore({
		listenables: actions,
    onGetDownload: function() {
      var apps=kfs.listApps();
      this.trigger(apps);
    },
    onCheckHasUpdate:function() {
    	//this.trigger(data);
    }
});
var availables = Reflux.createStore({

})
var stores={downloaded:downloaded, availables:availables };

module.exports=stores;