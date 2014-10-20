/** @jsx React.DOM */

//var othercomponent=Require("other"); 
/*
   installer

   install an app from website //read ksana.json for filelist

   delete local app
   update app

   for node-webkit, Android and iOS only
*/
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
  render: function() {
    return (
      <div>
        dirs {this.state.dirs.map(this.renderDir)}
      </div>
    );
  }
});
module.exports=main;