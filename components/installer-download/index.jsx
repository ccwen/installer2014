/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var liveupdate=Require("liveupdate"); 
var download = React.createClass({
  getInitialState: function() {
    return {downloading:false,downloadedByte:0};
  },
  totalDownloadByte:function() {
    var total=this.props.app.newfilesizes.reduce(function(p,c){return p+c},0);
    return total;
  },
  humanSize:function() {
    return liveupdate.humanFileSize(this.totalDownloadByte(),true);
  },
  remainHumanSize:function() {
    var remain=this.totalDownloadByte()-this.state.downloadedByte;
    return liveupdate.humanFileSize(remain,true);
  },
  backFromDownload:function() {
    this.props.action("backFromDownload");
  },
  startDownload:function() {
    this.setState({downloading:true});
  },
  renderDownloading:function() {
    return (
    <div>
      <div className="col-sm-offset-2 col-sm-8">
          <div>Downloading {this.props.app.title}<br/></div>
          <div className="progress">
            <div className="progress-bar" style={{"width": "20%"}}>2%</div>
          </div>
          <div>Remaining {this.remainHumanSize()} <br/><hr/></div>
      </div>

      <div className="col-sm-2 col-sm-offset-5">
            <a onClick={this.startDownload} className="btn btn-danger">Cancel Download</a>
        </div>
    </div>
    );
  },
  renderAsking:function() {
    return (
      <div>
        <a onClick={this.backFromDownload} className="btn btn-warning">Back</a><br/>

        App to download:{this.props.app.title} ({this.props.app.dbid}) <br/>
        Total size: <span>{this.humanSize()}</span><br/>
        <div>
            <div className="col-sm-2 col-sm-offset-5">
              <a onClick={this.startDownload} className="btn btn-primary btn-lg">Download</a>
            </div>
        </div>
        
      </div>
    );
  },
  render: function() {
    return this.renderDownloading();
    //return this.state.downloading?this.renderDownloading():this.renderAsking();
  }
});
module.exports=download;