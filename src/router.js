import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';
import Teclado from './views/Teclado.vue';
import Aprendizaje from './views/Aprendizaje.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buscador',
    name: 'Search',
    component: Search
  },
  {
    path: '/teclado',
    name: 'Teclado',
    component: Teclado
  },
  {
    path: '/aprendizaje',
    name: 'Aprendizaje',
    component: Aprendizaje
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
