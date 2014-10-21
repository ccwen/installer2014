/** @jsx React.DOM */
Require("bootstrap");
//var othercomponent=Require("other"); 
/*
   installer

   install an app from website //read ksana.json for filelist

   delete local app
   check if update available for installed app

   for node-webkit, Android and iOS only
*/
var logo=Require("logo");
var store=Require("store");
var about=Require("about");
var installed=Require("installed");
var main = React.createClass({
  getInitialState: function() {
    
    return {dirs:[]};
  },
  componentDidMount:function() {
    this.readDir();
  },
  readDir:function() {
    if (typeof kfs!="undefined") {
      var dirs=kfs.readDir("..").split("\uffff");
      this.setState({dirs:dirs});
    }
  },
  renderDir:function(d) {
    return <div>{d}</div>
  },
  action:function() {
    var args=Array.prototype.slice.call(arguments);
    var type=args.shift();
    if (type=="open") {
      console.log(args);
    }
  },
  render: function() {
    return (
      <div className="main">
      <logo/>
      <ul className="nav nav-tabs" role="tablist">
        <li className="active"><a href="#installed" role="tab" data-toggle="tab">Installed</a></li>
        <li><a href="#store" role="tab" data-toggle="tab">Store</a></li>
        <li><a href="#about" role="tab" data-toggle="tab">About</a></li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active" id="installed" ref="installed">
          <installed action={this.action}/>
        </div>
        <div className="tab-pane" id="store" ref="store">
          <store/>
        </div>
        <div className="tab-pane" id="about" ref="about">
          <about/>
        </div>
      </div>    
      </div>
    );
  }
});
module.exports=main;