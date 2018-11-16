'use strict';
import zhLocale from 'qfpay-element-ui/lib/locale/lang/zh-CN'

const zh = {
  ...zhLocale,
  common: {
    title: '海外机构服务商业务平台',
    all: '全部',
    create: '创建',
    export: '导出',
    choose: '请选择',
    submit: '提交',
    save: '保存',
    edit: '修改',
    prev: '上一步',
    next: '下一步',
    done: '完成',
    close: '关闭',
    search: '查找',
    add: '增加',
    reset: '重置',
    loading: '拼命加载中',
    netError: '请求失败',
    createSuccess: '创建成功',
    updateSuccess: '修改成功',
    opSucc: '操作成功',
    opFailed: '操作失败',
    operate: '操作',
    delete: '删除',
    look: '查看',
    range: '选择时间范围',
    confirm: '确定',
    cancel: '取消',
    tip: '提示',
    status: '状态',
    enable: '启用',
    disable: '停用',
    startTime: '开始时间',
    endTime: '结束时间',
    privata: '对私',
    pub: '对公',
    reupload: '重新上传',
    format: '支持 JPG / PNG 格式',
    uploadSucc: '上传成功',
    uploadFailed: '上传失败'
  },
  authority: {
    crumbs: {
      T1: '用户管理',
      T2: '权限管理'
    },
    panel: {
      userName: '用户名称',
      roleName: '角色名称',
      state: '状态',
      open: '启用',
      close: '停用'
    },
    table: {
      role: '角色',
      account: '账户',
      rTime: '注册时间'
    },
    dialog: {
      title1: '新增用户',
      title2: '用户详情',
      pwd: '密码',
      tp1: '请输入用户名称',
      tp2: '请输入角色名称',
      tp3: '请输入账户',
      tp4: '最多输入30个字符',
      tp5: '请输入密码',
      tp6: '请选择状态'
    }
  },
  settleMent: {
    crumbs: {
      T1: '清分明细',
      T2: '清分汇总',
      T3: '清分模板',
      T4: '清分配置',
      T5: '新增清分模板',
      T6: '编辑清分模板',
      T7: '清分模板详情',
    },
    btn: {
      add: '新增',
      set: '配置'
    },
    panel: {
      orderNo: '订单号',
      tradeTime: '交易时间',
      settleType: '结算方类型',
      settleName: '结算方',
      payType: '支付类型',
      settleDetail: '结算科目',
      settlePass: '结算通道',
      modeName: '模板名称',
      createTime: '创建时间',
      agentName: '代理商名称',
      payPass: '支付通道',
      effectTime: '生效时间',
      passCost: '通道成本',
      staticAmount: '固定金额',
      percent: '百分比',
      noEffect: '不启用',
      day: '日结',
      week: '周结',
      month: '月结',
      singleAmount: '单笔金额',
      settleCircle: '结算周期',
      floorType: '阶梯类型',
      floorCount: '分阶梯计算',
      yes: '是',
      no: '否'
    },
    table: {
      sNum: '流水号',
      merName: '商户名称',
      shopName: '门店名称',
      tradeAmount: '交易金额',
      settlePercent: '清分比例',
      settleAmount: '清分金额',
      count: '笔',
      order: '序列',
      passName: '通道名称',
      tradeNum: '交易笔数',
      lastTime: '最后更新时间',
      isMode: '是否默认模板',
      province: '省',
      city: '市',
      address: '地址',
      phone: '电话',
      countRules: '计算公式',
      isSettle: '是/否结算',
      agent: '机构',
      firstAgent: '一级代理',
      secondAgent: '二级代理',
      income: '收入',
      expend: '支出',
      merchantRate: '商户费率',
      headCost: '总部成本',
      firstCost: '一级代理成本',
      secondCost: '二级代理成本',
      startVal: '起始值',
      endVal: '终止值',
      firstRate: '一级代理费率',
      secondRate: '二级代理费率',
      modeState: '模板状态',
      state: '状态',
      open: '启用',
      close: '停用'
    },
    dialog: {
      date: '配置日期',
      mode: '清分模板'
    },
    msg: {
      t1: '请输入模板名称',
      t2: '最多输入20个字符',
      t3: '请输入单笔金额',
      t4: '请输入正数',
      t5: '小数点后最多两位',
      t6: '请选择单笔金额条件',
      t7: '请选择支付通道',
      t8: '请选择结算周期',
      t9: '请选择通道成本',
      t10: '请输入通道成本',
      t11: '是否确认删除该清分模板?',
      t12: '请输入起始值',
      t13: '请输入终止值',
      t14: '请输入一级代理费率',
      t15: '请输入二级代理费率',
      t16: '交易笔数为正整数',
      t17: '起始值不能大于终止值',
      t18: '请输入结算方名称',
    }
  },
  login: {
    nameph: '请输入电话或E-mail',
    passph: '密码',
    desc: '文案待定',
    cap1: '移动支付',
    cap2: ' 管理系统',
    checkbox: '记住密码',
    btn: '登录',
    forgetPass: '忘记密码？',
    msg: {
      m1: '请输入账号',
      m2: '请输入密码.',
      m3: '登录失败.'
    }
  },
  merchant: {
    title: '商户管理',
    create: '创建',
    query: '查询',
    reset: '重置',
    patchImport: '批量创建',
    form: {
      mchtid: '商户ID',
      mchtname: '商户名称',
      agent1: '一级代理',
      agent2: '二级代理',
      ph: '请先选择一级代理',
      audit_state: '商户状态'
    },
    table: {
      mchtid: '商户ID',
      mchtname: '商户名称',
      address: '地址',
      mobile: '联系方式',
      agent1: '所属渠道',
      agent2: '二级渠道',
      account: '账户名称',
      state: '商户状态',
      industry: '行业',
      store: '门店'
    },
    detail: {
      up: '启用',
      down: '禁用',
      redit: '继续编辑',
      cate: {
        merchant: '普通子商户',
        big: '大商户',
        sub: '连锁店'
      },
      signed: {
        yes: '是',
        no: '否'
      },
      p: {
        m: '月',
        w: '周',
        d: '日'
      },
      basic: {
        title: '商户详情',
        close: '关闭',
        subtitle: '基本信息',
        bd: '简介:',
        la1: '商户类型:',
        la2: '行业:',
        la3: '商户名称:',
        la4: '所属代理商名称:',
        la5: '地址:',
        la6: '销售员姓名:',
        la7: '公司联系人:',
        la8: '公司邮箱:',
        la9: '商户状态:',
        la10: '商户成立日期:',
        la11: '公司名称:',
        la12: '公司地址:',
        la13: '公司所属地区:',
        la14: '公司邮编:',
        la15: '合同是否签署:',
        la16: '结算周期:',
        la17: '销售员联系电话:',
        la18: '公司联系人电话:',
        la19: '公司注册号码（UEN）:'
      },
      shop: {
        subtitle: '商户信息',
        la1: '商户名称:',
        la2: '商户地址:',
        la3: '上传图片:'
      },
      rates: {
        subtitle: '支付信息',
        wechat: '服务费率:',
        ali: '支付宝支付:'
      },
      pay: {
        subtitle: '公司信息',
        la1: '银行帐户名称:',
        la2: '银行账号:',
        la3: '银行名称:',
        la4: '支行名称:',
        la5: '银行所属省:',
        la6: 'SWIFT代码:',
        la7: '银行所属市:',
        la8: '联系方式:',
        la9: '银行类型:',
        la10: '上传图片:'
      },
      edit: '编辑'
    },
    newMerchant: {
      title1: '创建商户',
      title2: '修改商户',
      step1: '基本信息',
      step2: '费率信息',
      step3: '公司信息',
      basic: {
        cap1: '基本信息',
        cap2: '支付信息'
      },
      form: {
        escrow: '代理商',
        timeformat: 'HH:MM - HH:MM',
        is_contract: '合同是否签署',
        cf: '请确认',
        period: '结算周期',
        ratio: '服务费率',
        account: '账号',
        shopname: '商户名称',
        name: '公司名称',
        licensenumber: '公司注册号码（UEN)',
        legal: '公司联系人',
        location: '公司所属地区',
        loc1: '新加坡',
        loc2: '马来西亚',
        address: '公司地址',
        storeaddr: '门店地址',
        post: '公司邮编',
        email: '公司邮箱',
        cate: '商户类型',
        scale: '门店类型',
        type1: '行业',
        type2: '商户状态',
        bd: '简介',
        sub: '普通子商户',
        big: '大商户',
        chain: '连锁店',
        micro: '小微',
        geti: '个体',
        ent: '企业',
        main: '连锁店总店UID',
        contact: '销售员姓名',
        storename: '门店名称',
        storephone: '门店联系电话',
        storelocation: '门店所属地区',
        storeaddress: '门店地址',
        storepost: '门店邮编',
        addition: '门店附加服务',
        storeoperating: '门店营业时间',
        website: '门店网址',
        cell: '公司联系人电话',
        wei: '服务费率:',
        ali: '支付宝支付:',
        rate: '商户费率',
        bankuser: '银行帐户名称',
        bankaccount: '银行账号',
        hbank: '银行名称',
        bbank: '支行名称',
        bankProvice: '银行所在省',
        bankCity: '银行所在市',
        code: 'SWIFT代码',
        mobile: '预留手机号',
        banktype: '银行账户类型',
        doc: '门店信息',
        idfront: '点击添加经营场所内景照片',
        idback: '点击添加经营场所外景照片',
        warmfront: '* 必须上传所售商品/经营场所内景照片',
        warmback: '* 必须上传经营场所/经营场所外景照片'
      },
      rule1: '请选择商户类型',
      rule2: '请输入商户名称',
      rule3: '请输入公司名称',
      rule4: '请输入正确的邮箱地址',
      rule5: '银行卡账号必须是数字',
      rule6: '手机号必须是数字',
      rule7: '请输入业务员账号',
      rule8: '上传凭证必须是JPG/PNG格式',
      rule9: '请输入连锁店总店UID',
      rule10: '最多输入60个字符',
      rule11: '请选择销售员',
      rule12: '请输入账号',
      rule13: '费率要大于通道的基准费率',
      rule14: '请输入公司注册号码',
      rule15: '请选择公司所属地区',
      rule16: '请输入公司地址',
      rule17: '请输入公司联系人',
      rule18: '请输入银行名称',
      rule19: '请输入SWIFT代码',
      rule20: '请输入银行帐户名称',
      rule21: '请输入门店名称',
      rule22: '请输入门店联系电话',
      rule23: '请选择门店所属地区',
      rule24: '请输入门店地址',
      rule25: '请输入门店邮编',
      rule26: '请输入门店附加服务',
      rule27: '请输入门店营业时间',
      rule28: '请上传所售商品/经营场所内景照片',
      rule29: '请上传经营场所/经营场所外景照片',
      rule30: '请输入公司邮箱',
      rule31: '只能上传Excel文件',
      rule32: '请输入银行账号',
      rule33: '只能上传ZIP压缩包',
      rule34: '请输入简介',
      rule35: '请输入公司联系人电话',
      rule36: '请输入公司邮编',
      rule37: '请输入支行名称',
      rule38: '请选择行业',
      rule39: '请确认合同是否签署',
      rule40: '请选择结算周期',
      rule41: '请输入门店网址',
      rule42: '请输入可访问的门店网址',
      rule43: '请选择销售员'
    }
  },
  shop: {
    title: '门店管理',
    query: '查询',
    reset: '重置',
    form: {
      mchntid: '商户ID',
      mchntname: '商户名称',
      submchntid: '门店ID',
      sunmchntname: '门店名称',
    },
    table: {
      submchntid: '门店ID',
      sunmchntname: '门店名称',
      mchntid: '商户ID',
      mchntname: '商户名称',
      address: '门店地址',
      telephone: '门店联系电话',
      location: '门店所属地区',
      post: '门店邮编',
      operating: '门店营业时间'
    },
    detail: {
      basic: {
        title: '门店详情',
        close: '关闭',
        subtitle: '基本信息',
        la1: '商户名称:',
        la2: '门店登陆账号:',
        la3: '门店名称:',
        la4: '门店联系电话:',
        la5: '门店所属地区:',
        la6: '门店地址:',
        la7: '门店邮编:',
        la8: '门店营业时间:',
        la9: '门店附加服务:',
        la10: '门店网址:',
        la11: '图片展示:'
      }
    }
  },
  batch: {
    title: '批量创建',
    t1: '批量导入',
    tip: {
      txt: '* 请按照固定格式上传商户资料，请参考',
      ins: '《批量进件说明》',
      template: '《batch merchants on-boarding.xlsx》模板',
      and: '及',
      title: '提示',
      close: '关 闭'
    },
    cap: '批量创建',
    input: {
      cap1: '商户信息',
      cap2: '照片信息'
    },
    up: {
      excel: '上传Excel',
      zip: '上传图片zip包'
    },
    commit: '提交',
    rule1: '请上传商户信息',
    rule2: '请上传照片信息',
    manual1: '1、请点击下载批量上传模板《batch merchants on-boarding.xlsx》，下载后将需要入网的商户信息汇总。',
    manual2: '2、附件请按照命名规范命名，并放入文件夹压缩后进行上传（店内照命名规范：门店电话号-goodsphoto.jpg,店外照命名规范：门店电话号-shopphoto.jpg）。',
    manual3: '3、附件中文件夹名称与压缩包名称需保持一致，如需修改名称，请先修改文件夹名称再进行压缩。'
  },
  audit: {
    title: '审核管理',
    form: {
      mchtid: '商户ID',
      audit_state: '审核状态',
      memo: '备注'
    },
    detail: {
      title: '审核记录',
      table: {
        creator: '操作员ID',
        create_date: '审核日期',
        result: '审核结果',
        memo: '备注'
      },
      doit: '审核',
      pass: '通过',
      re: '驳回',
      msg1: '请输入审核备注。'
    }
  },
  trade: {
    detail: '交易明细',
    total: '交易统计',
    common: {
      tradeDate: '交易日期',
      tradeTime: '交易时间',
      inSameMonth: '交易信息不可跨月查询',
      sNum: '流水号',
      tradeType: '交易类型',
      payPass: '支付通道',
      merchantName: '商户名称',
      firstAgent: '一级代理',
      secondAgent: '二级代理',
      wechat: '微信支付',
      alipay: '支付宝',
      pay: '支付',
      refund: '退款',
      success: '成功',
      failed: '失败',
      fee: '手续费',
      payTrade: '支付交易',
      refundTrade: '退款交易',
      tradeAmount: '交易金额',
      tradeCount: '交易笔数',
      refundAmount: '退款金额',
      refundCount: '退款笔数',
      amount: '金额',
      count: '笔数',
      pleaseSelect: '请选择',
      noData: '暂无数据'
    }
  },
  agent: {
    agentName: '代理商名称',
    agentId: '代理商ID',
    agentLevel: '代理商级别',
    level: '等级',
    level1: '一级',
    level2: '二级',
    agentLevel1: '一级代理',
    agentLevel2: '二级代理',
    leaderAgent: '上级代理商名称',
    registerTime: '注册时间',
    agentNickname: '代理商简称',
    agentArea: '代理区域',
    address: '地址',
    contact: '联系人',
    legal: '法人',
    contactMobile: '联系人电话',
    legalMobile: '法人电话',
    saleMan: '业务员',
    belongSaleMan: '所属业务员',
    username: '登录账号',
    canuse: '可以注册',
    password: '登录密码',
    bankuser: '账户名称',
    bankaccount: '结算账号',
    headbankname: '总行名称',
    bankname: '支行名称',
    bankcode: '联行号',
    wechat: '微信',
    alipay: '支付宝',
    agentDetail: '代理商详情',
    baseInfo: '基本信息',
    settleInfo: '结算信息',
    payRate: '支付费率',
    wechatRate: '微信费率',
    alipayRate: '支付宝费率',
    agentList: '代理商列表',
    agentAdd: '添加代理商',
    agentEdit: '修改代理商',
    pleaseEnter: '请输入',
    pleaseSelect: '请选择',
    agentBelong: '所属代理',
    onlyLetterNumber: '登录账号只可以输入字母或数字',
    isRegistered: '登录账号已注册'
  },
  role: {
    role: '权限',
    roleManage: '角色管理',
    createRole: '新建角色',
    editRole: '修改角色',
    roleDetail: '角色详情',
    roleName: '角色名称',
    roleStatus: '角色状态',
    pleaseEnter: '请输入',
    createTime: '创建时间',
  },
  main: {
    desc: '移动支付管理系统',
    roles: [
      ''
    ],
    logout: '注销'
  }
}
export default zh;
