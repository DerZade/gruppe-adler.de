import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import './globalComponents';

Vue.config.productionTip = false;

/* tslint:disable */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older
    return true;;
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11

    return true;
  }

  // other browser
  return false;
}
/* tslint:enable */

if (!detectIE()) {
  const ieHint = document.getElementById('IEHint');
  if (ieHint) ieHint.remove();

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
}

