import Vue from 'vue';

import ContentVue from '@/components/Content.vue';
import ContainerVue from '@/components/Container.vue';
import ErrorVue from '@/components/Error.vue';
import LoaderVue from '@/components/Loader.vue';
import TooltipVue from '@/components/Tooltip.vue';

Vue.component('Content', ContentVue);
Vue.component('Container', ContainerVue);
Vue.component('Error', ErrorVue);
Vue.component('Loader', LoaderVue);
Vue.component('Tooltip', TooltipVue);
