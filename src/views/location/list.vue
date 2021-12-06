<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column min-width="150px" label="ชื่อสถานที่">
        <template slot-scope="{row}">
          <router-link :to="'/place/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="รายละเอียด">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="พิกัด (ละติจูด, ลองจิจูด)">
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column label="สถานะ" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.active === '1'" class="is-round" size="medium" type="success">
            ใช้งาน
          </el-button>
          <el-button v-if="row.active === '0'" class="is-round" size="medium">
            ไม่ใช้งาน
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="แก้ไข" width="150">
        <template slot-scope="scope">
          <router-link :to="'/place/edit/'+scope.row.id">
            <el-button class="is-round is-plain" type="primary" size="small" icon="el-icon-edit">
              แก้ไข
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/location'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.results[0].data
        this.total = response.data.totalResults
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
