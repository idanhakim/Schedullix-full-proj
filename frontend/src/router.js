import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home-page.vue'
import login from './views/login-page.vue'
import signUp from './views/signup-page.vue'
import editPage from './views/edit-page.vue'
import preview from './views/preview-page.vue'
import bussinessProfile from './views/bussiness-profile-page.vue'
import bussinessCalender from './views/bussiness-calender-page.vue'




Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/:userId/editPage',
      name: 'editPage',
      component: editPage
    },
    {
      path: '/app/:userId/preview',
      name: 'preview',
      component: preview
    },
    {
      path: '/:userId/bussinessProfile',
      name: 'bussinessProfile',
      component: bussinessProfile
    },
    {
      path: '/:userId/bussinessCalender',
      name: 'bussinessCalender',
      component: bussinessCalender
    },
    {
      path: '/:businessName',
      name: 'publishPage',
      component: editPage
    },
    {
      path: '/*',
      redirect: '/'
    },
  ]
})