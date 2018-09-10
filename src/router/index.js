import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import agencyList from 'components/agency/list'
import agencyCreate from 'components/agency/create'
// import tradeList from 'components/trade/list'
import roleList from 'components/authority/roleList'
import roleModify from 'components/authority/modify'
import userList from 'components/authority/userList'
import forgetPassword from 'components/forgetPassword'
import bussiness from 'components/merchant/bussinessList'
import mchnt from 'components/merchant/merchantList'
import settleDetail from 'components/settlement/settleDetail'
import settleMode from 'components/settlement/settleMode'
import settleTotal from 'components/settlement/settleTotal'
import settleSet from 'components/settlement/settleSet'
import modCreate from 'components/settlement/modCreate'
import modDetail from 'components/settlement/modDetail'
import home from 'components/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
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
      redirect: '/main/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'shop_manage_list',
          name: 'shop_manage_list',
          component: bussiness
        },
        {
          path: 'mchnt_manage_list',
          name: 'mchnt_manage_list',
          component: mchnt
        },
        {
          path: 'mchnt_audit_list',
          name: 'mchnt_audit_list',
          component: bussiness
        },
        {
          path: 'agent_manage_list',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agent_create',
          name: 'agencyCreate',
          component: agencyCreate
        },
        {
          path: 'perm_role_list',
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
          path: 'perm_user_list',
          name: 'userList',
          component: userList
        },
        {
          path: 'clearing_detail_list',
          name: 'settleDetail',
          component: settleDetail
        },
        {
          path: 'clearing_template_list',
          name: 'settleMode',
          component: settleMode
        },
        {
          path: 'modCreate',
          name: 'modCreate',
          component: modCreate
        },
        {
          path: 'modDetail',
          name: 'modDetail',
          component: modDetail
        },
        {
          path: 'settleSet',
          name: 'settleSet',
          component: settleSet
        },
        {
          path: 'clearing_summary_list',
          name: 'settleTotal',
          component: settleTotal
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
