var Reflux=Require("reflux");
var actions=Require("actions");
var liveupdate=Require("liveupdate");

var apps=[];
var findAppById=function(id) {
  var r=apps.filter(function(app) { return app.dbid==id}  );
  if (r.length) return r[0];
}
var updatables = Reflux.createStore({
    listenables: actions,
    onCheckHasUpdate:function() {
      liveupdate.getUpdatables(apps,function(updatables){
        for (var i=0;i<updatables.length;i++) {
          var app=findAppById(updatables[i].dbid);
          app.hasUpdate=true;
          app.newfiles=updatables[i].newfiles;
        }
        this.trigger(apps);
      },this);
    }
})
var downloaded = Reflux.createStore({
		listenables: actions,
    onGetDownload: function() {
      apps=JSON.parse(kfs.listApps());
      this.trigger(apps);
    }
});

var stores={downloaded:downloaded,updatables:updatables};

module.exports=stores;