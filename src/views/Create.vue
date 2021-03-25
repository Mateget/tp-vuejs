<template>
  <div class="container">
    <h1>Nouveau Doodle</h1>
    <form>
      <div class="form-group">
        <input
          type="text"
          class="mt-3 w-25 form-control"
          :value="name"
          @input="name = $event.target.value"
        />
      </div>
      
    </form>
    <button @click='addDoodle' class="mt-3 btn btn-primary">Créer</button>
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
      name: "q",
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
      console.log(this.name)
      
      this.$store
        .dispatch("postDoodle", { name: this.name })
        .then((doodle) => {
          this.$router.push('/doodle/'+doodle.id)
        });
    },
  },
};
</script>

<style>
</style>
