<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" align="center" style="margin-bottom:30px;">
        <span>{{ profile.M04 }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:30px;">
        <span>{{ profile.M05 + ' '+ profile.M06+ ' '+ profile.M07 }}</span>
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @row-click="clickLink">

      <el-table-column label="รายชื่อ" header-align="center">
        <template slot-scope="{row}">
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <h4>{{ row.M04 }}</h4>
              </el-col>
              <el-col :span="24">
                <span>{{ row.M05 + ' '+ row.M06+ ' '+ row.M07 }}</span>
              </el-col>
            </el-row>
          </el-card>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { setUserDetailData, getUserData } from '@/utils/auth'
import { setOrg } from '@/utils/localStorage'
import { fetchList } from '@/api/member'
import { fetchOrg } from '@/api/org'

export default {
  name: 'ArticleList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      profile: {},
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.profile = JSON.parse(getUserData())
    this.getList()
    this.getOrg()
  },
  methods: {
    clickLink(member) {
      setUserDetailData(member)
      this.$router.push({ path: '/member/detail/' + member.M01 })
    },
    getOrg() {
      fetchOrg().then(response => {
        setOrg(response.data[0])
      })
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
