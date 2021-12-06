<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="block">
        <el-select v-model="user" placeholder="เลือกผู้ขับ" style="width: 300px;margin-bottom: 20px;" class="filter-item">
          <el-option v-for="item in userOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="ถึง"
          start-placeholder="ตั้งแต่วันที่"
          end-placeholder="ถึงวันที่"
        />
        <el-button round="true" size="medium" type="primary" @click="getList">
          ตรวจสอบ
        </el-button>
      </div>
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

        <el-table-column min-width="100px" label="วันที่">
          <template slot-scope="{row}">
            <span>{{ row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="เส้นทางที่บันทึกทั้งหมด">
          <template slot-scope="{row}">
            <span>{{ row.locations.length + ' จุด' }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="จุดเก็บขยะทั้งหมด">
          <template>
            <span>{{ placeList.length + ' จุด' }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="ผ่านจุดเก็บขยะทั้งหมด">
          <template slot-scope="{row}">
            <span>{{ row.places.length + ' จุด ' }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="400px" label="รายละเอียดจุดเก็บขยะ">
          <template slot-scope="{row}">
            <el-timeline>
              <el-timeline-item
                v-for="(row, index) in row.places"
                :key="index"
                :color="row.color"
                :timestamp="row.date"
              >
                {{ row.title }}
              </el-timeline-item>
            </el-timeline>
          </template>
        </el-table-column>

      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-row>

  </div>
</template>

<script>
import { fetchList as fetchUser } from '@/api/user'
import { fetchList } from '@/api/route'
import { fetchList as fetchPlaceList } from '@/api/place'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { formatDate, getCurrentDate } from '@/utils/date-utils'
export default {
  name: 'RouteList',
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
      user: '',
      placeMarkers: [],
      userOptions: [],
      latlngs: [],
      zoom: 15,
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      date: [getCurrentDate(), getCurrentDate()],
      list: null,
      placeList: null,
      userList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        populate: 'user,edited',
        startDate: getCurrentDate(),
        endDate: getCurrentDate(),
        page: 1,
        limit: 0
      },
      userQuery: {
        role: 'user',
        page: 1,
        limit: 0
      }
    }
  },
  async created() {
    await this.getPlaceList()
    await this.getUserList()
    await this.getList()
  },
  methods: {
    getDistance(origin, destination) {
      // return distance in meters
      const lon1 = this.toRadian(origin[1])
      const lat1 = this.toRadian(origin[0])
      const lon2 = this.toRadian(destination[1])
      const lat2 = this.toRadian(destination[0])

      const deltaLat = lat2 - lat1
      const deltaLon = lon2 - lon1

      const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2)
      const c = 2 * Math.asin(Math.sqrt(a))
      const EARTH_RADIUS = 6371
      return c * EARTH_RADIUS * 1000
    },
    toRadian(degree) {
      return degree * Math.PI / 180
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    showLongText() {
      this.showParagraph = !this.showParagraph
    },
    innerClick() {
      alert('Click!')
    },
    getList() {
      this.listLoading = true
      this.listQuery.startDate = formatDate(this.date[0])
      this.listQuery.endDate = formatDate(this.date[1])
      if (this.user === '') {
        delete this.listQuery.user
      } else {
        this.listQuery.user = this.user
      }
      fetchList(this.listQuery).then(response => {
        const resultList = []
        response.data.results.forEach(item => {
          const data = item
          const places = this.placeList
          const subPlaces = []
          item.locations.forEach(item => {
            for (let i = 0; i < places.length; i++) {
              const location = places[i]
              const distance = this.getDistance(item.latlong, places[i].location)
              if (distance < 20) {
                item.place = location
                location.date = item.date
                location.color = '#0bbd87'
                subPlaces.push(location)
                places.splice(i, 1)
              }
            }
          })
          data.places = subPlaces
          resultList.push(data)
        })
        this.list = resultList
        this.total = response.data.totalResults
        this.listLoading = false
      })
    },
    getPlaceList() {
      this.listLoading = true
      fetchPlaceList(this.listQuery).then(response => {
        this.placeList = response.data.results
        this.listLoading = false
      })
    },
    getUserList() {
      this.listLoading = true
      fetchUser(this.userQuery).then(response => {
        this.userList = response.data.results
        const userList = []
        userList.push({ label: 'ทั้งหมด', key: '' })
        response.data.results.forEach(item => {
          userList.push({ label: item.name, key: item.id })
        })
        this.userOptions = userList
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
