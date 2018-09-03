import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import agencyList from 'components/agency/list'
import agencyCreate from 'components/agency/create'
// import tradeList from 'components/trade/list'
import roleList from 'components/authority/list'
import roleModify from 'components/authority/modify'
import userList from 'components/authority/userList'
import forgetPassword from 'components/forgetPassword'
import bussiness from 'components/merchant/bussinessList'
import mchnt from 'components/merchant/merchantList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
        component: forgetPassword
    },
    {
      path: '/main',
      component: main,
      children: [
        {
          path: 'shop_manage_index',
          name: 'shop_manage_index',
          component: bussiness
        },
        {
          path: 'mchnt_manage_index',
          name: 'mchnt_manage_index',
          component: mchnt
        },
        {
          path: 'agent_manage_index',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agent_create',
          name: 'agencyCreate',
          component: agencyCreate
        },
        {
          path: 'perm_role_index',
          name: 'roleList',
          component: roleList
        },
        {
          path: 'perm_role_create',
          name: 'roleCreate',
          component: roleModify
        },
        {
          path: 'perm_role_edit/:code',
          name: 'roleEdit',
          component: roleModify
        },
        {
          path: 'perm_user_index',
          name: 'userList',
          component: userList
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
