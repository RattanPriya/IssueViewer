'use strict';

import React              from 'react/addons';
import {ListenerMixin}    from 'reflux';
import {RouteHandler}     from 'react-router';

import CurrentUserActions from './actions/CurrentUserActions';
import CurrentUserStore   from './stores/CurrentUserStore';
import Header             from './components/Header';
import Footer             from './components/Footer';
import Sample             from './components/example';

var App = React.createClass({

  mixins: [ListenerMixin],

  getInitialState() {
    return {
      currentUser: {}
    };
  },

  _onUserChange(err, user) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ currentUser: user || {}, error: null });
    }
  },

  componentWillMount() {
    console.log('About to mount App');
  },

  componentDidMount() {
    this.listenTo(CurrentUserStore, this._onUserChange);
    CurrentUserActions.checkLoginStatus();
  },

  render() {
    return (
      <div>
        <Sample />
      </div>
    );
  }

});

export default App;