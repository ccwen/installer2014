var Reflux=Require("reflux");
var actions=Require("actions");
var testdata=[
  {dbid:"Installer",caption:"Installer",path:"installer"}
  ,{dbid:"tipitaka",caption:"Pali Tipitaka",path:"tipitaka"}
  ,{dbid:"cbeta",caption:"CBETA大正藏",path:"cbeta2014"}
  ,{dbid:"yinshun",caption:"印順法師佛學著作集",path:"yinshun"}
]

var downloaded = Reflux.createStore({
		listenables: actions,
    onGetDownload: function() {
      this.trigger(testdata);
    },
    onCheckHasUpdate:function() {
    	testdata[1].hasUpdate=true;
    	testdata[2].hasUpdate=true;
    	this.trigger(testdata);
    }
});
var availables = Reflux.createStore({

})
var stores={downloaded:downloaded, availables:availables };

module.exports=stores;