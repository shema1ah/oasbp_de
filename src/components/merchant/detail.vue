<template>
  <div class="mchnt-detail">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('merchant.detail.basic.title')}}</h2>
      <el-button type="text" @click="cancel">
        <i class="el-icon-close"></i>
        <span>{{$t('merchant.detail.basic.close')}}</span>
      </el-button>
    </header>
    <section class="basic clearfix">
      <div class="banner">
        <div class="title">{{isBusiness ? $t('merchant.newMerchant.basic.cap1') : $t('merchant.newMerchant.basic.cap7')}}</div>
        <div class="divider"></div>
      </div>
   
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.channel')+':'}}</span>
          <span class="basic-content">{{form.base.first_agent}}</span>
        </el-col>
        <!-- <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.channel2')+':'}}</span>
          <span class="basic-content">{{form.base.second_agent}}</span>
        </el-col> -->
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.contact')+':'}}</span>
          <span class="basic-content">{{form.base.sls_name}}</span>
        </el-col>
      
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.foundation_date')+':'}}</span>
          <span class="basic-content">{{form.base.foundation_date}}</span>
        </el-col>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.reg_number')+':'}}</span>
          <span class="basic-content">{{form.base.licensenumber}}</span>
        </el-col>
        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.reg_issuer')+':'}}</span>
          <span class="basic-content">{{form.base.license_name}}</span>
        </el-col>
