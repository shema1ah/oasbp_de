<template>
  <div class="login">
      <div class="login-wrap">
        <img class="logo" src="../../assets/common_img/logo.png"/>
        <div class="cap">
          {{$t('login.cap1')}}<br v-if="type != 'zh-cn'"/>{{$t('login.cap2')}}
        </div>
        <div class="desc" v-show="false">
          {{$t('login.desc')}}
        </div>
        <el-form ref="form-login"  :model="form" label-width="0px" class="form-login" :rules="rules">
          <el-form-item :label="$t('login.nameph')" prop="username">
            <el-input type="text" v-model.trim="form.username" :clearable="true" @focus="addNameBorder" @blur="removeNameBorder"></el-input>
          </el-form-item>

          <el-form-item :label="$t('login.passph')" prop="password">
            <el-input v-model.trim="form.password" type="password" :clearable="true" @focus="addPassBorder" @blur="removePassBorder"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="panel-header-btn submit-btn" @click="submitHandler">
              <span class="el-icon-loading" v-if="loading"></span>
              <span v-else>{{$t('login.btn')}}</span>
            </div>
          </el-form-item>
        </el-form>

      </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import qs from 'qs';
  import config from 'config';

  export default {

    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        type: '',
        isNameBorder: false,
        isPassBorder: false,
        loading: false,
        rules: {
          username: [
            { required: true, message: this.$t('login.msg.m1') }
          ],
          password: [
            { required: true, message: this.$t('login.msg.m2') }
          ]
        }
      }
    },
    computed: {

    },
    created() {
      this.type = this.$i18n.locale
    },
    methods: {
      addNameBorder() {
        this.isNameBorder = true;
      },
      removeNameBorder() {
        this.isNameBorder = false;
      },
      addPassBorder() {
        this.isPassBorder = true;
      },
      removePassBorder() {
        this.isPassBorder = false;
      },
      submitHandler() {
        this.$refs['form-login'].validate((valid) => {
          if(!this.loading && valid) {
            let params;
            params = {
              username: this.form.username,
              password: this.form.password,
              format: 'cors'
            };
            this.loading = true;
            axios.post(`${config.host}/org/user/login`, qs.stringify(params), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((res) => {
              this.loading = false;
              let data = res.data;
              if(data.respcd === config.code.OK) {
                let info = data.data || {};
                let userInfo = {
                  username: info.username,
                  userid: info.userid,
                  currency: info.currency_sign || 'HK$'
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                this.$refs['form-login'].resetFields();
                this.$router.push('/main');
              } else {
                this.$message.error(data.resperr);
              }
            }).catch(() => {
              this.loading = false;
//              this.$message.error(this.$t('login.msg.m3'));
            });
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .login {
    width:100%;
    height:100%;
    position: relative;
    background: url(../../assets/common_img/login-bg.png) 0 0 no-repeat #f7f7f7;
    background-size: cover;
    background-position: 100% top;
    overflow: auto;
    .login-wrap {
      width:519px;
      color:#ffffff;
      position: absolute;
      top:20%;
      left:23.4375%;
      .logo {
        display:inline-block;
        width:192px;
        height:36px;
        margin-bottom:40px;
      }
      .cap {
        width:519px;font-size:32px;line-height: 1;padding-bottom: 44px;font-weight: 600;
      }
      .desc {
        width:355px;
        height:74px;
        font-size:16px;
        color:rgba(255,255,255,1);
        line-height:1.3;
        font-weight: 100;
      }
      .form-login {
        width:415px;color:#ffffff;
        .link-wrap > a {
          text-decoration: none;
          color:#ffffff;
        }
        .el-form-item {    margin-bottom: 24px;width: 100%;}
        /*.el-form-item:last-child {margin-bottom: 0;}*/
        .el-form-item__label {
          color: #ffffff;
          font-size:12px;opacity:0.6;
          line-height:16px;
          padding-left:0;
        }
        .el-form-item__label:before,.el-form-item__label:after {
          content: '';
        }
        .el-form-item__content {
          line-height: 32px !important;
          margin-top:10px;
          .el-input {
            background-color: #ffffff;
            border-radius: 4px;
            .el-input__inner {
              background-color: transparent !important;
              border:none !important;
              padding: 0 0 0 10px !important;
              font-size:22px;
              line-height:1;
              height: 36px !important;
              color:#000000;
            }
          }

          .hasBorderBottom {
            border-bottom: 1px solid rgba(93,217,255,1) !important;
          }
        }
        .el-textarea__inner { background-color:transparent !important;border: none;color:#ffffff !important;padding-left:0;}
        .el-textarea.el-input--suffix {
           border-bottom: 1px solid #ffffff;
        }
        .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus {
          border:transparent !important;
          border-bottom: 1px solid white;
        }

        .submit-btn {
          width:184px;height:40px;background-color:#FFD641;color:#3578FF;font-size:20px;border-radius:4px;display:flex;
          justify-content: center;align-items: center;cursor:pointer;
        }
        .el-form-item__error {color:#C8001B;}
      }
    }
  }
</style>
