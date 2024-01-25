import { createApp } from 'vue';
import { createPinia, Pinia } from "pinia";
import './style.css';
import App from './App.vue';
import apolloClient from './apollo-client';
import VueApollo from "vue-apollo";

const app = createApp(App);
const pinia: Pinia = createPinia();
const apolloProvider = new VueApollo({ defaultClient: apolloClient });

app.provide("apollo", apolloProvider).use(pinia).mount('#app');
