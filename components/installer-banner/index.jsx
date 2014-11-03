/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var banner = React.createClass({
  getInitialState: function() {
    return {};
  },
  imageNotFound:function() {
    this.refs.banner.getDOMNode().src="banner.png";
  },
  imgclick:function() {
    this.props.action("bannerclick");
  },
  render: function() {
    return (
      <div>
        <img onClick={this.imgclick} ref="banner" className="banner" src={this.props.image}
        onError={this.imageNotFound}/>
      </div>
    );
  }
});
module.exports=banner;