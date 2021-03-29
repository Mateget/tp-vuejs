import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Doodle from "./views/Doodle.vue";
import Create from "./views/Create.vue";

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Home,
  },
  {
    path: "/doodle/:id",
    name: "Doodle",
    component: Doodle,
    props: true,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    props: true,
  },
  { path: '/:p(\\d+)', name: 'HomeP', component: Home, props: true },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "active",
});

export default router;
