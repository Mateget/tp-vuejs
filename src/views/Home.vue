<template>
  <div class="container">
    <h1>Dessins</h1>
    <!--ul>
      <li v-for="doodle in doodles" :key="doodle.id">{{ doodle.name }}</li>
    </ul-->

    <div>
      <div class="card" v-for="doodle in doodles" :key="doodle.id">
        {{ doodle.name }}
      </div>
      <div class="card" style="width: 18rem" v-for="doodle in doodles" :key="doodle.id">
        <img class="card-img-top" src="..." alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ doodle.name }}</h5>
          <p class="card-text">
            {{ doodle. }}
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
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
  },
};
</script>
