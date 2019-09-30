<template>
  <div class="new-store">
    <header class="page-header style2">
      <h2 class="page-title">
        {{this.isUpdate ? $t('shop.newStore.title2') : $t('shop.newStore.title1')}}</h2>
      <el-button type="text" @click="cancelHandler"><i class="el-icon-close"></i><span>{{$t('common.close')}}</span>
      </el-button>
    </header>
    <el-form :model="storeModel" :rules="storeRules" ref="store-form">
    
     <h3>{{$t('merchant.newMerchant.basic.cap4')}}</h3>
      <el-form-item v-if="!isUpdate">
        <el-select v-model="pid_select" :placeholder="$t('merchant.newMerchant.requiredRule.rule25')">
          <el-option
            v-for="item in list"
            :key="item.pid_name"
            :label="item.pid_name"
            :value="item.pid_name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button v-if="!isUpdate" class="el-button el-button--primary" @click="addList()">{{$t('common.confirm')}}</el-button>
      </el-form-item>

      <div class="payList" v-for="item in list_Select" :key="item.value">
        <el-form-item :label="item.pid_name">
          <el-input-number v-model="item.ratio" :precision="2" :step="0.01" :min="Number(item.ratioMin)"></el-input-number>
        </el-form-item>
        <el-form-item v-if="item.line_type !== ''" :label="$t('merchant.newMerchant.form.accessType')">
          <el-select :disabled="true" v-model="item.line_type">
            <el-option :label="$t('merchant.newMerchant.accessTypes.offline')" value="offline"></el-option>
            <el-option :label="$t('merchant.newMerchant.accessTypes.online')" value="online"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.finance_type !== ''" :label="$t('merchant.newMerchant.form.applicationType')">
          <el-select :disabled="true" v-model="item.finance_type">
            <el-option :label="$t('merchant.newMerchant.applicationTypes.direct')" value="direct"></el-option>
            <el-option :label="$t('merchant.newMerchant.applicationTypes.indirect')" value="indirect"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isUpdate" class="icon_remove" style="width:20px;margin-top:25px;">
          <i class="el-icon-remove" @click="pid_name_remove(item.pid_name)"></i>
        </el-form-item>
      </div>

      <h3>{{$t('merchant.newMerchant.basic.cap5')}}</h3>

    <el-form-item prop="store_shopname" :label="$t('merchant.newMerchant.form.storename')">
        <el-input
          v-model.trim="storeModel.store_shopname"></el-input>
      </el-form-item>

      <el-form-item prop="unify_mcc" :label="$t('merchant.newMerchant.form.QFMCC')">
        <el-input id="op_type" v-model="storeModel.unify_mcc"
                :placeholder="$t('merchant.newMerchant.requiredRule.rule9')"
                readonly
                class="sub-account-item-info"><template slot="append"><i class="el-icon-arrow-down tree-indic" @click.stop="showIndustyTreeComponent"></i></template>
        </el-input>
        <el-tree
          :data="shopTypes"
          @node-click="IndustyhandleNodeClick"
          v-show="isShowIndustyTree"
          node-key="id"
          :props="select==='en-us'?shopTypeProps_en:shopTypeProps_zh"
          draggable
        ></el-tree>
      </el-form-item>

      <el-form-item prop="store_expect_amt" :label="$t('merchant.newMerchant.form.expected_volume_transactions')">
        <el-input v-model.trim="storeModel.store_expect_amt"></el-input>
      </el-form-item>

      <el-form-item prop="store_expect_count" :label="$t('merchant.newMerchant.form.expected_couut_transactions')">
        <el-input v-model.trim="storeModel.store_expect_count"></el-input>
      </el-form-item>

      <el-form-item prop="store_address" :label="$t('merchant.newMerchant.form.addressT')">
        <el-input v-model.trim="storeModel.store_address"></el-input>
      </el-form-item>

      <el-form-item prop="store_post" :label="$t('merchant.newMerchant.form.postal_code')">
        <el-input v-model.trim="storeModel.store_post"></el-input>
      </el-form-item>

      <el-form-item prop="store_city" :label="$t('merchant.newMerchant.form.city')">
        <el-input v-model.trim="storeModel.store_city"></el-input>
      </el-form-item>

      <el-form-item prop="store_country" :label="$t('merchant.newMerchant.form.country')">
        <el-select v-model="storeModel.store_country">
          <el-option :label="$t('shop.newStore.Ger')" value="DE"></el-option>
          <el-option :label="$t('shop.newStore.CZ')" value="CZ"></el-option>
        </el-select>
      </el-form-item>

      <h3>{{$t('merchant.detail.rates.setitle')}}</h3>

      <el-form-item prop="store_iban" :label="$t('merchant.newMerchant.form.accountH')">
        <el-input v-model.trim="storeModel.store_iban"></el-input>
      </el-form-item>

      <el-form-item prop="store_bic" :label="$t('merchant.newMerchant.form.bic')">
        <el-input v-model.trim="storeModel.store_bic"></el-input>
      </el-form-item>
    </el-form>
    <footer>
      <el-button @click="next" :disabled="isLoading">{{$t('common.done')}}</el-button>
    </footer>
  </div>
