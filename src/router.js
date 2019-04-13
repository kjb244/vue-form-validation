import Vue from 'vue'
import Router from 'vue-router'
import Route1 from './views/Route1.vue';
import Route2 from './views/Route2.vue';
import Route3 from './views/Route3.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      name: 'route1',
      component: Route1
    },
    {
        path: '/route1',
        name: 'route1',
        component: Route1
    },
    {
      path: '/route2',
      name: 'route2',
      component: Route2
    },
    {
      path: '/route3',
      name: 'route3',
      component: Route3
    }
  ]
})
