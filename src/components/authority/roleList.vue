<template>
  <div class="roleList">
    <header class="page-header">
      <h2 class="page-title">角色管理</h2>
      <el-button size="large" type="primary" @click="createRole()">创建</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item label="角色名称">
        <el-input v-model="formData.role_name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="fetchData()">查找</el-button>
        <el-button @click="reset()">重置</el-button>
      </div>
    </el-form>

    <el-table :data="roles" v-loading="isLoading" stripe @row-click="editRole">
      <el-table-column prop="role_name" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="perms" :formatter="formatPerms" label="权限"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" label="状态" width="80"></el-table-column>
    </el-table>

    <el-pagination
      v-show="roles.length > 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script>
  import config from 'config'
  export default {
    data() {
      return {
        isLoading: false,
        formData: {
          role_name: '',
          status: ''
        },
        roles: [],
        perms: [], // 权限
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      formatPerms(row, column, cellValue) {
        let perms = []
        cellValue.map((item) => {
          perms.push(item.descr)
        })
        return perms.join(' \\ ')
      },
      formatStatus(row, column, cellValue) {
        return cellValue === 1 ? '启用' : '停用'
      },
      fetchData() {
        this.isLoading = true
        this.$http(`${config.host}/org/perm/role/list`, {
          params: {
            name: this.formData.role_name,
            status: this.formData.status,
            offset: this.currentPage - 1,
            pageSize: this.pageSize
          }
        })
        .then((res) => {
          this.isLoading = false
          let data = res.data
          this.roles = data.data.list
          this.total = data.data.total
        })
      },
      createRole() {
        this.$router.push({name: 'roleCreate'})
      },
      editRole (row) {
        localStorage.setItem('roleInfo', JSON.stringify(row))
        this.$router.push({
          name: 'roleEdit',
          params: {
            code: row.code
          }
        })
      },
      reset() {
        this.formData.role_name = ''
        this.formData.status = ''
      },
      handleSizeChange(size = 10) {
        this.pageSize = size
        this.handleCurrentChange()
      },
      handleCurrentChange(current) {
        if (current) {
          this.currentPage = current
        } else {
          this.currentPage = 1
        }
        this.fetchData()
      }
    }
  }
</script>
<style lang="scss">
  .roleList {
    .el-table__row {
      cursor: pointer;
    }
  }
</style>