</template>
<script>
  /* eslint-disable */
  import _ from 'lodash';
  import config from 'config';
  import axios from 'axios';
  import qs from 'qs';
  const getParams = (key) => {
    // 获取参数
    let url = window.location.hash.split('?')[1] || '';
    // 正则筛选地址栏
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    // 匹配目标参数
    let result = url.match(reg)
    // 返回参数值
    return result ? decodeURIComponent(result[2]) : ''
  }
  export default {
    data() {
      const checkName = (rule, value, callback) => {
      axios
        .get(`${config.host}/org/v1/store/check`, {
          params: {
            nickname: value,
            format: "cors"
          }
        })
        .then(res => {
          if (res.data.respcd !== config.code.OK) {
             callback(new Error(this.$t("merchant.newMerchant.rule45")));
          } else {
             callback();
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        });     
      };
      return {
        select: this.$i18n.locale,
        pid_select: [],
        list: [],
        list_Select: [],
        shopTypes: [], // 门店行业列表
        isUpdate: false,
        isLoading: false,
        isAllow: false,
        shopTypeProps_en: {
          children: 'shoptypes',
          label: 'name_en',
          value: 'id'
        },
        shopTypeProps_zh: {
          children: 'shoptypes',
          label: 'name',
          value: 'id'
        },
        isShowIndustyTree: false,
         // 上传接口
        storeModel: {
          store_shopname: '', // 店铺名称
          unify_mcc: '', // 店铺行业
          store_unify_mcc: '',
          store_expect_amt: '', //预计交易额
          store_expect_count: '',  //预计交易量
          store_address: '', // 门店地址
          store_post: '',  //门店邮编
          store_city: '',   //门店城市
          store_country: '', //门店国家
          store_iban: '', // 银行账号
          store_bic: '', // SWIFT码
          format :'cors'
        },
        storeRules: {
          'store_shopname': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule20')},
            { validator: checkName, trigger: 'blur' }
          ],

          'store_address': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule10')},
          ],

          'unify_mcc': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule9')}
          ],

          'store_expect_amt': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule49')},
            {validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule2')));
                } else {
                  cb();
                }
              }
            }
          ],

          'store_expect_count': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule50')},
            {validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule2')));
                } else {
                  cb();
                }
              }
            }
          ],

           'store_post': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule40')},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule2')));
                } else {
                  cb();
                }
              }
            }
          ],
            
          'store_city': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule41')}
          ],

          'store_country': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule42')}
          ],

          'store_iban': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule17')},
          ],

          'store_bic': [
            {required: true, message: this.$t('merchant.newMerchant.rule19')}
          ],

        }
      }
    },
    created() {
      if (this.$route.query) {
        this.isUpdate = this.$route.query.command === 'edit' || getParams('command') === 'edit';
        // this.storeModel.big_uid = this.$route.query.big_uid;
        this.getPid();
        // this.isUpdate && this.getStoreInfo();
        this.getShopTypes()
      }
    },
    methods: {
      // getStoreInfo() {
      //   axios.get(`${config.host}/org/v1/store/info`, {
      //     params: {
      //       userid: this.$route.query.userid || getParams('userid'),
      //       // type: 'submerchant',
      //       format: 'cors'
      //     }})
      //     .then((res) => {
      //       let data = res.data;
      //       if (data.respcd === config.code.OK) {
      //         let da =  data.data;
      //         // Object.assign(this.storeModel, {
      //         //   short_name: da.userinfo.short_name,
      //         //   store_shopname: da.userinfo.store_shopname,
      //         //   store_address: da.userinfo.store_address,
      //         //   operating: da.userinfo.operating,
      //         //   headbankname: da.bankinfo.headbankname, // 开户行名称
      //         //   bankuser: da.bankinfo.bankuser, // 开户行
      //         //   store_iban: da.bankinfo.store_iban, // 银行账号
      //         //   bankProvince: da.bankinfo.bankProvince, // 银行地址
      //         //   store_bic: da.bankinfo.store_bic, // SWIFT码
      //         //   remit_amt: da.userinfo.remit_amt, // 结算资金起点
      //         // });
      //         this.storeModel = {...da.base,...da.ext}
      //         this.list_Select = da.chnl.pid_info;
      //       } else {
      //         this.$message.error(data.respmsg);
      //       }
      //     }).catch(() => {
      //     this.$message.error(this.$t('common.netError'));
      //   });
      // },

      cancelHandler() {
        this.$router.push({name: 'shop_manage_list'})
      },

      IndustyhandleNodeClick(data, node) {
        if(data.level ===3) {
            this.storeModel.store_unify_mcc = data.id;
            this.isShowIndustyTree = false;
            this.select === 'en-us'?this.storeModel.unify_mcc = data.name_en:this.storeModel.unify_mcc = data.name;
        }
      },

      showIndustyTreeComponent(e) {
        this.isShowIndustyTree = !this.isShowIndustyTree;
      },

      getShopTypes(){
        axios.get(`${config.host}/org/tools/get_shop_types`, {
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
                this.shopTypes = data.data.shop_types;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
          })
      },

      next() {
        if(this.list_Select.length === 0) {
            this.$message.error(this.$t('merchant.newMerchant.requiredRule.rule25'))
        }else {
          this.$refs['store-form'].validate((valid) => {
            if (valid) {
              if (this.isUpdate) {
                this.confirm()
              } else {
                this.commit()
              }
            }
          })
        }
      },
 
      confirm() {
        this.$confirm(this.$t('common.sure'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.commit()
        }).catch(() => {
        })
      },

      commit() {
        let params = Object.assign({}, this.storeModel)
        params.mchnt_ratios = this.list_Select;
        params.big_uid = this.$route.query.big_uid || getParams('big_uid')
        let url = this.isUpdate ? `${config.host}/org/mchnt/sub/edit` : `${config.host}/org/v1/store/signup`;
        if (this.isUpdate) {
          params.type = 'submerchant';
        }
        this.isLoading = true;
        axios.post(url, JSON.stringify(params), {
          headers: {
            'Content-Type': 'application/json'
          }
          })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message.success(this.isUpdate ? this.$t('common.updateSuccess') : this.$t('common.createSuccess'))
              this.$router.push({
                name: 'shopDetail',
                query: {userid: data.data.submchnt, from: (this.isUpdate ? 'edit' : 'new')}
              })
            } else {
              this.$message.error(data.respmsg);
            }
            this.isLoading = false;
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
          this.isLoading = false;
        });
      },

      // 商户自动入网获取通道pid配置信息
      getPid() {
        axios.get(`${config.host}/org/tools/get_pid_info?format=cors`).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.list = res.data.data
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },

      addList() {
        let pid_select = this.pid_select;
        let pid_select_array = [];
        this.list_Select.forEach(element => {
          pid_select_array.push(element.pid_name)
        })
        this.list.forEach(element => {
          if(pid_select_array.indexOf(pid_select) > -1){
            this.$message.error(this.$t('common.payTip'));
          }else if(element.pid_name === pid_select){
            this.list_Select.push(element)
          }
        })
      },

      // 支付通道点击减号
      pid_name_remove(pid_name) {
        let new_list_select = this.list_Select.filter(element => {
          return element.pid_name !== pid_name
        });
        this.list_Select = new_list_select;
      }
    }
  }
