/** @jsx React.DOM */

var React = require('react');

var CateringEvent = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li>Person 1</li>
          <li>Person 2</li>
          <li>Person 3</li>
          <li>Person 4</li>
          <li>Person 5</li>
        </ul>
      </div>
    );
  }
});

module.exports = CateringEvent;