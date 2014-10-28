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
var main = React.createClass({
  getInitialState: function() {
    return {dirs:[],image:"banner.png"};
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
  //<a onClick={this.opennew}>google</a>
  action:function() {
    var args=Array.prototype.slice.call(arguments);
    var type=args.shift();
    if (type=="select") {
      this.setState({image:"../"+args[0].dbid+"/banner.png"});
    }
  },
  render: function() {
    return (
      <div className="main">
        <banner image={this.state.image}/>
        <installed action={this.action}/>
        
      </div>
    );
  }
});
module.exports=main;