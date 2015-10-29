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
    var url = "https://api.github.com/repos/rails/rails/issues?client_id=6bcb89fa65fb925edd55&client_secret=f611d5b0011b15be5f3bd404970d349af13da6a6"
    return (
      <div>
        <IssuesRoot
         source={url}
         perPage={25}/>
      </div>
    );
  }

});

export default App;