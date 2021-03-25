<template>
  <div class="container">
    <h1>Nouveau Doodle</h1>
      <div class="form-group">
        <input
          type="text"
          class="mt-3 w-25 form-control"
          :value="name"
          @input="name = $event.target.value"
          required
        />
      </div>
    <button @click='addDoodle' class="mt-3 btn btn-primary">Créer</button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addDoodle() {      
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
