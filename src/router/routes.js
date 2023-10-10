import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue'; // Adjust the path as needed
import CustomDesign from '@/components/CustomDesign.vue'; // Adjust the path as needed

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/custom-design',
    name: 'CustomDesign',
    component: CustomDesign
  }
];

const router = new VueRouter({
  mode: 'history', // Use history mode for clean URLs (requires server configuration)
  routes
});

export default router;