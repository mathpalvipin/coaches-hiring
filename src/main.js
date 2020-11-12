import { createApp ,defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js'
import basecard from './components/UI/basecard.vue';
import basebutton from './components/UI/basebutton.vue';
import basebadge from './components/UI/basebadge.vue';
import basespinner from './components/UI/basespinner.vue';
//import basedailog from './components/UI/basedailog.vue';
const basedailog = defineAsyncComponent(()=>import('./components/UI/basedailog.vue'));

const app=createApp(App);
app.component('base-card',basecard);
app.component('base-button',basebutton);
app.component('base-badge',basebadge);
app.component('base-spinner',basespinner);
app.component('base-dailog',basedailog);
app.use(router);
app.use(store);
app.mount('#app');
