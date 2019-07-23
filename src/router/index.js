import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
  },
    {
      path: '/login',
      component: () => import('components/login/login'),
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import('components/forgetPassword'),
    },
    {
      path: '/main',
      component: () => import('components/main/main'),
      redirect: '/main/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('components/home/home'),
        },
        {
          path: 'shop_manage_list',
          name: 'shop_manage_list',
          component: () => import('components/merchant/bussinessList'),
        },
        {
          path: 'shop_manage_list/shop_detail',
          name: 'shopDetail',
          component: () => import('components/merchant/bussDetail'),
        },
        {
          path: 'shop_manage_list/shop_create',
          name: 'createStore',
          component: () => import('components/merchant/createStore'),
        },
        {
          path: 'mchnt_manage_list',
          name: 'mchnt_manage_list',
          component: () => import('components/merchant/merchantList'),
        },
        {
          path: 'mchnt_manage_list/mchnt_create',
          name: 'mchntCreate',
          component: () => import('components/merchant/createMerchant'),
        },
        {
          path: 'mchnt_manage_list/batch_import',
          name: 'batchImport',
          component: () => import('components/merchant/batchImport'),
        },
        {
          path: 'shop_manage_list/shop_batch_import',
          name: 'shopBatchImport',
          component: () => import('components/merchant/shopBatchImport'),
        },
        {
          path: 'mchnt_manage_list/mchnt_detail',
          name: 'mchntDetail',
          component: () => import('components/merchant/detail'),
        },
        {
          path: 'mchnt_audit_list',
          name: 'mchnt_audit_list',
          component: () => import('components/merchant/auditList'),
        },
        {
          path: 'mchnt_audit_list/audit_detail',
          name: 'auditDetail',
          component: () => import('components/merchant/auditDetail'),
        },
        {
          path: 'api_manage_list',
          name: 'apiList',
          component: () => import('components/merchant/apiList'),
        },

        {
          path: 'agent_manage_list',
          name: 'agencyList',
          component: () => import('components/agency/list'),
        },
        {
          path: 'agent_manage_list/agent_detail/:id',
          name: 'agencyDetail',
          component: () => import('components/agency/detail'),
        },
        {
          path: 'agent_manage_list/agent_create',
          name: 'agencyCreate',
          component: () => import('components/agency/modify'),
        },
        {
          path: 'agent_manage_list/agent_edit/:id',
          name: 'agencyEdit',
          component: () => import('components/agency/modify'),
        },
        {
          path: 'trade_detail_list',
          name: 'tradeList',
          component: () => import('components/trade/list'),
        },
        {
          path: 'trade_summary_list',
          name: 'tradeTotal',
          component: () => import('components/trade/total'),
        },

        {
          path: 'refund_list',
          name: 'refundManage',
          component: () => import('components/trade/refund'),
        },
        {
          path: 'refund_audit_list',
          name: 'refundCheck',
          component: () => import('components/trade/check'),
        },

        {
          path: 'perm_role_list',
          name: 'roleList',
          component: () => import('components/authority/roleList'),
        },
        {
          path: 'perm_role_list/perm_role_create',
          name: 'roleCreate',
          component: () => import('components/authority/modify'),
        },
        {
          path: 'perm_role_list/perm_role_edit/:code',
          name: 'roleEdit',
          component: () => import('components/authority/modify'),
        },
        {
          path: 'perm_user_list',
          name: 'userList',
          component: () => import('components/authority/userList'),
        },
        {
          path: 'clearing_detail_list',
          name: 'settleDetail',
          component: () => import('components/settlement/settleDetail'),
        },
        {
          path: 'clearing_template_list',
          name: 'settleMode',
          component: () => import('components/settlement/settleMode'),
        },
        {
          path: 'clearing_template_list/modCreate',
          name: 'modCreate',
          component: () => import('components/settlement/modCreate'),
        },
        {
          path: 'clearing_template_list/modDetail',
          name: 'modDetail',
          component: () => import('components/settlement/modDetail'),
        },
        {
          path: 'clearing_template_list/settleSet',
          name: 'settleSet',
          component: () => import('components/settlement/settleSet'),
        },
        {
          path: 'clearing_summary_list',
          name: 'settleTotal',
          component: () => import('components/settlement/settleTotal'),
        },
        {
          path: 'salesman_manage_list',
          name: 'salesList',
          component: () => import('components/salesman/salesList'),
        },
        {
          path: 'salesman_manage_list/sales_create',
          name: 'salesCreate',
          component: () => import('components/salesman/createSalesman'),
        },
        {
          path: 'salesman_manage_list/sales_detail',
          name: 'salesDetail',
          component: () => import('components/salesman/salesDetail'),
        },
        {
          path: 'operation_logs_list',
          name: 'logList',
          component: () => import('components/system/logList'),
        },
        {
          path: 'transaction_limit_list',
          name: 'tradeLimit',
          component: () => import('components/system/tradeLimit'),
        },

        {
          path: 'refund_white_list',
          name: 'whiteList',
          component: () => import('components/system/whiteList'),
        },
        {
          path: 'text',
          name: 'text',
          component: () => import('components/text/text'),
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