</script>
<style lang="scss">
  .new-store {
    background-color: #fff;
    padding: 0 30px 20px 30px;
    .el-form {
      background-color: #F7F9FA;
      margin-top: 30px;
      margin-bottom: 24px;
      padding: 30px;
      .el-loading-mask {
        width: 300px;
      }
      h3 {
        position: relative;
        padding: 12px 0;
        margin: 0 0 20px;
        font-size: 20px;
        color: #1D1D24;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 2px;
          background-color: #232629;
        }
      }
      .sub-account-item-info {
        position: relative;
        #op_type {
          text-align: left;
        }
        .el-input-group__append {
          padding:0 !important;
          .tree-indic {
            width: 32px;
            height: 30px;
            line-height: 32px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
          }
        }
        .el-input__icon {
          position: absolute;
          width: 35px;
          height: 100%;
          right: 0;
          top: 0;
          text-align: center;
          color: #d9d0bf;
          transition: all .3s;
        }
      }
      .el-form-item {
        width: 280px;
        display: inline-block;
        vertical-align: top;
        .el-form-item__content {
          width: 280px;
          .rate_label {
            font-size: 14px;
            color: #717283;
            padding: 0 $smGap;
          }
        }
      }
      .el-form-item.memo {
        width: 940px;
        .el-form-item__content {
          width: 100%;
        }
      }
      .uploader-wrap {
        padding-top: 20px;
      }
      .upload-label {
        color: grey;
        font-size: 14px;
        height: 204px;;
        width: 100%;
        display: flex;
        align-items: center;
      }
      .up-item {
        margin-right: 24px;
      }
      .image_info {
        font-size: 14px;
        color: #8a8c92;
        height: 16px;
        line-height: 16px;
        padding: 10px 0;
        text-align: center;
        width: 285px;
        .down-doc {
          color: #FE9B20;
          text-decoration: underline;
          text-decoration-color: #FE9B20;
          font-style: italic;
        }
      }
      .avatar-wrap {
        position: relative !important;
        .avatar {
          width: 285px;
          border: 1px dashed #CCCCD5;
          height: 214px;
          display: block;
        }
        .img-tip {
          width: 285px;
          height: 214px;
          line-height: 214px;
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.5);
          display: none;
          z-index: 9999;
          font-size: 16px;
        }
        &:hover .img-tip {
          display: block;
          /*animation: growUp .5s ease;*/
          -webkit-animation-name: growUp;
          -webkit-animation-duration: 500ms;
          -webkit-animation-iteration-count: 1;
          -webkit-animation-timing-function: ease-in-out;
        }
        @-webkit-keyframes growUp {
          0% {
            height: 0px;
          }
          100% {
            height: 100%;
          }
        }
      }
      .avatar-uploader {
        display: inline-block;
        vertical-align: top;
        margin: 15px 15px 0 0;
      }
      .avatar-uploader-wrap {
        width: 285px;
        height: 214px;
        background-color: #f2f2f2;
        text-align: center;
        border: 1px dashed #CCCCD5;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        .avatar-uploader-icon {
          width: 50px;
          height: 50px;
          display: inline-block;
          border-radius: 50%;
          line-height: 50px;
          text-align: center;
          border: 1px dashed #c2c2c2;
          color: #c2c2c2;
          font-size: $bigSize;
        }
        .avatar-desc {
          font-size: $baseSize;
          color: #8a8c92;
          padding-top: $smGap
        }
        .avatar-tip {
          color: #bdbdbd;
          font-size: $baseSize;
        }

      }
    .el-tree {
      overflow-x: scroll;
      padding: 5px 12px 5px 5px;
      position: absolute;
      min-width: 100%;
      z-index: 99;
      margin-top: 6px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    }
    .payList {
      .icon_remove {
        .el-form-item__content {
          font-size: 24px;
          .el-icon-remove {
            color: #409EFF;
          }
        }
      }
    }
      footer {
      text-align: center;
    }
  }
</style>
