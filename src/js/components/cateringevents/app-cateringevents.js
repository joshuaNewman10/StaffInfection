/** @jsx React.DOM */

var React = require('react');
var CateringEvent = require('./app-cateringevent.js');

var CateringEvents = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li><CateringEvent /></li>
          <li><CateringEvent /></li>
          <li><CateringEvent /></li>
        </ul>
      </div>
    );
  }
});

module.exports = CateringEvents;