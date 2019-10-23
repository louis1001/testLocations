import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { Icon }  from 'leaflet'
import { rtdbPlugin } from 'vuefire'

import 'leaflet/dist/leaflet.css'

delete Icon.Default.prototype._getIconUrl;

Vue.config.productionTip = false

Vue.use(rtdbPlugin)

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

new Vue({
  render: h => h(App),
}).$mount('#app')
