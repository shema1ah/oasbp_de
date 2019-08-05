<template>
  <div class="shop-detail">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('shop.detail.basic.title')}}</h2>
      <el-button type="text" @click="cancel">
        <i class="el-icon-close"></i>
        <span>{{$t('shop.detail.basic.close')}}</span>
      </el-button>
    </header>
    <section class="basic">
      <div class="banner">
        <div class="title">{{$t('merchant.newMerchant.basic.cap5')}}</div>
        <div class="divider"></div>
      </div>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.table.submchntid')+':'}}</span>
          <span class="basic-content">{{form.base.userid}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la12')}}</span>
          <span class="basic-content">{{form.base.mchid}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la3')}}</span>
          <span class="basic-content">{{form.base.shopname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.newMerchant.form.QFMCC')+':'}}</span>
          <span class="basic-content">{{form.ext.unify_mcc}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <span
            class="basic-label"
          >{{$t('merchant.newMerchant.form.expected_volume_transactions')+':'}}</span>
          <span class="basic-content">{{form.base.expect_amt}}</span>
        </el-col>
        <el-col :span="14">
          <span
            class="basic-label"
          >{{$t('merchant.newMerchant.form.expected_couut_transactions')+':'}}</span>
          <span class="basic-content">{{form.base.expect_count}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
         <span class="basic-label">{{$t('merchant.newMerchant.form.addressT')+':'}}</span>
          <span class="basic-content">{{form.base.address}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.newMerchant.form.postal_code')+':'}}</span>
          <span class="basic-content">{{form.base.post}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.newMerchant.form.city')+':'}}</span>
          <span class="basic-content">{{form.base.city}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.newMerchant.form.country')+':'}}</span>
          <span class="basic-content">{{form.ext.country}}</span>
        </el-col>
      </el-row>
    </section>

    <section class="payment">
      <div class="banner">
        <div class="title">{{$t('merchant.newMerchant.basic.cap4')}}</div>
        <div class="divider"></div>
      </div>

      <div v-for="item in form.chnl.pid_info" :key="item.pid_name">
        <h3>{{item.pid_name}}</h3>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.ratio')}}:</span>
            <span class="basic-content">{{item.ratio}}</span>
          </el-col>
          <el-col :span="8" v-if="item.line_type !== ''">
            <span class="basic-label">{{$t('merchant.newMerchant.form.accessType')}}:</span>
            <span class="basic-content">{{accessType[item.line_type]}}</span>
          </el-col>
          <el-col :span="8" v-if="item.finance_type !== ''">
            <span class="basic-label">{{$t('merchant.newMerchant.form.applicationType')}}:</span>
            <span class="basic-content">{{applicationType[item.finance_type]}}</span>
          </el-col>
        </el-row>
      </div>
    </section>

    <section class="rates">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.rates.setitle')}}</div>
        <div class="divider"></div>
      </div>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.newMerchant.form.accountH')}}:</span>
          <span class="basic-content">{{form.base.iban}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.newMerchant.form.bic')}}:</span>
          <span class="basic-content">{{form.base.bic}}</span>
        </el-col>
      </el-row>
    </section>

    <!-- <footer v-if="isEditable && form.userinfo.is_edit">
      <el-button @click="editHandler">{{$t('merchant.detail.edit')}}</el-button>
    </footer>
    <footer v-if="isReEditable && form.userinfo.is_edit">
      <el-button @click="editHandler">{{$t('merchant.detail.redit')}}</el-button>
      <el-button @click="cancel">{{$t('merchant.detail.basic.close')}}</el-button>
    </footer>-->
  </div>
</template>
<script>
import config from "config";
import axios from "axios";
import _ from "lodash";
const getParams = key => {
  // 获取参数
  let url = window.location.hash.split("?")[1] || "";
  // 正则筛选地址栏
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  // 匹配目标参数
  let result = url.match(reg);
  // 返回参数值
  return result ? decodeURIComponent(result[2]) : "";
};
export default {
  data() {
    return {
      isLoading: false,
      isEditable: false,
      isReEditable: false,
      form: {
        ext: {
          country: "",
          unify_mcc: ""
        },
        base: {
          shopname: "",
          userid: this.$route.query.userid || getParams("userid"),
          address: "",
          city: "",
          expect_amt: "",
          foundation_date: "",
          bic: "",
          iban: "",
          post: "",
          expect_count: ""
        },
        chnl: {
          pid_info: [
            {
              qf_pid: "",
              pid_name: "",
              busicd: "",
              currency: "",
              wx_appid: "",
              chnl_code: "",
              chnlname: "",
              country: "",
              line_type: "",
              chnlid: "",
              sign: "",
              type: "",
              finance_type: ""
            }
          ]
        }
      },
      accessType: {
        offline: this.$t("merchant.newMerchant.accessTypes.offline"),
        online: this.$t("merchant.newMerchant.accessTypes.online")
      },
      applicationType: {
        direct: this.$t("merchant.newMerchant.applicationTypes.direct"),
        indirect: this.$t("merchant.newMerchant.applicationTypes.indirect")
      }
    };
  },
  created() {
    this.isEditable = "old".indexOf(this.$route.query.from) > -1;
    this.isReEditable = this.$route.query.from === "edit";
    this.fetchDetailData();
  },
  methods: {
    cancel() {
      this.$router.push({ name: "shop_manage_list" });
    },
    editHandler() {
      this.$router.push({
        name: "createStore",
        query: { command: "edit", userid: this.userid }
      });
    },
    fetchDetailData() {
      axios
        .get(`${config.host}/org/v1/store/info`, {
          params: {
            userid: this.form.base.userid,
            // type: 'submerchant',
            format: "cors"
          }
        })
        .then(res => {
          let data = res.data;
          this.isLoading = false;
          if (data.respcd === config.code.OK) {
            this.form = data.data;
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t("common.netError"));
        });
    }
  }
};
</script>
<style lang="scss">
.shop-detail {
  background-color: #fff;
  padding: 0 $baseGap $baseGap $baseGap;
  min-height: 600px;
  .noborder {
    border: none !important;
  }
  footer {
    padding-top: $baseGap;
  }
  .banner {
    padding: 28px $baseGap 0 0;
    margin-bottom: $miderGap;
    .title {
      font-size: $bigSize;
      font-weight: bold;
      color: #1d1d24;
    }
    .divider {
      width: 50px;
      height: 2px;
      margin-top: $miderGap;
      background-color: #232629;
    }
  }

  .basic,
  .shop,
  .rates,
  .payment {
    .el-row {
      padding: $smGap 0 0 0;
      .basic-label {
        font-size: $baseSize;
        font-weight: $bolderW;
        color: rgba(29, 29, 36, 1);
        vertical-align: top;
        line-height: 14px;
      }
      .basic-content {
        margin-left: $smGap;
        font-size: $baseSize;
        font-weight: $baseW;
        color: #717283;
        line-height: $baseSize;
        vertical-align: top;
      }
      .basic-content-p {
        font-size: $baseSize;
        font-weight: $baseW;
        color: #717283;
        line-height: $baseSize;
        .voucher_photo {
          width: 200px;
          height: 150px;
          display: inline-block;
          margin-right: $smGap;
        }
      }
    }
  }
  .payment {
    .voucher_photo {
      width: 200px;
      height: 150px;
      display: inline-block;
      margin-left: $smGap;
    }
  }
}
</style>
