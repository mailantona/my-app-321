import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    isSignIn: false,
    userLoginSett: {
      email: "",
      uid: ""
    }
  },
  getters: {
    isSignIn(state) {
      return state.isSignIn
    },
    userLoginSett(state) {
      return state.userLoginSett
    }
  },
  mutations: {
    isSignInSet(state) {
      state.isSignIn = true;
    },
    userLoginSettSet (state, payload) {
      state.userLoginSett.email= payload.userLoginSettthisNew.email,
      state.userLoginSett.uid= payload.userLoginSettthisNew.uid

    }
  }
});