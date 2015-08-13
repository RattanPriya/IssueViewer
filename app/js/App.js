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
    var url = "https://api.github.com/repos/rails/rails/issues?client_id=bb0c9dc0faf5bd14aa1e&client_secret=190a9a2c8921ef9845194d8fe9e3f848d118bf70"
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