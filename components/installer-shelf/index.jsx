/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var shelf = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div>
        Rendering shelf
      </div>
    );
  }
});
module.exports=shelf;