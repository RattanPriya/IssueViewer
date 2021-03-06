'use strict';

import APIUtils from './APIUtils';

var AuthAPI = {

  checkLoginStatus() {
    return APIUtils.get('auth/check');
  },

  login(user) {
    return APIUtils.post('auth/login', user);
  },

  logout() {
    return APIUtils.post('auth/logout');
  }

};


export default AuthAPI;