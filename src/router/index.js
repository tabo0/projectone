import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login'
import Main from '../views/main'
import List from '../views/list'
import Test from '../views/test'
import Chat from '../views/chat'
import Register from '../views/register'
import Image from '../views/image'
import ShowFile from '../views/showFile'
import UserDetail from '../views/userDetail'
import Video from '../views/video'
import Select from '../views/user/select'
import getShareFileByCode from '../views/user/getShareFileByCode'
import myShare from '../views/user/myShare'
import addDynamic from '../views/user/addDynamic'
import dynamic from '../views/user/dynamic'
import managerLogin from '../views/manager/managerLogin'
import log from '../views/manager/log'
import checkFile from '../views/manager/checkFile'
import finishFile from '../views/manager/finishFile'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/login',//登录页面的路由要定义为/，这样在项目运行时就可以直接加载
      name: 'login',
      component: Login
    },
    {
      path: '/main',//登录页面的路由要定义为/，这样在项目运行时就可以直接加载
      name: 'main',
      component: Main
    },
    {
      path: '/list',//登录页面的路由要定义为/，这样在项目运行时就可以直接加载
      name: 'list',
      component: List
    },
    {
      path: '/test',//登录页面的路由要定义为/，这样在项目运行时就可以直接加载
      name: 'test',
      component: Test
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/image',
      name: 'image',
      component: Image
    },
    {
      path: '/showFile',
      name: 'showFile',
      component: ShowFile
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: UserDetail
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '/select',
      name: 'select',
      component: Select
    },
    {
      path: '/getShareFileByCode/:code',
      name: 'getShareFileByCode',
      component: getShareFileByCode
    },
    {
      path: '/myShare',
      name: 'myShare',
      component: myShare
    },
    {
      path: '/addDynamic',
      name: 'addDynamic',
      component: addDynamic
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: dynamic
    },
    {
      path: '/managerLogin',
      name: 'managerLogin',
      component: managerLogin
    },
    {
      path: '/log',
      name: 'log',
      component: log
    },
    {
      path: '/checkFile',
      name: 'checkFile',
      component: checkFile
    },
    {
      path: '/finishFile',
      name: 'finishFile',
      component: finishFile
    },
     //配置登录成功页面，使用时需要使用 path 路径来实现跳转
     { path: '/success', component: () => import('@/views/success')},
 
     //配置登录失败页面，使用时需要使用 path 路径来实现跳转
     { path: '/error', component: () => import('@/views/error'), hidden: true }
  ]
})
