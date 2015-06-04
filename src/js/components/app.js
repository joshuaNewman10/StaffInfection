/** @jsx React.DOM */
var React = require('react');

var Template = require('./app-template.js');
var CateringEvents = require('./cateringevents/app-cateringevents.js');

var App = React.createClass({
  render: function() {
    return (
        <Template>
          <h1>App Component</h1>
          <CateringEvents />
        </Template>
    );
  }
});


module.exports = App;

