/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var testdata=[
  {dbid:"tipitaka",caption:"Pali Tipitaka",path:"tipitaka",hasUpdate:true}
  ,{dbid:"cbeta",caption:"CBETA大正藏",path:"cbeta2014",hasUpdate:true}
  ,{dbid:"yinshun",caption:"印順法師佛學著作集",path:"yinshun"}
]

var installed = React.createClass({
  getInitialState: function() {
    return {
      installed: testdata, selected:0, deletable:false
    };
  },
  opendb:function(e) {
    this.setState({deletable:false});
    this.props.action("open",e.target.dataset['path']);
  },
  showDeleteButton:function() {
    this.setState({deletable:true});
  },

  select:function(e) {
    var target=e.target;
    while (target && target.nodeName!="TR")target=target.parentElement;
    this.setState({selected:target.dataset.i,deletable:false});

    //delete button is distracting, wait for 3 second
    clearTimeout(this.timer);
    this.timer=setTimeout(this.showDeleteButton.bind(this),3000);
  },
  renderUpdateButton:function(item) {
    if (item.hasUpdate) {
      return <a className="btn btn-warning">Update</a>
    }
  },
  renderDeleteButton:function(item,idx) {
    if (idx==this.state.selected && this.state.deletable) {
      return <a className="btn btn-danger pull-right">×</a>
    }
  },
  renderCaption:function(item,idx) {
    if (idx==this.state.selected) {
      return <a className="caption" onClick={this.open}>{item.caption}</a>
    } else { 
      return <span>{item.caption}</span>
    }
  },
  renderItem:function(item,idx) {
    var classes="";
    if (idx==this.state.selected) classes="info";
    return (<tr data-i={idx} onClick={this.select} key={"i"+idx} className={classes} >

      <td>{this.renderUpdateButton(item,idx)} {this.renderCaption(item,idx)}</td>
      <td>{this.renderDeleteButton(item,idx)}</td>
    </tr>);
  },
  render: function() {
    return (
      <div>
        <table  className="table table-hover">
        {this.state.installed.map(this.renderItem)}
        </table>
      </div>
    );
  }
});
module.exports=installed;