<template>
  <div class="container">
    <h1>Dessins</h1>
    <!--ul>
      <li v-for="doodle in doodles" :key="doodle.id">{{ doodle.name }}</li>
    </ul-->
    <nav aria-label="m-3 Page navigation example">
      <ul class="pagination">
        <li class="page-item"><router-link class="page-link" :to="{ name: 'HomeP', params: { p: Number(this.p)-1<1?1:Number(this.p)-1 } }">Previous</router-link></li>
        <li class="page-item"><router-link class="page-link" :to="{ name: 'HomeP', params: { p: 1 } }">1</router-link></li>
        <li class="page-item"><router-link class="page-link" :to="{ name: 'HomeP', params: { p: 2 } }">2</router-link></li>
        <li class="page-item"><router-link class="page-link" :to="{ name: 'HomeP', params: { p: 3 } }">3</router-link></li>
        <li class="page-item"><router-link class="page-link" :to="{ name: 'HomeP', params: { p:  Number(this.p)+1>3?Number(this.p):Number(this.p)+1 } }">Next</router-link></li>
      </ul>
    </nav>
    <div class="d-flex flex-row flex-wrap">
      <div
        class="card m-3"
        style="width: 18rem"
        v-for="doodle in doodles"
        :key="doodle.id"
      >
        <div class="card-body">
          <h5 class="card-title">{{ doodle.name }}</h5>
          <p class="card-text">Date : {{ dateCreated_at(doodle) }}</p>
          <router-link
            class="btn btn-primary"
            :to="{ name: 'Doodle', params: { id: doodle.id } }"
            >Afficher dessin</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['loading', 'doodles']),
  mounted() {
     this.getDoodles(this.p);
  },
  watch: {
    $route(to) {
      this.getDoodles(to.params.p);
    }
  },
  props: {
    p: { default: 1 }
  },
  methods: {
    dateCreated_at(doodle) {
      var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
      return new Date(doodle.created_at*1000).toLocaleDateString('fr-FR',options);
    },
    getDoodles(p) {
      this.$store.commit('page', p);
      this.$store.dispatch('getDoodles');
    }
  },
};
</script>


