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
import settleManage from 'components/settlement/settleManage'
import settleTotal from 'components/settlement/settleTotal'

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
          path: 'agent_manage_index',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agencyCreate',
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
          path: 'perm_user_index',
          name: 'userList',
          component: userList
        },
        {
          path: 'clearing_detail_index',
          name: 'settleDetail',
          component: settleDetail
        },
        {
          path: 'clearing_manage_index',
          name: 'settleManage',
          component: settleManage
        },
        {
          path: 'clearing_total_index',
          name: 'settleTotal',
          component: settleTotal
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
