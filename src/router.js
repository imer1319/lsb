import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';
import Teclado from './views/Teclado.vue';
import Modulos from './views/Modulos.vue';
import Modulo from './views/Modulo.vue';

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
    path: '/modulos',
    name: 'Modulos',
    component: Modulos
  },
  {
    path: '/modulos/:id',
    name: 'Modulo',
    component: Modulo,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
