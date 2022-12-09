import { createApp } from 'vue'
// import store from './store'
import Vue from 'vue';


import './style.css'
import App from './App.vue'

// 1. 引入组件样式
import 'vant/lib/index.css';

// 引入windicss
import 'virtual:windi.css'

import router from './router'
// import store from './store'





const app = createApp(App)

app.use(router)
// app.use(store)


app.mount('#app')
