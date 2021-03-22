<template>
  <div class="container">
    <svg xmlns="http://www.w3.org/2000/svg">
      <path
        v-for="path in doodle.paths"
        :key="path.id"
        :stroke="path.stroke"
        :stroke-width="path.stroke_width"
        :fill="path.fill"
        :fill-opacity="path.fill_opacity"
        :d="path.d"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      loading: false,
      doodle: null,
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
