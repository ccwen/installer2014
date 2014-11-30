/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var stores=Require("stores"); 
var actions=Require("actions");

var installed = React.createClass({
  getInitialState: function() {
    return {
      installed: [], selected:0, deletable:false, showextra:false
    };
  },
  switchApp:function(path){
    ksanagap.switchApp(path);
  },
  onUpdatablesChanged:function(updatables) {
    this.setState({installed:updatables});
  },
  onDownloadsChanged:function(downloads) {
    this.setState({installed:downloads});
    this.props.action("select",this.state.installed[0]);
    //wait one minute before checking update, avoid conflict with update from url
    setTimeout(actions.checkHasUpdate,30000); 
  },
  componentDidMount:function() {
    this.unsubscribe1 = stores.downloaded.listen(this.onDownloadsChanged);
    this.unsubscribe2 = stores.updatables.listen(this.onUpdatablesChanged);
    actions.getDownload();
  },
  componentWillUnmount:function() {
    this.unsubscribe1();
    this.unsubscribe2();
  },
  opendb:function(e) {
    this.setState({deletable:false});
    var path=e.target.dataset['path'];
    this.switchApp(path);
  },
  showExtraInfo:function() {
    if (ksana.platform=="ios" || ksana.platform=="android") {
      this.setState({deletable:true});
    }
    this.setState({showextra:true});
  },
  select:function(e) {
    var target=e.target;
    while (target && target.nodeName!="TR")target=target.parentElement;
    this.setState({selected:target.dataset.i,deletable:false,showextra:false});

    //delete button is distracting, wait for 3 second
    clearTimeout(this.timer);
  
    setTimeout(this.showExtraInfo,3000);
    this.props.action("select",this.state.installed[target.dataset.i]);
  },
  askDownload:function(e) {
    var n=e.target.dataset.n;
    var item=this.state.installed[n];
    this.props.action("askdownload",item);
  },
  renderUpdateButton:function(item,idx) {
    if (item.hasUpdate) {
      return <a data-n={idx} onClick={this.askDownload} className="btn btn-warning">Update</a>
    }
  },
  deleteApp:function(e) {
    var path=e.target.dataset['path'];
    if (path && path!="installer") kfs.deleteApp(path);
  },
  renderDeleteButton:function(item,idx) {
    if (idx==this.state.selected && this.state.deletable && item.path!="installer") {
      return <a data-path={item.path} onClick={this.deleteApp} className="btn btn-danger pull-right">×</a>
    }
  },
  renderDate:function(item,idx) {
    if (idx==this.state.selected && this.state.showextra) {
      return <span>{item.date}</span>
    }
  },
  renderCaption:function(item,idx) {
    if (idx==this.state.selected) {
      return <button title={item.version +"-"+ item.build} className="caption" data-path={item.path} onClick={this.opendb}>{item.title}</button>
    } else { 
      //https://github.com/facebook/react/issues/134
      return <a href="#" onClick={this.select}>{item.title}</a>
    }
  },
  renderItem:function(item,idx) {
    var classes="";
    if (item.path=="installer" && !item.hasUpdate) return null;
    if (idx==this.state.selected) classes="info";
    return (<tr data-i={idx}  onClick={this.select} key={"i"+idx} className={classes} >
      <td>{this.renderCaption(item,idx)} {this.renderUpdateButton(item,idx)}</td>
      <td>{this.renderDate(item,idx)} {this.renderDeleteButton(item,idx)}</td>
    </tr>);
  },
  renderAccelon:function() {
    //if (this.state.installed && this.state.installed.length<2)  
    return ( <footer className="footer accelon text-center"><br/><br/><hr/>
      Powered by <a onClick={this.goWebsite} href="#">Accelon</a>, Ksanaforge 2014 
      </footer> );
    //else return <span></span>;
  },
  goWebsite:function() {
    window.open("http://accelon.github.io");
  },
  renderEmpty:function() {
    if (this.state.installed.length) {
      return ( <span></span> );
    } else {
      return ( <div>
        <a onClick={this.goWebsite} href="http://accelon.github.io">Get Accelon Database</a>
      </div> );
    }
  },
  render: function() {
    return (
      <div>
      <div className="row"> 
        <div className="col-md-2"></div>
        <div className="col-md-10">
        <table className="table table-hover">
          {this.state.installed.map(this.renderItem)}
        </table> 
          {this.renderEmpty()}
        </div>
      </div>
              {this.renderAccelon()}
      </div>

    );
  }
});
module.exports=installed;