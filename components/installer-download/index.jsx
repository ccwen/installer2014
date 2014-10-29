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
  updateStatus:function() {
    var status=liveupdate.status();
    this.setState({nfile:status.nfile, filename: this.props.app.newfiles[status.nfile], downloadedByte :status.downloadedByte });
    if (status.done) {
      clearInterval(this.timer1);
      this.setState({downloading:false,done:status.done});
    }
  },
  startDownload:function() {
    liveupdate.start( this.props.app, function(success){
      if (success) {
        this.setState({downloading:true});
        this.timer1=setInterval(this.updateStatus.bind(this), 1000);
      }
    },this);
  },
  cancelDownload:function() {
    clearInterval(this.timer1);
    liveupdate.cancel();
  },
  renderDownloading:function() {
    var percent= Math.floor(100*(this.state.downloadedByte  / this.totalDownloadByte() ));
    return (
    <div>
      <div className="col-sm-offset-2 col-sm-8">
          <div>Downloading {this.props.app.title}<br/></div>
          <div className="progress">
            <div className="progress-bar" style={{"width": percent+"%"}}>{percent}%</div>
          </div>
          <div>Remaining {this.remainHumanSize()} <br/><hr/></div>
      </div>

      <div className="col-sm-2 col-sm-offset-5">
            <a onClick={this.cancelDownload} className="btn btn-danger">Cancel Download</a>
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
  renderDone:function() {
    return (
      <div>
        <div>Download Finished {this.props.app.title}</div>
        <div>Status : {this.state.done} </div>
        <div className="col-sm-2 col-sm-offset-5">
            <a onClick={this.backFromDownload} className="btn btn-success btn-lg">Ok</a><br/>
        </div>
      </div>
    );
  },
  render: function() {
    if (this.state.done) {
      return this.renderDone();
    } else if (this.state.downloading) {
      return this.renderDownloading();
    } else {
      return this.renderAsking();
    }
  }
});
module.exports=download;