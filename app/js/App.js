'use strict';

import React              from 'react/addons';
import {ListenerMixin}    from 'reflux';
import {RouteHandler}     from 'react-router';

import CurrentUserActions from './actions/CurrentUserActions';
import CurrentUserStore   from './stores/CurrentUserStore';
import Header             from './components/Header';
import Footer             from './components/Footer';
import IssuesRoot             from './components/issueRoot';

var App = React.createClass({
  mixins: [ListenerMixin],

  getInitialState() {
    return {
      issues: {}
    };
  },

  render() {
    var url = "https://api.github.com/repos/rails/rails/issues"
    return (
      <div>
        <IssuesRoot source={url}/>
      </div>
    );
  }

});

export default App;