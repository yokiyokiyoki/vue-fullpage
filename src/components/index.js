//入口
import fullpage from "./fullpage.vue";

export default {
  install: function(Vue) {
    Vue.component("v-fullpage", fullpage);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component("v-fullpage", fullpage);
}
