/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var stores=Require("stores"); 
var actions=Require("actions");

var installed = React.createClass({
  getInitialState: function() {
    return {
      installed: [], selected:0, deletable:false
    };
  },
  switchApp:function(path){
    ksanagap.switchApp(path);
  },
  onDownloadsChanged:function(downloads) {
    this.setState({installed:downloads});
    this.props.action("select",this.state.installed[0]);
    setTimeout(actions.checkHasUpdate,1000);
  },
  componentDidMount:function() {
    this.unsubscribe = stores.downloaded.listen(this.onDownloadsChanged);
    actions.getDownload();
  },
  componentWillUnmount:function() {
    this.unsubscribe();
  },
  opendb:function(e) {
    this.setState({deletable:false});
    var path=e.target.dataset['path'];
    this.switchApp(path);
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
    if (ksanagap.platform=="ios" || ksanagap.platform=="android") {
      this.timer=setTimeout(this.showDeleteButton,3000);
    }
    this.props.action("select",this.state.installed[target.dataset.i]);
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
      return <a className="caption" data-path={item.path} onClick={this.opendb}>{item.title}</a>
    } else { 
      return <span>{item.title}</span>
    }
  },
  renderItem:function(item,idx) {
    var classes="";
    if (item.path=="installer" && !item.hasUpdate) return null;
    if (idx==this.state.selected) classes="info";
    return (<tr data-i={idx}  onClick={this.select} key={"i"+idx} className={classes} >

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