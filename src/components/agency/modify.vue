<template>
  <div class="agencyCreate">
    <header class="page-header style2">
      <h2 class="page-title">{{this.isUpdate ? $t('agent.agentEdit') : $t('agent.agentAdd')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('common.close')}}</span></el-button>
    </header>
    <el-steps :active="active" finish-status="finish">
      <el-step :title="$t('agent.baseInfo')"></el-step>
      <el-step :title="$t('agent.settleInfo')"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseform" :rules="baseFormRules" :model="baseform">
      <h3>{{$t('agent.baseInfo')}}</h3>
      <el-form-item prop="name" :label="$t('agent.agentName')">
        <el-input v-model="baseform.name" @blur="updateAgency('name', $event)"></el-input>
      </el-form-item>
      <el-form-item :prop="baseform.levelcode >= 2 ? 'parent_uid' : 'levelcode'" :label="$t('agent.agentLevel')" style="width:446px" ref="levelcode">
        <el-select v-model="baseform.levelcode" @change="selectLevel" :disabled="Boolean(baseform.levelcode) && isUpdate">
          <el-option v-for="level in levels" :label="level.text" :value="level.code" :key="level.code"></el-option>
        </el-select>
        <el-select style="margin-left:10px;" :disabled="baseform.levelcode === 1" v-model="baseform.parent_uid" :placeholder="$t('agent.agentBelong')" @change="updateAgency('secondAgency', $event)">
          <el-option v-for="agency in allAgencys" :label="agency.name" :value="agency.qd_uid" :key="agency.qd_uid"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
      <el-form-item prop="short_name" :label="$t('agent.agentNickname')">
        <el-input v-model="baseform.short_name" @blur="updateAgency('short_name', $event)"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="auth_province" :label="$t('agent.agentArea')" style="width:446px" ref="province">
        <el-select v-model="baseform.auth_province" @change="selectProvince">
          <el-option v-for="province in areas" :label="province.areaname" :value="province.areaname" :key="province.areaid"></el-option>
        </el-select>
      </el-form-item> -->
         <!-- <el-select style="margin-left:10px;" ref="city" v-model="baseform.auth_city" @change="selectCity">
          <el-option v-for="city in citys" :label="city.cityname" :value="city.cityid" :key="city.cityid"></el-option>
        </el-select> -->
      <hr/>
   
      <el-form-item prop="country" :label="$t('merchant.newMerchant.form.country')">
        <el-select  v-model="baseform.country" @change="updateAgency('country', $event)">
          <el-option :label="$t('shop.newStore.Ger')" value="DE"></el-option>
          <el-option :label="$t('shop.newStore.CZ')" value="CZ"></el-option>
        </el-select>
      </el-form-item>

       <el-form-item prop="currency" :label="$t('agent.currency')">
        <el-select  v-model="baseform.currency" @change="updateAgency('currency', $event)">
            <el-option v-for="item in currencyList" :label="item" :value="findKey(currency,item)" :key="item"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item prop="timezone" :label="$t('agent.timezone')">
          <el-select  v-model="baseform.timezone" @change="updateAgency('timezone', $event)">
       <el-option v-for="val in timezoneList" :label="val" :value="val" :key="val"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item prop="address" :label="$t('agent.address')">
        <el-input v-model="baseform.address" @blur="updateAgency('address', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="business_name" :label="$t('agent.contact')">
        <el-input v-model="baseform.business_name" @blur="updateAgency('business_name', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="legal_name" :label="$t('agent.legal')">
        <el-input v-model="baseform.legal_name" @blur="updateAgency('legal_name', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="business_mobile" :label="$t('agent.contactMobile')">
        <el-input v-model="baseform.business_mobile" @blur="updateAgency('business_mobile', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" :label="$t('agent.legalMobile')">
        <el-input v-model="baseform.mobile" @blur="updateAgency('mobile', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="slsm_userid" :label="$t('agent.saleMan')">
        <el-select v-model="baseform.slsm_userid" :disabled="baseform.levelcode > 1" @change="updateAgency('selectSaleMan', $event)">
          <el-option v-for="sale in sales" :label="sale.name" :value="sale.userid" :key="sale.userid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="username" prop="username" :label="$t('agent.username')" :error="usernameErrorMessage">
        <el-input :disabled="isUpdate" @blur="verifyRegister" @focus="clearRegisterError" v-model="baseform.username"></el-input>
        <i v-show="isRegisterLoading" class="el-icon-loading"></i>
        <i v-show="!isRegisterLoading && !isRegistered" :title="$t('agent.canuse')" class="el-icon-circle-check" style="color:#67c10d"></i>
      </el-form-item>
      <el-form-item v-if="isUpdate" prop="password" :label="$t('agent.password')">
        <el-input id="end-length" type="password" :value="editPassword" @input="inputPassword" @focus="focusPassword" @blur="updateAgency('password', $event)"></el-input>
      </el-form-item>
      <el-form-item v-else prop="password" :label="$t('agent.password')">
        <el-input auto-complete="new-password" type="password" v-model="baseform.password"></el-input>
      </el-form-item>
      <el-form-item v-if="isUpdate" prop="status" :label="$t('common.status')">
        <el-select v-model="baseform.status" @change="updateAgency('status', $event)">
          <el-option :label="$t('common.enable')" :value="0"></el-option>
          <el-option :label="$t('common.disable')" :value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-form v-show="active === 1" ref="bankinfoform" :rules="bankinfoFormRules" :model="bankinfo">
      <h3>{{$t('agent.settleInfo')}}</h3>
      <el-form-item prop="bankuser" :label="$t('merchant.newMerchant.form.accountName')">
        <el-input v-model.trim="bankinfo.bankuser" @blur="updateAgency('bankuser', $event)"></el-input>
      </el-form-item>

      <el-form-item prop="headbankname" :label="$t('merchant.newMerchant.form.accountType')">
        <el-input v-model.trim="bankinfo.headbankname" @blur="updateAgency('headbankname', $event)"></el-input>
      </el-form-item>

      <el-form-item prop="bankaccount" :label="$t('merchant.newMerchant.form.accountH')">
        <el-input v-model.trim="bankinfo.bankaccount" @change="GetRemit" @blur="updateAgency('bankaccount', $event)"></el-input>
      </el-form-item>

      <el-form-item prop="bankCity" :label="$t('merchant.newMerchant.form.accountAddress')">
        <el-input v-model.trim="bankinfo.bankCity" @blur="updateAgency('bankCity', $event)"></el-input>
      </el-form-item>

      <el-form-item prop="bankcode" :label="$t('merchant.newMerchant.form.bic')">
        <el-input v-model.trim="bankinfo.bankcode" @blur="updateAgency('bankcode', $event)"></el-input>
      </el-form-item>

      <el-form-item prop="remit_amt" :label="$t('merchant.newMerchant.form.moneySettment')">
        <el-input
          v-model.trim="bankinfo.remit_amt"
          :disabled="IsRemit"
          maxlength='5'
          @blur="updateAgency('remit_amt', $event)"></el-input>
      </el-form-item>
    </el-form>
