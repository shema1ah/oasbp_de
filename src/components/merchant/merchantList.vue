<template>
  <div class="merchant">
    <header class="page-header">
      <h2 class="page-title">{{$t('merchant.title')}}</h2>
      <div>
        <el-button
          size="large"
          type="primary"
          @click="createMerchant"
          v-if="authData.includes('mchnt_manage_create')"
        >{{$t('merchant.create')}}</el-button>
        <el-button
          style="margin-left:6px;"
          size="large"
          type="primary"
          @click="patchImport"
          v-if="authData.includes('mchnt_manage_batch_create')"
        >{{$t('merchant.patchImport')}}</el-button>
      </div>
    </header>
    <el-form class="search-form" :model="formData" ref="mchnt_list_form">
      <el-form-item :label="$t('merchant.form.mchtid')" prop="userid">
        <el-input v-model="formData.userid"></el-input>
      </el-form-item>
      <el-form-item :label="$t('merchant.form.mchtname')" prop="shopname">
        <el-input v-model="formData.shopname"></el-input>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.agent1')" prop="qd_uid">
        <el-select v-model="formData.qd_uid" @change="selectChannelHandler">
          <el-option
            :label="item.name"
            :value="item.qd_uid"
            v-for="item in channels"
            :key="item.qd_uid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.agent2')" prop="qd_uid2">
        <el-select v-model="formData.qd_uid2" :placeholder="$t('merchant.form.ph')">
          <el-option
            :label="item.name"
            :value="item.qd_uid"
            v-for="item in channels2"
            :key="item.qd_uid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.audit_state')" prop="status">
        <el-select v-model="formData.status">
          <el-option
            :label="item.name"
            :value="item.val"
            v-for="item in statusList"
            :key="item.val"
          ></el-option>
        </el-select>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table
      :data="merchents"
      stripe
      v-loading="isLoading"
      class="table-hover"
      @cell-click="selectCurrentRowHandler"
    >
      <el-table-column prop="userid" :label="$t('merchant.table.mchtid')" min-width="120"></el-table-column>
      <el-table-column prop="shopname" :label="$t('merchant.table.mchtname')" min-width="100"></el-table-column>
      <el-table-column prop="mcc_str" :label="$t('merchant.table.industry')" min-width="140"></el-table-column>
      <el-table-column prop="source" :label="$t('merchant.table.source')" min-width="100"></el-table-column>
      <el-table-column prop="qd_name" :label="$t('merchant.table.agent1')" min-width="100"></el-table-column>
      <el-table-column prop="username" :label="$t('merchant.table.account')" min-width="100"></el-table-column>
      <el-table-column prop="user_type" :label="$t('audit.table.cate')" min-width="100">
        <template slot-scope="scope">{{ merchantTypeList[scope.row.user_type] }}</template>
      </el-table-column>
      <el-table-column :label="$t('merchant.table.type')" min-width="130">
        <template slot-scope="scope">{{ cate[scope.row.cate] }}</template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.store')" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="shopList(scope.row.userid)">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="detail" :label="$t('merchant.table.detail')" min-width="80">
        <template slot-scope="scope">
          <el-button type="text">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" :label="$t('merchant.table.merstatus')" min-width="80">
        <template slot-scope="scope">
          <el-button type="text">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="$t('merchant.table.merstatus')"
      :visible.sync="statusDialogVisible"
      width="40%"
      center
    >
      <ul class="merchant-status">
        <li
          :class="{'el-icon-caret-bottom' : n , 'complete-status' : n < signup_status}"
          v-for="(i,n) in merStatusList"
          :key="n"
        >{{i}}</li>
        <p
          v-if="signup_error_msg"
          @click="err_msg_toggle = !err_msg_toggle"
          :class="{'err-msg-toggle' : err_msg_toggle}"
        >{{`(${signup_error_msg})`}}</p>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="statusDialogVisible = false">{{ $t('common.close') }}</el-button>
      </span>
    </el-dialog>

    <el-pagination
      v-show="merchents.length > 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
    ></el-pagination>
  </div>
