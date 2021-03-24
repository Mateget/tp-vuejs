<template>
  <div class="container">
    <h1>Nouveau Doodle</h1>
    <p>Nom</p>
    <input />
  </div>
</template>

<script>

export default {
  props: ["id"],
  data() {
    return {
      vbWidth: 0,
      vbHeight: 0,
      mousedown: false,
      path: {
        stroke: "#000000",
        stroke_width: 1,
        fill: "none",
        d: "",
      },
    };
  },
  methods: {
    addDoodle() {
      this.$store .dispatch("postDoodle", newDoodle).then((doodle) => {});
    },
  },
};
</script>

<style>

</style>