<!-- :label="fee.trade_type_name" -->
    <!-- <el-form v-show="active === 1 && !isUpdate" ref="payfeeform" >
      <h3>{{$t('agent.payRate')}}</h3>
      <div :label="item.name" v-for="item in payfee" :key="item.name">
        <h4>{{item.name}}</h4>
        <el-form-item  v-for="(fee, index) in item.busicd" :error="fee.error" :key="`${fee.trade_type_name}${index}`">
           <label class="width-limit">{{fee.trade_type_name}}</label>
            <el-input-number v-model.trim="fee.ratio" :disabled="isUpdate" :precision="2" :step="0.01" :min="+fee.ratioMin" :max="5" @change="ratioMinRule($event, fee.ratioMin, fee.trade_type)"></el-input-number>
        </el-form-item>
      </div>
    </el-form> -->

    <footer v-if="isUpdate">
      <el-button v-show="active === 1" type="primary" @click="goback">{{$t('common.done')}}</el-button>
      <el-button v-show="active === 0" type="primary" @click="next">{{$t('common.next')}}</el-button>
      <el-button v-show="active === 1" @click="pre">{{$t('common.prev')}}</el-button>
    </footer>
    <footer v-else>
      <el-button type="primary" @click="next" :disabled="disabled">
        {{active === 1 ? $t('common.done') : $t('common.next')}}
      </el-button>
      <el-button v-show="active !== 0" @click="pre">{{$t('common.prev')}}</el-button>
      <el-button v-show="active === 0" @click="resetStep1">{{$t('common.reset')}}</el-button>
    </footer>
  </div>
