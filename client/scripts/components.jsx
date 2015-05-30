/** @jsx React.Dom */
var Router = ReactRouter; // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var app = app || {};


app.components = app.components || {};
(function() {

  var App = app.components.App = React.createClass({
    getInitialState: function () {
      return {
        loggedIn: auth.loggedIn()
      };
    },

    setStateOnAuth: function (loggedIn) {
      this.setState({
        loggedIn: loggedIn
      });
    },

    componentWillMount: function () {
      auth.onChange = this.setStateOnAuth;
      auth.login();
    },

    render: function () {
      var loginOrOut = this.state.loggedIn ?
        <Link to="logout">Log out</Link> :
        <Link to="login">Sign in</Link>;
      return (
        <div>
          <ul>
            <li>{loginOrOut}</li>
            <li><Link to="dashboard">Dashboard</Link> (authenticated)</li>
          </ul>
          <RouteHandler/>
        </div>
      );
    }
  });
  var Authentication = {
    statics: {
      willTransitionTo: function (transition) {
        var nextPath = transition.path;
        if (!auth.loggedIn()) {
          transition.redirect('/login', {}, { 'nextPath' : nextPath });
        }
      }
    }
  };

  var Dashboard = app.components.Dashboard = React.createClass({
    mixins: [ Authentication ],

    render: function () {
      var token = auth.getToken();
      return (
        <div>
          <h1>Dashboard</h1>
          <p>You made it!</p>
          <p>{token}</p>
          <CalendarControlComponent/>
          <ControlComponent/>
          <ul>
            <li><EventsComponent/></li>
            <li><EventsComponent/></li>
            <li><EventsComponent/></li>
          </ul>
        </div>
      );
    }
  });


  var Logout = app.components.Logout = React.createClass({
    componentDidMount: function () {
      auth.logout();
    },

    render: function () {
      return <p>You are now logged out</p>;
    }
  });

  var Login = app.components.Login =  React.createClass({
    mixins: [Router.Navigation, State],

    getInitialState: function () {
      return {
        error: false
      };
    },

    handleSubmit: function (event) {
      event.preventDefault();
      var nextPath = this.getQuery().nextPath;
      var email = this.refs.email.getDOMNode().value;
      var pass = this.refs.pass.getDOMNode().value;
      auth.login(email, pass, function (loggedIn) {
        if (!loggedIn)
          return this.setState({ error: true });

        if (nextPath) {
          this.replaceWith(nextPath);
        } else {
          this.replaceWith('dashboard');
        }
      }.bind(this));
    },

    render: function () {
      var errors = this.state.error ? <p>Bad login information</p> : '';
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
          <label><input ref="pass" placeholder="password"/></label> (hint: password1)<br/>
          <button type="submit">login</button>
          {errors}
        </form>
      );
    }
  });

  var EventsComponent = app.components.EventsComponent = React.createClass({

    render: function() {
      return (
        <div>
          <ul>
            <li><EventComponent/></li>
            <li><EventComponent/></li>
            <li><EventComponent/></li>
          </ul>
        </div>
      );
    }

  });

  var EventComponent = app.components.EventComponent = React.createClass({

    render: function() {
      return (
        <div>
          <ul>
            <li><StaffComponent/></li>
            <li><StaffComponent/></li>
            <li><StaffComponent/></li>
            <li><StaffComponent/></li>
          </ul>
        </div>
      );
    }

  });

  var StaffComponent = app.components.StaffComponent = React.createClass({
    
    render: function() {
      return (
        <div>
          <p>Josh</p><img src="http://www.placehold.it/15x15"/>
        </div>
      );
    }
  });

  var CalendarControlComponent = app.components.CalendarControlComponent = React.createClass({
    render: function() {
      return (
        <div>
          <h1>Employee List</h1>
          <p>Current Date</p>
        </div>
      );
    }
  });

  var ControlComponent = app.components.ControlComponent = React.createClass({
    render: function() {
      return (
        <div>
          <img src="htpp://placehold.it/50x50"/>
          <ul>
            <li><p>Add Event</p></li>
            <li><img src="http://placehold.it/25x25"/><p>List All Events</p></li>
            <li><img src="http://placehold.it/25x25"/><p>Event Health</p></li>
            <li><img src="http://placehold.it/25x25"/><p>List Employees</p></li>
            <li><img src="http://placehold.it/25x25"/><p>Approval Flow</p></li>
          </ul>
        </div>
      );
    }

  });
  

})();