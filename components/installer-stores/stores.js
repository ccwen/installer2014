var Reflux=Require("reflux");
var actions=Require("actions");
var testdata=[
  {dbid:"Installer",title:"Installer",path:"installer"}
  ,{dbid:"tipitaka",title:"Pali Tipitaka",path:"tipitaka"}
  ,{dbid:"cbeta",title:"CBETA大正藏",path:"cbeta2014"}
  ,{dbid:"yinshun",title:"印順法師佛學著作集",path:"yinshun"}
]
var apps=[];

var downloaded = Reflux.createStore({
		listenables: actions,
    onGetDownload: function() {
      apps=JSON.parse(kfs.listApps());
      this.trigger(apps);
    },
    onCheckHasUpdate:function() {
      //installed apps local json
      //apps for each
      //task queue
      //retrieve ksana.json from remote website
      //compare the time stamps
      //download changed file

    	//this.trigger(data);
    }
});

var stores={downloaded:downloaded};

module.exports=stores;