</template>

<script>
  import qs from 'qs'
  import axios from 'axios'
  import config from 'config'
  import Store from '../../assets/js/store'
  export default {
    data() {
      return {
        isUpdate: false,
        isLoading: false,
        IsRemit: false,
        active: 0, // 当前步骤
        isInputing: false, // 正在输入密码
        editPassword: '******',
        oldPassword: '',
        disabled: true,
        baseform: {
          name: '',
          levelcode: '',
          parent_uid: '',
          slsm_userid: '',
          // auth_province: '',
          country: '',
          currency: '',
          timezone: '',
          // auth_city: '',
          password: ''
        },
        bankinfo: {
          headbankname: '', // 开户行名称
          bankuser: '', // 开户行
          bankaccount: '', // 银行账号
          bankCity: '', // 银行地址
          bankcode: '', // SWIFT码
          remit_amt: '', // 结算资金起点
        },
        payfee: [],
        timezone: {},
        currency: {},
        levels: [], // 代理商级别
        allAgencys: [], // 所属代理
        // areas: [], // 所有省份和城市
        // citys: [], // 当前省的所有城市
        sales: [], // 业务员 列表
        isRegisterLoading: false,
        isRegistered: true, // 已注册
        usernameErrorMessage: '', // 登录账号报错文案
        baseFormRules: {
          'name': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.agentName')}
          ],
          'levelcode': [
            {required: true, message: this.$t('agent.pleaseSelect') + this.$t('agent.agentLevel')}
          ],
          // 'auth_province': [
          //   {required: true, message: this.$t('agent.pleaseSelect') + this.$t('agent.agentArea')}
          // ],
          'short_name': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.agentNickname')}
          ],
             'country': [
            {required: true, message: this.$t('agent.pleaseSelect') + this.$t('merchant.newMerchant.form.country')}
          ],
             'currency': [
            {required: true, message: this.$t('agent.pleaseSelect') + this.$t('agent.currency')}
          ],
             'timezone': [
            {required: true, message: this.$t('agent.pleaseSelect') + this.$t('agent.timezone')}
          ],
          'address': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.address')}
          ],
          'business_name': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.contact')}
          ],
          'legal_name': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.legal')}
          ],
          'business_mobile': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.contactMobile')},
                    {
            validator: (rule, val, cb) => {
              if (!/^\+\d{7,15}$/.test(val) && val != "") {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule3"))
                );
              } else {
                cb();
              }
            }
          }
          ],
          'mobile': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.legalMobile')},
                    {
            validator: (rule, val, cb) => {
              if (!/^\+\d{7,15}$/.test(val) && val != "") {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule3"))
                );
              } else {
                cb();
              }
            }
          }
          ],
          'username': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.username'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9a-zA-Z]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('agent.onlyLetterNumber')));
                  this.disabled = true
                } else {
                  cb();
                  this.disabled = false;
                }
              }
            }
          ],
          'password': [
            {required: true, message: this.$t('agent.pleaseEnter') + this.$t('agent.password')}
          ]
        },
        bankinfoFormRules: {
          'bankuser': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule15')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule7'), trigger: 'blur'}
          ],
          'headbankname': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule16')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule8'), trigger: 'blur'}
          ],
          'bankaccount': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule17')},
            // {
            //   validator: (rule, val, cb) => {
            //     if (!/^[0-9]*$/.test(val) && val != '') {
            //       cb(new Error(this.$t('merchant.newMerchant.specialRule.rule1')));
            //     } else {
            //       cb();
            //     }
            //   }
            // },
               {
            validator: (rule, val, cb) => {
              if (!/^[A-Z]{2}\d{2}[A-Z\d]{1,30}$/.test(val)) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }
          }
          ],
          'bankCity': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule18')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule8'), trigger: 'blur'}
          ],
          'bankcode': [
            {required: true, message: this.$t('merchant.newMerchant.rule19')}
          ],
          'remit_amt': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule19')},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule1')));
                } else {
                  cb();
                }
              }
            }
            // {max: 5, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule2')}
          ]
        }
      }
    },
    created() {
      this.isUpdate = this.$route.name === 'agencyEdit'
      !this.isUpdate && this.fetchRadio()
      // 编辑页面，刷新回详情页
      if (this.isUpdate && localStorage.getItem('hasEdit') === '1') {
        this.$router.push({name: 'agencyDetail'})
        return false
      }
      let base = ''
      let bankinfo = ''
      let payfee = ''
      if (this.isUpdate) {
        base = localStorage.getItem('baseEdit')
        bankinfo = localStorage.getItem('bankinfoEdit')
        payfee = localStorage.getItem('payfeeEdit')
        this.payfee = payfee
      } else {
        base = localStorage.getItem('base')
        bankinfo = localStorage.getItem('bankinfo')
      }
      if (base) {
        this.baseform = JSON.parse(base)
        if (this.isUpdate) {
          this.oldBaseform = JSON.parse(base)
          this.baseform.password = '******'
        }
      }
      if (bankinfo) {
        this.IsRemit = true
        this.bankinfo = JSON.parse(bankinfo)
        if (this.isUpdate) {
          this.oldBankinfo = JSON.parse(bankinfo)
        }
      }
      if (payfee) {
        this.payfee = JSON.parse(payfee)
      }
      this.fetchSalesman()
      this.fetchAgencyLevel()
      // this.fetchCity()
      let configList = Store.get('configList')
      this.timezone = configList.timezone
      this.currency = configList.currency
    },
    watch: {
      "baseform.parent_uid"() {
        this.fetchRadio(this.baseform.parent_uid)
      }
    },
    computed: {
     currencyList: function() {
      return Object.values(this.currency).sort();
    },
    timezoneList: function() {
      return Object.values(this.timezone).sort((a,b)=> a-b);
    },
    },
    methods: {
        findKey(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value));
    },
      fetchRadio(agentUid) {
        let p = {
          format: 'cors',
        }
        if (agentUid) {
          p.agent_uid = agentUid
        }
        axios.get(`${config.host}/org/tools/get/ratio`, {
          params: p
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.payfee = this.formatRatio(data.data);
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },

      // 格式化费率
      formatRatio(data) {
        for(let item of data) {
          for(let list of item.busicd) {
            list['ratio'] = list['ratioMin'];
          }
        }
        return data;
      },

      ratioMinRule(value, ratioMin, tradeType) { // 费率填写提示信息的处理
        let errorMessage = value < ratioMin ? this.$t('common.MINRatio') + `${ratioMin}` : ''
        this.payfee.map((radio) => {
          radio.busicd.map((item) => {
            if (tradeType === item.trade_type) {
              if(value === undefined) {
                item.ratio = 0
              }
              this.$set(item, 'error', errorMessage)
            } else {
              item.error = ''
            }
          })
        })
      },
      goback() {
        this.$router.push({name: 'agencyDetail'})
      },
      next() {
        if (this.active === 0) {
          if (this.usernameErrorMessage && this.isRegistered) {
            return false
          }
          this.$refs['baseform'].validate((valid) => {
            if (valid) {
              this.active += 1
              if (this.isUpdate) {
                localStorage.setItem('baseEdit', JSON.stringify(this.baseform))
              } else {
                localStorage.setItem('base', JSON.stringify(this.baseform))
              }
            }
          })
        } else if (this.active === 1) { // 创建 完成
          this.$refs['bankinfoform'].validate((valid) => {
            if (valid) {
              this.create()
            }
          })
        }
      },
      pre() {
        if (this.active-- <= 0) this.active = 0
      },
      resetStep1() {
        this.baseFormRules.parent_uid && (this.baseFormRules.parent_uid = []);
        this.baseFormRules.levelcode && (this.baseFormRules.levelcode = [])
        this.$refs['baseform'].resetFields()
      },
      selectLevel(value) {
        this.levels.map((level, index) => {
          if (level.code === value) {
            this.allAgencys = level.parentinfo
          }
        })
        if (value === 1) {
          this.baseFormRules.levelcode = [
            {required: true, message: this.$t('agent.pleaseSelect') + this.$t('agent.agentLevel')}
          ]
          this.baseFormRules.slsm_userid = [
            {required: true, message: this.$t('agent.pleaseSelect') + this.$t('agent.saleMan')}
          ]
          this.baseFormRules.parent_uid = []
        } else {
          this.baseFormRules.levelcode = []
          this.baseFormRules.slsm_userid = []
          this.baseFormRules.parent_uid = [
            {required: true, message: this.$t('agent.pleaseSelect') + this.$t('agent.agentBelong')}
          ]
          this.baseform.slsm_userid = ''
        }
        this.baseform.parent_uid = ''
      },
      // selectProvince(value) {
      //   this.areas.map((area, index) => {
      //     if (area.areaname === value) {
      //       if (this.isUpdate) {
      //         this.updateAgency('updateProvince', area.areaname)
      //       }
      //     }
      //   })
      // },
      fetchAgencyLevel() {
        this.$http(`${config.host}/org/tools/level?format=cors`)
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.levels = data.data.records
            if (this.isUpdate && this.baseform.levelcode === 2) {
              this.allAgencys = this.levels[1].parentinfo
            }
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      fetchSalesman() {
        this.$http(`${config.host}/org/tools/slsm?format=cors`)
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.sales = data.data
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      // fetchCity() {
      //   this.isLoading = true
      //   this.$http(`${config.host}/org/tools/areacities?format=cors`)
      //   .then((res) => {
      //     this.isLoading = false
      //     let data = res.data
      //     if (data.respcd === '0000') {
      //       this.areas = data.data.records
      //     } else {
      //       this.$message.error(data.resperr)
      //     }
      //   })
      // },
      clearRegisterError() {
        this.isRegistered = true
        this.usernameErrorMessage = ''
      },
      verifyRegister(event) {
        let username = event.target.value
        if (!username) {
          return false
        }
        this.isRegisterLoading = true
        this.$http(`${config.host}/org/agent/check?username=${username}&format=cors`)
        .then((res) => {
          this.isRegisterLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.disabled = false;
            this.isRegistered = false
            this.usernameErrorMessage = ''
            this.updateAgency('username', username)
          } else if (data.respcd === '2102') {
            this.isRegistered = true
            this.usernameErrorMessage = this.$t('agent.isRegistered')
          } else if (data.respcd === '2101') {
//            this.isRegistered = true
            this.usernameErrorMessage = data.resperr
          }
        })
      },
      create() {
        // 接口传参需要 label，省市
        let paramsBase = JSON.parse(JSON.stringify(this.baseform))
        // paramsBase.auth_province = this.$refs.province.selected.label || ''
        // paramsBase.auth_city = this.$refs.city.selected.label || ''
        // paramsBase.auth_province = this.baseform.auth_province
        this.payfeeT = this.refee(this.payfee)
        this.$http({
          method: 'post',
          url: `${config.host}/org/agent/create`,
          data: qs.stringify({
            base: JSON.stringify(paramsBase),
            bankinfo: JSON.stringify(this.bankinfo),
            payfee: JSON.stringify(this.payfeeT),
            format: 'cors'
          })
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.$refs['baseform'].resetFields()
            this.$refs['bankinfoform'].resetFields()
            localStorage.removeItem('base')
            localStorage.removeItem('bankinfo')
            this.$message.success(this.$t('common.createSuccess'))
            this.$router.push({name: 'agencyList'})
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      inputPassword(value) {
        if (this.isInputing) {
          if (this.oldPassword.length > value.length) {
            this.editPassword = ''
          } else {
            let dom = document.querySelector("#end-length")
            let index = dom.selectionStart - 1;
            this.editPassword = value.substr(index, 1) || ''
          }
          this.isInputing = false
        }
      },
      focusPassword() {
        this.editPassword = '******'
        this.isInputing = true
        this.oldPassword = this.editPassword
      },
      updateAgency(key, e) {
        if (!this.isUpdate) {
          return false
        }
        // input 是 e.target.value; select 是 value
        let value = typeof e === 'object' ? e.target.value : e
        // 密码为空则默认为 '******'
        if (key === 'password' && !value) {
          this.editPassword = '******'
          return false
        }
        // 没有修改则不发请求
        if (this.oldBaseform[key] === value) {
          return false
        } else if (this.oldBankinfo[key] === value) {
          return false
        }
        this.$confirm(this.$t('common.sure'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          let agentId = this.$route.params.id
          let params = {
            agent_id: agentId
          }
          if (key === 'secondAgency') {
            params['levelcode'] = 2
            params['parent_uid'] = value
            this.fetchRadio(value)
          } else if (key === 'updateProvince') {
            params['auth_province'] = value
          } else if (key === 'updateProvinceCity') {
            params['auth_province'] = this.$refs.province.selected.label || this.baseform.auth_province
            params['auth_city'] = value
          } else if (key === 'selectSaleMan') {
            params['levelcode'] = 1
            params['slsm_userid'] = value
          } else if (key === 'status') {
            params['status'] = value
          } else if (value) {
            params[key] = value
          } else {
            return false
          }
          this.$http({
            method: 'post',
            url: `${config.host}/org/agent/edit`,
            data: qs.stringify(params)
          })
          .then((res) => {
            let data = res.data
            if (data.respcd === '0000') {
              this.$refs['baseform'].clearValidate()
              this.$refs['bankinfoform'].clearValidate()
              localStorage.setItem('hasEdit', '1')
              this.$message.success(this.$t('common.updateSuccess'))
            } else {
              this.$message.error(data.resperr)
            }
          })
        }).catch(() => {
        })
      },
      cancel() {
        this.$router.push({name: 'agencyList'})
      },
      revalue(a, b) { // 为支付方式赋值
          for(let i of a) {
            for(let j of b) {
              if(j['name'] === i['name']) {
                i['busicd'] = j['busicd'];
              }
            }
          }
      },

      // 注册及编辑的费率结构修改
      refee(f) {
        let e = []
        for(let i of f) {
          for(let j of i.busicd) {
            e.push(j)
          }
        }
        return e
      },

      // 根据银行账号获得
      GetRemit() {
        axios.get(`${config.host}/org/tools/remit_amt`, {
          params: {
            bankaccount: this.bankinfo.bankaccount,
            format: 'cors'
          }
        }).then((res) => {
          let data = res.data
          if(data.respcd === config.code.OK) {
            this.bankinfo.remit_amt = data.data.remit_amt;
            if(data.data.remit_amt !== "") {
              this.IsRemit = true
            }else {
              this.IsRemit = false
            }
          }else {
            this.$message.error(data.respmsg);
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.agencyCreate {
  background-color: #fff;
  padding: 0 30px;
}
.el-form {
  background-color: #F7F9FA;
  margin-bottom: 24px;
  padding: 15px 30px;
  h3 {
    position: relative;
    padding: 12px 0;
    margin: 0 0 20px;
    font-size: 20px;
    color: $titleColor;
    &:after{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background-color: #232629;
    }
  }
  h4 {
    position: relative;
    padding: 12px 0;
    margin: 0 0 20px;
    font-size: 18px;
    color: $titleColor;
  }
}
.el-form-item {
  width: 300px;
  display: inline-block;
  vertical-align: top;
  margin-right: 80px;
      .width-limit {
        display: inline-flex;
        width: 300px;
        color: #717283;
        overflow-x: scroll;
        white-space: nowrap;
        scrollbar-width:none;
        &::-webkit-scrollbar { display:none }
      }
}
.el-select {
  width: 200px;
}
hr {
  border: none;
  margin: 0;
}
footer {
  padding-bottom: 30px;
}
.username {
  position: relative;
  i {
    font-size: 18px;
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -9px;
  }
  .el-icon-circle-check {
    cursor: help;
  }
}
</style>
