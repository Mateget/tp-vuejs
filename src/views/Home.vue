<template>
  <div class="container">
    <h1>Dessins</h1>
    <!--ul>
      <li v-for="doodle in doodles" :key="doodle.id">{{ doodle.name }}</li>
    </ul-->

    <div class="d-flex flex-row flex-wrap">
      <div
        class="card m-3"
        style="width: 18rem"
        v-for="doodle in doodles"
        :key="doodle.id"
      >
        <div class="card-body">
          <h5 class="card-title">{{ doodle.name }}</h5>
          <p class="card-text">
            Date : {{ dateCreated_at(doodle) }}
          </p>
          <router-link class="btn btn-primary" :to="{ name: 'Doodle', params: { id: doodle.id } }">Afficher dessin</router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      loading: false,
      doodles: [],
    };
  },
  mounted() {
    this.refreshDoodles();
  },
  methods: {
    refreshDoodles() {
      this.loading = true;
      api
        .get("doodles")
        .then((response) => {
          this.doodles = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    dateCreated_at(doodle) {
      var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
      return new Date(doodle.created_at*1000).toLocaleDateString('fr-FR',options);
    },
  },
};
</script>
