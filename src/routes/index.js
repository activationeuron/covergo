import welcomePage from '../pages/welcomePage.vue';
import insurancePage from '../pages/insurancePage.vue';
import summeryPage from '../pages/summeryPage.vue';
import Error from '../components/Error.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  { path: '/', component: welcomePage },
  { path: '/form', component: insurancePage },
  { path: '/summery', component: summeryPage },
  { path: '/error', component: Error },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
