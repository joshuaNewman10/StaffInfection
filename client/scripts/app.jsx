/** @jsx React.Dom */
var app = app || {};

app.FIXTURES = [
   {title: 'Investment 1', src: 'http://placehold.it/150x150'},
   {title: 'Investment 2', src: 'http://placehold.it/150x150'},
   {title: 'Investment 3', src: 'http://placehold.it/150x150'},
   {title: 'Investment 4', src: 'http://placehold.it/150x150'}
];

var Router = ReactRouter; // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

(function() {
  'use strict';
 app.init = function() {
  var App = app.components.App;
  var Login = app.components.Login;
  var Logout = app.components.Logout;
  var Dashboard = app.components.Dashboard;

 var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="dashboard" handler={Dashboard}/>
  </Route>
);

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('example'));
  });
 };
 app.loadInvestmentsFromServer = function() {
   return app.FIXTURES;
 };
  app.init();
})();

   