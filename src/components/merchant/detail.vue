<template>
  <div class="mchnt-detail">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('merchant.detail.basic.title')}}</h2>
      <el-button type="text" @click="cancel">
        <i class="el-icon-close"></i>
        <span>{{$t('merchant.detail.basic.close')}}</span>
      </el-button>
    </header>
    <section class="basic">
      <div class="banner">
        <div class="title">{{$t('merchant.newMerchant.basic.cap1')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.channel')+':'}}</span>
          <span class="basic-content">{{form.base.first_agent}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.channel2')+':'}}</span>
          <span class="basic-content">{{form.base.second_agent}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.contact')+':'}}</span>
          <span class="basic-content">{{form.base.sls_uid}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.bigMerchant')+':'}}</span>
          <span class="basic-content">{{cate[form.base.cate]}}</span>
        </el-col>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.meiname')+':'}}</span>
          <span class="basic-content">{{form.base.shopname}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.mertype')+':'}}</span>
          <span class="basic-content">{{form.special.mchnt_type}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.first_name')+':'}}</span>
          <span class="basic-content">{{form.special.first_name}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.last_name')+':'}}</span>
          <span class="basic-content">{{form.special.last_name}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.foundation_date')+':'}}</span>
          <span class="basic-content">{{form.special.foundation_date}}</span>
        </el-col>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.business_purpose')+':'}}</span>
          <span class="basic-content">{{form.special.business_purpose}}</span>
        </el-col>
         <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.date_of_birth')+':'}}</span>
          <span class="basic-content">{{form.special.birthday}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.nationality')+':'}}</span>
          <span class="basic-content">{{form.special.nation}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.country')+':'}}</span>
          <span class="basic-content">{{form.ext.country}}</span>
        </el-col>
      </el-row>

      <el-row v-if="this.isBusiness">
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.sector')+':'}}</span>
          <span class="basic-content">{{form.special.sector}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.industry')+':'}}</span>
          <span class="basic-content">{{form.special.industry}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.industry_key')+':'}}</span>
          <span class="basic-content">{{form.special.industry_key}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.addressT')+':'}}</span>
          <span class="basic-content">{{form.base.address}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.postal_code')+':'}}</span>
          <span class="basic-content">{{form.ext.post}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.city')+':'}}</span>
          <span class="basic-content">{{form.special.city}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.reg_number')+':'}}</span>
          <span class="basic-content">{{form.special.regi_number}}</span>
        </el-col>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.reg_issuer')+':'}}</span>
          <span class="basic-content">{{form.special.regi_name}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.empeoyment_sataus')+':'}}</span>
          <span class="basic-content">{{form.special.empeoy_status}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.postT')+':'}}</span>
          <span class="basic-content">{{form.base.email}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.concatNumber')+':'}}</span>
          <span class="basic-content">{{form.base.mobile}}</span>
        </el-col>
      </el-row>
    </section>
    <!-- 股东信息 -->
    <section class="basic" v-if="this.isBusiness">
      <div class="banner">
        <div class="title">{{$t('merchant.newMerchant.basic.cap2')}}</div>
        <div class="divider"></div>
      </div>
      <div class="list-gap" v-for="(n,i) in form.special.owners" :key="i">
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.first_name')+':'}}</span>
            <span class="basic-content">{{n.first_name}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.last_name')+':'}}</span>
            <span class="basic-content">{{n.last_name}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.date_of_birth')+':'}}</span>
            <span class="basic-content">{{n.birthday}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.nationality')+':'}}</span>
            <span class="basic-content">{{n.nation}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.addressT')+':'}}</span>
            <span class="basic-content">{{n.address}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postal_code')+':'}}</span>
            <span class="basic-content">{{n.post}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.city')+':'}}</span>
            <span class="basic-content">{{n.city}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.country')+':'}}</span>
            <span class="basic-content">{{n.country}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.empeoyment_sataus')+':'}}</span>
            <span class="basic-content">{{n.empeoy_status}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.vofing_share')+':'}}</span>
            <span class="basic-content">{{n.vofing}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postT')+':'}}</span>
            <span class="basic-content">{{n.email}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.concatNumber')+':'}}</span>
            <span class="basic-content">{{n.mobile}}</span>
          </el-col>
        </el-row>
      </div>
    </section>

    <section class="basic" v-if="this.isBusiness">
      <div class="banner">
        <div class="title">{{$t('merchant.newMerchant.basic.cap3')}}</div>
        <div class="divider"></div>
      </div>

      <div class="list-gap" v-for="(n,i) in form.special.legals" :key="i">
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.first_name')+':'}}</span>
            <span class="basic-content">{{n.first_name}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.last_name')+':'}}</span>
            <span class="basic-content">{{n.last_name}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.date_of_birth')+':'}}</span>
            <span class="basic-content">{{n.birthday}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.nationality')+':'}}</span>
            <span class="basic-content">{{n.nation}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.addressT')+':'}}</span>
            <span class="basic-content">{{n.address}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postal_code')+':'}}</span>
            <span class="basic-content">{{n.post}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.city')+':'}}</span>
            <span class="basic-content">{{n.city}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.country')+':'}}</span>
            <span class="basic-content">{{n.country}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.empeoyment_sataus')+':'}}</span>
            <span class="basic-content">{{n.empeoy_status}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.represeutation')+':'}}</span>
            <span class="basic-content">{{n.represe}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postT')+':'}}</span>
            <span class="basic-content">{{n.email}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.concatNumber')+':'}}</span>
            <span class="basic-content">{{n.mobile}}</span>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- <footer>
      <el-button v-if="isEditable&&!isReEditable&&form.userinfo.is_edit" @click="editHandler">{{$t('merchant.detail.edit')}}</el-button>
      <el-button v-if="isCreateShop&&!isReEditable" @click="createShop">{{$t('merchant.detail.createShop')}}</el-button>
    </footer>-->
    <!-- <footer v-if="isReEditable && form.userinfo.is_edit">
      <el-button @click="editHandler">{{$t('merchant.detail.redit')}}</el-button>
      <el-button @click="cancel">{{$t('merchant.detail.basic.close')}}</el-button>
    </footer>-->
    <footer>
      <el-button v-if="isCreateShop" @click="createShop">{{$t('merchant.detail.createShop')}}</el-button>
    </footer>
  </div>
</template>
<script>
import config from "config";
import axios from "axios";
import { formatDate } from "../../common/js/util";
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
      // isEditable: false,
      // isReEditable: false,
      isCreateShop: false,
      isBusiness: true,
      userid: this.$route.query.userid || getParams("userid"), // 商户ID
      cate: {
        merchant: this.$t("merchant.detail.cate.merchant"),
        bigmerchant: this.$t("merchant.detail.cate.big")
      },
      form: {
        ext: {
          country: "",
          post: "",
          unify_mcc: ""
        },
        base: {
          shopname: "",
          user_type: "",
          address: "",
          first_agent: "",
          second_agent: "",
          sls_uid: "", // 业务员id
          email: "",   // 邮箱
          mobile: "",  // 手机号码
          cate: ""
        },
        special: {
          sector: "",
          city: "",
          regi_number: "",
          regi_name: "",
          first_name: "",     
          last_name: "", 
          birthday: "",  // 生日
          nation: "",  // 国籍  
          empeoy_status: "", //就业状态
          owners: [
            {
              city: "",
              first_name: "",
              last_name: "",
              mobile: "",
              country: "",
              userid: "",
              empeoy_status: "",
              nation: "",
              vofing: "",
              birthday: "",
              is_legal: "",
              address: "",
              represe: "",
              post: "",
              email: ""
            }
          ],
          foundation_date: "",
          industry: "",
          mchnt_type: "",
          business_purpose: "",
          legals: [
            {
              city: "",
              first_name: "",
              last_name: "",
              mobile: "",
              country: "",
              userid: "",
              empeoy_status: "",
              nation: "",
              birthday: "",
              is_legal: "",
              address: "",
              represe: "",
              post: "",
              email: ""
            }
          ],
          industry_key: ""
        }
      }
    };
  },
  created() {
    // this.isEditable = this.$route.query.from === "old";
    // this.isReEditable = this.$route.query.from === "edit";
    this.fetchDetailData();
  },
  methods: {
    cancel() {
      this.$router.push({ name: "mchnt_manage_list" });
    },
    // editHandler() {
    //   this.$router.push({
    //     name: "mchntCreate",
    //     query: {
    //       command: "edit",
    //       userid: this.userid,
    //       qd_uid: this.qd_uid
    //     }
    //   });
    // },
    fetchDetailData() {
      axios
        .get(`${config.host}/org/v1/mchnt/info`, {
          params: {
            userid: this.userid,
            // type: 'bigmerchant',
            format: "cors"
          }
        })
        .then(res => {
          let data = res.data;
          this.isLoading = false;
          if (data.respcd === config.code.OK) {
            this.form = data.data;
            this.form.special.foundation_date = formatDate(
              this.form.special.foundation_date,
              "dd/MM/yyyy"
            );
            this.form.special.owners.forEach(function(i){
            i.birthday = formatDate(
              i.birthday,
              "dd/MM/yyyy"
            );
            })
            this.form.special.legals.forEach(function(i){
            i.birthday = formatDate(
              i.birthday,
              "dd/MM/yyyy"
            );
            })
            this.isCreateShop = this.form.base.cate === "bigmerchant" ? 1 : 0;
            this.isBusiness = this.form.base.user_type === 3 ? true : false;
            // this.isEditable = this.form.userinfo.status !== -1 ? 1 : 0
            // if(this.isReEditable) {
            //   this.isReEditable = this.form.userinfo.status !== -1 ? 1 : 0
            // }
            // if(data.data.userinfo.status == 0) {
            //   this.getAuditResult()
            // }
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t("common.netError"));
        });
    },
    createShop() {
      this.$router.push({
        name: "createStore",
        query: { big_uid: this.userid }
      });
    }
  }
};
</script>
<style lang="scss">
.mchnt-detail {
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
        line-height: $baseSize;
      }
      .basic-content {
        margin-left: $smGap;
        font-size: $baseSize;
        font-weight: $baseW;
        color: #717283;
        line-height: $baseSize;
      }
    }
  }
  .list-gap {
    margin-bottom: 20px;
  }
  .voucher_photo {
    width: 300px;
    height: 200px;
    display: inline-block;
    margin-left: $smGap;
    margin-top: $smGap;
  }
}
</style>
