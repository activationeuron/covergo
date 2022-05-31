import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import routes from './routes/index';

createApp(App).use(routes).mount('#app');
