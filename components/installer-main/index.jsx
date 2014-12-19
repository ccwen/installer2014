/** @jsx React.DOM */
/*
   deploy to USB script  
   user launch installer
      create registry file on windows  (accelon.reg)
      for OSX see
      http://superuser.com/questions/548119/how-do-i-configure-custom-url-handlers-on-os-x
      open with http://appurl.org/docs

      check no network or no update available 
      switch to the app directly
*/
Require("bootstrap");
//var othercomponent=Require("other"); 
/*
   installer
   install an app from website //read ksana.json for filelist

   delete local app
   check if update available for installed app

   for node-webkit, Android and iOS only

   downloaded,
   invited by friend (accelon://)
*/ 
var Banner=Require("banner");
var Installed=Require("installed");
var stores=Require("stores");
var Download=Require("download");
var liveupdate=Require("liveupdate");
var main = React.createClass({
  getInitialState: function() {
    return {dirs:[],message:"",image:"banner.png",app:null,askingDownload:false,autoCheckUpdate:true};
  },
  checkHashTag:function(hash) {
    var idx=hash.indexOf("installfrom=");
    if (idx==-1) return false;
    var installurl=hash.substring(idx+12).replace(/.+?:/,'http:');

    var dbid=installurl.match(/\/([^\/]*?)\/?$/);
    if (installurl[installurl.length-1]!='/') installurl+='/';
    installurl+='ksana.js';
    if (dbid) {
      dbid=dbid[1];
      console.log("dbid",dbid);
      if (dbid=="master" && installurl.indexOf("rawgit.com")>-1) { //deal with hosting on rawgit
        var dbid2=installurl.match(/\/([^\/]*?)\/master/);
        if (dbid2) dbid=dbid2[1];
        console.log("dbid2",dbid);
      }
      console.log("install from",installurl);
      this.setState({message:"checking "+installurl, autoCheckUpdate:false});
      this.downloadfrom(installurl,dbid);
    }
    return true;
  },
  downloadfrom:function(installurl,dbid) {
      liveupdate.jsonp(installurl,dbid,function(app){
        console.log("asking download");
        this.askDownload(app);
      },this);
    },
  getAppCount:function() {
    return JSON.parse(kfs.listApps()).length;
  },
  componentDidMount:function() {
    if (!this.checkHashTag(window.location.hash)) {
      if (this.getAppCount()<2) {
        var installurl="http://ya.ksana.tw/nanchuan/ksana.js";
        this.setState({message:"checking "+installurl, autoCheckUpdate:false});
        this.downloadfrom(installurl,"nanchuan");  
      }
    }
    this.hash=window.location.hash;
  },
  opennew:function() {
    // window.open(   'https://github.com', '_blank' ); for browser
    var gui = nodeRequire('nw.gui'); 
    var win = gui.Window.open('http://www.github.com', {
      position: 'center',
      width: 901,
      height: 527
    });
  },
  askDownload:function(app) { //from hashtag or installed
    this.setState({message:"",askingDownload:true,app:app});
  },
  action:function() {
    var args=Array.prototype.slice.call(arguments);
    var type=args.shift();
    if (type=="select") {
      this.setState({image:"../"+args[0].dbid+"/banner.png", dbid:args[0].dbid});
    } else if (type=="askdownload") {
      this.askDownload(args[0]);
    } else if (type=="backFromDownload") {
      this.setState({askingDownload:false,app:null});  
    } else if (type=="bannerclick") {
      var app=stores.findAppById(this.state.dbid);
      if (app && app.homepage)  window.open(app.homepage);
    }
  },
  
  renderAskDownload:function() {
    return <Download app={this.state.app} action={this.action}/>
  },
  renderInstalled:function() {
    return <Installed action={this.action} autoCheckUpdate={this.state.autoCheckUpdate}/>
  },
  render: function() {
    return (
      <div className="main">
        <Banner action={this.action} image={this.state.image}/>
        <span className="message">{this.state.message}</span>
        {this.state.askingDownload?this.renderAskDownload():this.renderInstalled()} 
      </div>
    );    
  }
});
module.exports=main;