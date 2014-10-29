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
var banner=Require("banner");
var installed=Require("installed");
var stores=Require("stores");
var download=Require("download");
var main = React.createClass({
  getInitialState: function() {
    return {dirs:[],image:"banner.png",app:null,askingDownload:false};
  },
  componentDidMount:function() {

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
    this.setState({askingDownload:true,app:app});
  },
  action:function() {
    var args=Array.prototype.slice.call(arguments);
    var type=args.shift();
    if (type=="select") {
      this.setState({image:"../"+args[0].dbid+"/banner.png"});
    } else if (type=="askdownload") {
      this.askDownload(args[0]);
    } else if (type=="backFromDownload") {
      this.setState({askingDownload:false,app:null});  
    }
  },
  
  renderAskDownload:function() {
    return <download app={this.state.app} action={this.action}/>
  },
  renderInstalled:function() {
    return <installed action={this.action}/>
  },
  render: function() {
    return (
      <div className="main">
        <banner image={this.state.image}/>
        {this.state.askingDownload?this.renderAskDownload():this.renderInstalled()}    
      </div>
    );    
  }
});
module.exports=main;