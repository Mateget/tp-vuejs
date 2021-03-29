import { createStore } from 'vuex';
import api from './api.js';

const store = createStore({
  // l'état contient les données
  state: {
    loading: false,
    doodles: [],
    doodle: {},
    page: 1
  },
  // les mutations permettent de modifier l'état de façon synchrone
  mutations: {
    loading(state, loading) {
      state.loading = loading;
    },
    doodles(state, doodles) {
      state.doodles = doodles;
    },
    doodle(state, doodle) {
      state.doodle = doodle;
    },
    page(state, page) {
      state.page = page;
    }
  },
  // api.get('doodles', { params: { 'per-page': 5 } });
  // les actions permettent de modifier l'état de façon asynchrone
  actions: {
    getDoodles({ commit,state }) {
      commit('loading', true);
      let parametres = { 'per-page': 12, page:state.page }
      //if(parms.page!=null) parametres.page = parms.page
      console.log(parametres);
      api.get('doodles', { params: parametres })
        .then(response => {
          console.log(response.headers);
          commit('doodles', response.data);
        })
        .finally(() => {
          commit('loading', false);
        });
    },
    getDoodle({ commit }, id) {
      commit('loading', true);
      return new Promise((resolve, reject) => {
        api.get('doodles/' + id, { params: { expand: 'paths' } })
        .then(response => {
          commit('doodle', response.data);
          resolve(response.data);
        }).catch(error => {
          reject(error);
        })
        .finally(() => {
          commit('loading', false);
        });
      });
    },
    postDoodle({ commit }, doodle) {
      commit('loading', true);
      return new Promise((resolve, reject) => {
        api.post('doodles', doodle).then(response => {
          resolve(response.data);
        }).catch(error => {
          reject(error);
        }).finally(() => {
          commit('loading', false);
        });
      });
    },
    postPath({ commit }, path) {
      commit('loading', true);
      return new Promise((resolve, reject) => {
        api.post('paths', path)
          .then(response => {
            resolve(response.data);
          }).catch(error => {
            reject(error);
          }).finally(() => {
            commit('loading', false);
          });
      });
    }

  }
});

export default store;