</template>
<script>
import config from "config";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isLoading: false,
      statusDialogVisible: false,
      signup_status: 0,
      formData: {
        shopname: "",
        userid: "",
        qd_uid: "",
        qd_uid2: "",
        qd_name: "",
        qd_name2: "",
        status: ""
      },
      merchents: [],
      channels: [],
      channels2: [],
      statusList: [
        { name: this.$t("common.enable"), val: 3 },
        { name: this.$t("common.disable"), val: 4 }
      ],
      isSigned: {
        "3": this.$t("common.enable"),
        "4": this.$t("common.disable"),
        "-1": this.$t("common.audit"),
        "0": this.$t("common.refuse"),
        "5": this.$t("common.toSubmit")
      },
      cate: {
        merchant: this.$t("merchant.detail.cate.merchant"),
        bigmerchant: this.$t("merchant.detail.cate.big"),
        submerchant: this.$t("merchant.detail.cate.sub")
      },
      merchantTypeList: {
        2: this.$t("merchant.newMerchant.form.personal"),
        3: this.$t("merchant.newMerchant.form.enterprise")
      },
      merStatusList: [
        this.$t("merchant.table.bank"),
        this.$t("merchant.table.creating"),
        this.$t("merchant.table.creatsucc")
      ],
      signup_succ: false,
      err_msg_toggle: true,
      signup_error_msg: "",
      total: 0,
      pageSize: 10,
      currentPage: 0
    };
  },
  computed: {
    authData() {
      return this.$store.state.permissionData;
    }
  },
  created() {
    this.fetchData();
    this.getChannelList();
  },
  methods: {
    shopList(mchntId) {
      this.$router.push({
        path: "shop_manage_list/",
        query: { userid: mchntId, from: "old" }
      });
    },

    // 获取1级渠道列表
    getChannelList() {
      axios
        .get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: "",
            status: 3,
            format: "cors"
          }
        })
        .then(res => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.channels = data.data.list;
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        });
    },

    // 获取渠道列表数据
    selectChannelHandler(groupid) {
      this.formData.qd_uid2 = "";
      groupid &&
        axios
          .get(`${config.host}/org/tools/qudao/list`, {
            params: {
              groupid: groupid,
              status: 3,
              format: "cors"
            }
          })
          .then(res => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.channels2 = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          })
          .catch(() => {
            this.$message.error(this.$t("common.netError"));
          });
    },

    // 获取商户列表数据
    fetchData(query) {
      if (query) {
        this.currentPage = 0;
      }
      let p = {
        shopname: this.formData.shopname,
        userid: this.formData.userid,
        qd_uid: this.formData.qd_uid,
        status: this.formData.status,
        qd_name: "",
        page: this.currentPage > 0 ? this.currentPage - 1 : this.currentPage,
        page_size: this.pageSize,
        format: "cors"
      };
      if (this.formData.qd_uid2) {
        p.qd_uid = this.formData.qd_uid2;
      }
      this.isLoading = true;
      axios
        .get(`${config.host}/org/mchnt/list`, {
          params: p
        })
        .then(res => {
          let data = res.data;
          this.isLoading = false;
          if (data.respcd === config.code.OK) {
            this.merchents = data.data.mchnt_infos;
            this.total = data.data.mchnt_cnt;
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t("common.netError"));
        });
    },

    // 表单重置
    reset() {
      this.$refs["mchnt_list_form"].resetFields();
      this.channels2 = [];
    },

    // 商户进件/新建商户
    createMerchant() {
      this.$router.push({ path: "mchnt_manage_list/mchnt_create" });
    },

    // 批量进件
    patchImport() {
      this.$router.push({ path: "mchnt_manage_list/batch_import" });
    },

    // 选择列表项，进入详情页
    selectCurrentRowHandler(row, column) {
      if (column.property === "detail") {
        this.$router.push({
          name: "mchntDetail",
          query: { userid: row.userid, from: "old" }
        });
      } else if (column.property === "status") {
        axios
          .get(`${config.host}/org/v1/mchnt/audit_status`, {
            params: {
              userid: row.userid,
              user_type: row.user_type,
              format: "cors"
            }
          })
          .then(res => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.signup_error_msg = data.data.error_msg;
              switch (data.data.signup_status) {
                case 4:
                  this.signup_status = 3;
                  this.signup_succ = true;
                  break;
                case 3:
                  this.signup_status = 2;
                  break;
                default:
                  this.merStatusList[2] = this.$t("merchant.table.creatFailed");
                  this.signup_status = 3;
              }
            } else {
              this.$message.error(data.respmsg);
            }
          })
          .catch(() => {
            this.$message.error(this.$t("common.netError"));
          });
        this.statusDialogVisible = true;
      }
    },

    handleSizeChange(size = 10) {
      this.pageSize = size;
      this.handleCurrentChange();
    },

    handleCurrentChange(current) {
      if (current) {
        this.currentPage = current;
      } else {
        this.currentPage = 0;
      }
      this.fetchData();
    }
  }
};
</script>
<style lang="scss">
.merchant {
  .table-hover .el-table__row {
    cursor: pointer;
  }
}
.merchant-status {
  margin: 0 auto;
  padding: 0;
  li {
    list-style: none;
    text-align: center;
    display: block;
    position: relative;
    margin: 40px auto 0;
    font-size: 18px;
    color: $submenu-font-color;
  }
  p {
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
    color: #2974ff;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .err-msg-toggle {
    height: 14px;
    white-space: nowrap;
  }
  .el-icon-caret-bottom {
    &::before {
      position: absolute;
      bottom: 20px;
      left: 50%;
      margin-left: -8px;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 30px;
      left: 50%;
      height: 20px;
      border: 1px dashed;
    }
  }
  .complete-status {
    color: $baseColor;
    &::after {
      border: 1px solid;
    }
  }
}
</style>
