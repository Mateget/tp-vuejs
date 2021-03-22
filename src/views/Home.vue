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
            <!--{{ dateCreated_at(doodle) }}-->
            Date : {{ doodle.createDate }}
          </p>
          <a href="#" class="btn btn-primary">Link</a>
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
          var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
          this.doodles.forEach( (doodle) => {
              doodle.createDate = new Date(doodle.created_at*1000).toLocaleDateString('fr-FR',options);
          })
        })
        .finally(() => {
          this.loading = false;
        });
    },
    dateCreated_at(doodle) {
      console.log(doodle.created_at);
      var date = new Date(doodle.created_at);
      console.log(date);
      return date.toDateString;
    },
  },
};
</script>
