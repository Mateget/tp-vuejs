<template>
  <div class="container">
    <div class="d-flex flex-row">
      <h2 class="col-3">{{ doodle.name }}</h2>
      <div class="col-3">
      <label>Color</label>
      <input
        class="form-control"
        type="color"
        @input="path.stroke = $event.target.value"
        :value="path.stroke"
      />
      </div>
      <div class="col-1"></div>
      <div class="col-3 d-flex flex-column">
      <label>Stroke width</label>
      <input
        @input="path.stroke_width = $event.target.value"
        :value="path.stroke_width"
        type="range"
        min="1"
        max="15"
        step="0.2"
        class="custom-range"
      />
      </div>
    </div>
    <svg
      ref="svg"
      @mousedown="onMousedown"
      @mouseup="onMouseup"
      @mouseleave="onMouseup"
      @mousemove="onMousemove"
      :viewBox="viewBox"
      xmlns="http://www.w3.org/2000/svg"
    >
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
      <path
        :stroke="path.stroke"
        :stroke-width="path.stroke_width"
        :fill="path.fill"
        :d="path.d"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["loading", "doodle"]),
    viewBox() {
      const x = -this.vbWidth / 2;
      const y = -this.vbHeight / 2;
      return `${x} ${y} ${this.vbWidth} ${this.vbHeight}`;
    },
  },
  mounted() {
    this.$store.dispatch("getDoodle", this.id);
    this.onResize();

    window.addEventListener("resize", this.onResize);
  },
  unmounted() {
    this.$store.commit("doodle", {});
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      const r = this.$refs.svg.getBoundingClientRect();
      this.vbWidth = r.width;
      this.vbHeight = r.height;
    },
    onMousedown(e) {
      this.mousedown = true;
      this.updateMouseCoordinates(e);
      // on commence la ligne
      this.path.d = `M${this.mx} ${this.my}`;
    },
    onMousemove(e) {
      if (this.mousedown) {
        this.updateMouseCoordinates(e);
        // on continue la ligne
        this.path.d += `L${this.mx} ${this.my}`;
      }
      //console.log(this.path.d);
    },
    onMouseup() {
      if (this.mousedown) {
        let newpath = Object.assign({}, this.path);

        newpath.id_doodle = this.id;
        this.$store.dispatch("postPath", newpath).then(() => {
          this.$store.dispatch("getDoodle", this.id).then(() => {
            this.path.d = "";
          });
        });
      }
      this.mousedown = false;
    },
    updateMouseCoordinates(e) {
      // coordonnées de la souris
      this.mx = e.clientX - this.vbWidth / 2;
      this.my = e.clientY - this.vbHeight / 2;
    },
  },
};
</script>

<style>
svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