<!--     
      <el-row v-if="this.isBusiness">
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.industry')+':'}}</span>
          <span class="basic-content width-limit">{{form.base.industry}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.industry_key')+':'}}</span>
          <span class="basic-content width-limit">{{form.base.industry_key}}</span>
        </el-col>
      </el-row> -->

     
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.country')+':'}}</span>
          <span class="basic-content">{{form.ext.country}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.city')+':'}}</span>
          <span class="basic-content">{{form.base.city}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.addressT')+':'}}</span>
          <span class="basic-content">{{form.base.address}}</span>
        </el-col>


      
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.postal_code')+':'}}</span>
          <span class="basic-content">{{form.base.post}}</span>
        </el-col>
        <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.mertype')+':'}}</span>
          <span class="basic-content">{{form.base.mchnt_type}}</span>
        </el-col>
        <!-- <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.sector')+':'}}</span>
          <span class="basic-content width-limit">{{form.base.sector}}</span>
        </el-col> -->
          <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.business_purpose')+':'}}</span>
          <span class="basic-content">{{form.base.business_purpose}}</span>
        </el-col>
     

 
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.first_name')+':'}}</span>
          <span class="basic-content">{{form.base.first_name}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.last_name')+':'}}</span>
          <span class="basic-content">{{form.base.last_name}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.date_of_birth')+':'}}</span>
          <span class="basic-content">{{form.base.birthday}}</span>
        </el-col>

        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.salutation')+':'}}</span>
          <span class="basic-content">{{form.base.salutation}}</span>
        </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.title')+':'}}</span>
          <span class="basic-content">{{form.base.title}}</span>
        </el-col>
        <!-- <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.empeoyment_sataus')+':'}}</span>
          <span class="basic-content">{{form.base.empeoy_status}}</span>
        </el-col> -->

           <el-col :span="8">
          <span class="basic-label">{{isBusiness ? $t('merchant.newMerchant.form.business_email') : $t('merchant.newMerchant.form.postT') +':'}}</span>
          <span class="basic-content">{{form.base.email}}</span>
        </el-col> 
   
          <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.id_type') +':'}}</span>
          <span class="basic-content">{{form.base.idnumber ? $t('merchant.newMerchant.form.id_card') : $t('merchant.newMerchant.form.pass_card')}}</span>
        </el-col>

         <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.idnumber')+':'}}</span>
          <span class="basic-content">{{form.base.idnumber ? form.base.idnumber : form.ext.passport}}</span>
        </el-col>

        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.concatNumber')+':'}}</span>
          <span class="basic-content">{{form.ext.person_mobile}}</span>
        </el-col>
      

        <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.bigMerchant')+':'}}</span>
          <span class="basic-content">{{cate[form.base.cate]}}</span>
        </el-col>
      <el-col :span="8" v-if="this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.meiname')+':'}}</span>
          <span class="basic-content">{{form.base.name}}</span>
      </el-col>
        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.nationality')+':'}}</span>
          <span class="basic-content">{{form.base.nation}}</span>
        </el-col>
         <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.website')+':'}}</span>
          <span class="basic-content">{{form.ext.website}}</span>
        </el-col>

   
         <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('merchant.newMerchant.form.videoURL')+':'}}</span>
          <span class="basic-content width-limit">{{form.ext.url}}</span>
        </el-col>

        <el-col :span="8" v-if="!this.isBusiness">
          <span class="basic-label">{{$t('common.status')+':'}}</span>
          <span class="basic-content status-width">{{form.base.person_status}}</span>
          <el-button style="padding : 0" v-if="sendable" :loading="resendLoding" type="text" @click="sendEmail()">{{$t('common.resend')}}</el-button>
        </el-col>
    </section>

    <!-- 股东信息 -->
    <section class="basic" v-if="this.isBusiness">
      <div class="banner">
        <div class="title">{{$t('merchant.newMerchant.basic.cap2')}}</div>
        <div class="divider"></div>
      </div>
      <div class="list-gap clearfix" v-for="(n,i) in form.base.owners" :key="i">

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
   
    
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.salutation')+':'}}</span>
            <span class="basic-content">{{n.salutation}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.title')+':'}}</span>
            <span class="basic-content">{{n.title}}</span>
          </el-col>
         <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.empeoyment_sataus')+':'}}</span>
            <span class="basic-content">{{n.empeoy_status}}</span>
          </el-col>
  
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.country')+':'}}</span>
            <span class="basic-content">{{n.country}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.city')+':'}}</span>
            <span class="basic-content">{{n.city}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.addressT')+':'}}</span>
            <span class="basic-content">{{n.address}}</span>
          </el-col>
  
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postal_code')+':'}}</span>
            <span class="basic-content">{{n.post}}</span>
          </el-col>
         <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postT')+':'}}</span>
            <span class="basic-content">{{n.email}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.concatNumber')+':'}}</span>
            <span class="basic-content">{{n.mobile}}</span>
          </el-col>
     
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.nationality')+':'}}</span>
            <span class="basic-content width-limit">{{n.nation}}</span>
          </el-col>
           <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.vofing_share')+':'}}</span>
            <span class="basic-content">{{n.vofing}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.id_type')+':'}}</span>
            <span class="basic-content">{{id_type[n.id_type]}}</span>
          </el-col>
  
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.idnumber')+':'}}</span>
            <span class="basic-content">{{n.idnumber}}</span>
          </el-col>
           <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.legal_rep')+':'}}</span>
            <span class="basic-content">{{is_legal[n.is_legal]}}</span>
          </el-col>
          <el-col :span="8" v-if="n.is_legal === '1' || n.is_legal === '2'">
            <span class="basic-label">{{$t('merchant.newMerchant.form.represeutation')+':'}}</span>
            <span class="basic-content">{{n.represe}}</span>
          </el-col>
         <el-col :span="8" v-if="n.is_legal === '1' || n.is_legal === '2'">
          <span class="basic-label">{{$t('merchant.newMerchant.form.videoURL')+':'}}</span>
          <span class="basic-content width-limit">{{n.url}}</span>
        </el-col>
          <el-col :span="8" v-if="n.is_legal === '1' || n.is_legal === '2'">
            <span class="basic-label">{{$t('common.status')+':'}}</span>
            <span class="basic-content status-width">{{n.legal_status}}</span>
            <el-button style="padding : 0" v-if="n.sendable" :loading="n.resendLoding" type="text" @click="sendEmail(true, n)">{{$t('common.resend')}}</el-button>
          </el-col>
    
      </div>
    </section>

    <section class="basic" v-if="this.isBusiness">
      <div class="banner">
        <div class="title">{{$t('merchant.newMerchant.basic.cap3')}}</div>
        <div class="divider"></div>
      </div>

      <div class="list-gap clearfix" v-for="(n,i) in form.base.legals" :key="i">
           
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
      
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.salutation')+':'}}</span>
            <span class="basic-content">{{n.salutation}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.title')+':'}}</span>
            <span class="basic-content">{{n.title}}</span>
          </el-col>
         <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.empeoyment_sataus')+':'}}</span>
            <span class="basic-content">{{n.empeoy_status}}</span>
          </el-col>
     
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.country')+':'}}</span>
            <span class="basic-content">{{n.country}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.city')+':'}}</span>
            <span class="basic-content">{{n.city}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.addressT')+':'}}</span>
            <span class="basic-content">{{n.address}}</span>
          </el-col>
      
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postal_code')+':'}}</span>
            <span class="basic-content">{{n.post}}</span>
          </el-col>
         <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.postT')+':'}}</span>
            <span class="basic-content">{{n.email}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.concatNumber')+':'}}</span>
            <span class="basic-content">{{n.mobile}}</span>
          </el-col>
       
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.nationality')+':'}}</span>
            <span class="basic-content width-limit">{{n.nation}}</span>
          </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.represeutation')+':'}}</span>
            <span class="basic-content">{{n.represe}}</span>
          </el-col>
         <el-col :span="8">
          <span class="basic-label">{{$t('merchant.newMerchant.form.videoURL')+':'}}</span>
          <span class="basic-content width-limit">{{n.url}}</span>
        </el-col>
          <el-col :span="8">
            <span class="basic-label">{{$t('common.status')+':'}}</span>
            <span class="basic-content status-width">{{n.legal_status}}</span>
            <el-button style="padding : 0" v-if="n.sendable" :loading="n.resendLoding" type="text" @click="sendEmail(true, n)">{{$t('common.resend')}}</el-button>
          </el-col>
   
     
       
      </div>
    </section>

    <!-- <footer v-if="isReEditable">
      <el-button @click="editHandler">{{$t('merchant.detail.redit')}}</el-button>
      <el-button @click="cancel">{{$t('merchant.detail.basic.close')}}</el-button>
    </footer>
    <footer v-else>
      <el-button v-if="isEditable" @click="editHandler">{{$t('merchant.detail.edit')}}</el-button>
      <el-button v-if="isCreateShop" @click="createShop">{{$t('merchant.detail.createShop')}}</el-button>
    </footer> -->
    <footer>
      <el-button v-if="isCreateShop" @click="createShop">{{$t('merchant.detail.createShop')}}</el-button>
    </footer>
  </div>
</template>
<script>
import config from "config";
import axios from "axios";
import { formatDate } from "../../common/js/util";
import Store from '../../assets/js/store';
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
      resendLoding: false,
      isEditable: false,
      isReEditable: false,
      isCreateShop: false,
      isBusiness: true,
      sendable: false,
      resend_interval: 0,
      userid: this.$route.query.userid || getParams("userid"), // 商户ID
      cate: {
        merchant: this.$t("merchant.detail.cate.merchant"),
        bigmerchant: this.$t("merchant.detail.cate.big")
      },
      id_type: {
        national: this.$t('merchant.newMerchant.form.id_card'),
        passport: this.$t('merchant.newMerchant.form.pass_card')
      },
      is_legal: {
        0: this.$t('merchant.detail.signed.no'),
        1: this.$t('merchant.detail.signed.yes'),
        2: this.$t('merchant.detail.signed.yes')
      },
      form: {
        ext: {
          country: "",
          passport: "",
          website: "",
          url:"",
          person_mobile: "",  // 手机号码
          unify_mcc: ""
        },
        base: {
          sector: "",
          first_name: "",
          last_name: "",     
          mchnt_type: "", 
          city: "",
          post: "", 
          foundation_date: "", 
          name: "",
          user_type: "",
          address: "",
          first_agent: "",
          // second_agent: "",
          sls_uid: "", // 业务员id
          sls_name: "",
          email: "",   // 邮箱
          cate: "",
          licensenumber: "",
          license_name: "",
          birthday: "",  // 生日
          nation: "",  // 国籍  
          // empeoy_status: "", //就业状态
          business_purpose: "",
          license_name: "",
          licensenumber: "",
          idnumber: "",
        // industry: "",
        // industry_key: ""
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
              legal_status: "",
              person_id: "",
              userid: "",
              url_time: "",
              url: "",
              email: ""
            }
          ],
        },
      }
    };
  },
  created() {
    this.isEditable = this.$route.query.from === "old";
    this.isReEditable = this.$route.query.from === "edit";
    this.fetchDetailData();
    this.resend_interval = Store.get('configList').resend_interval 
  },
  methods: {
    cancel() {
      this.$router.push({ name: "mchnt_manage_list" });
    },
    editHandler() {
      this.$router.push({
        name: "mchntCreate",
        query: {
          command: "edit",
          userid: this.userid,
          qd_uid: this.qd_uid
        }
      });
    },
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
          if(this.isBusiness){
             this.form.base.legals.forEach(i => {
             i.sendable = this.dateCount(i) && i.legal_status !== 'successful'
             i.resendLoding = false
            });
            this.form.base.owners.forEach(i => {
              if (i.is_legal === "1" || i.is_legal === "2"){
               i.sendable = this.dateCount(i) && i.legal_status !== 'successful'
              i.resendLoding = false
              }
            })
          }else{
           this.sendable = this.dateCount() && this.form.base.person_status !== 'successful'
          }
                   
            this.form.base.foundation_date = formatDate(
              this.form.base.foundation_date,
              "dd/MM/yyyy"
            )
            this.form.base.birthday = formatDate(
              this.form.base.birthday,
              "dd/MM/yyyy"
            )
            this.form.base.owners.forEach(function(i){
            i.birthday = formatDate(
              i.birthday,
              "dd/MM/yyyy"
            );
            })
            this.form.base.legals.forEach(function(i){
            i.birthday = formatDate(
              i.birthday,
              "dd/MM/yyyy"
            );
            })
            this.isCreateShop = this.form.base.cate === "bigmerchant" ? 1 : 0;
            this.isBusiness = this.form.base.user_type === 3 ? true : false;
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t("common.netError"));
        });
  },
      dateCount(n){
      const sdate = n ? new Date(n.url_time) : new Date(this.form.base.url_time); 
      const now = new Date(); 
      const days = now.getTime() - sdate.getTime(); 
      const day = parseInt(days / 1000); 
      　　return day >= this.resend_interval ? 1 : 0;
      },

    sendEmail(isLegal, n) {
      if (isLegal){
         n.resendLoding = true
          this.$forceUpdate()
      }else {
     this.resendLoding = true
      }      
        axios
        .get(`${config.host}/org/v1/mchnt/sendemail`, {
          params: {
            userid: isLegal ? n.userid : this.form.base.userid,
            person_id: isLegal ? n.person_id : this.form.base.person_id,
            email:isLegal ? n.email : this.form.base.email,
            format: "cors"
          }
        })  
        .then(res => {
          let data = res.data;
          if (data.respcd === config.code.OK) { 
            console.log("发送成功")   
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        })
        .finally(() => {
      if (isLegal){
         n.resendLoding = false
          this.$forceUpdate()
      }else {
     this.resendLoding = false
      } 
        })
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
    .el-col {
      padding-top: $smGap;
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
      .status-width {
        margin-right: 10px;
      }
      .width-limit {
        display: inline-flex;
        width: 60%;
        overflow-x: scroll;
        white-space: nowrap;
        scrollbar-width:none;
        &::-webkit-scrollbar { display:none }
      }
    }
  }
  .list-gap {
    margin-bottom: 20px;

  }

  .clearfix {
     overflow: auto;
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
