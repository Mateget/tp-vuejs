import { createStore } from 'vuex';
import api from './api.js';

const store = createStore({
  // l'état contient les données
  state: {
    loading: false,
    doodles: [],
    doodle: {}
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
    }
  },
  // les actions permettent de modifier l'état de façon asynchrone
  actions: {
    getDoodles({ commit }) {
      commit('loading', true);
      api.get('doodles')
        .then(response => {
          commit('doodles', response.data);
        })
        .finally(() => {
          commit('loading', false);
        });
    },
    getDoodle({ commit }, id) {
      commit('loading', true);
      api.get('doodles/'+id, { params: { expand: 'paths' } })
        .then(response => {
          commit('doodle', response.data);
        })
        .finally(() => {
          commit('loading', false);
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
      }
      
  }
});

export default store;
