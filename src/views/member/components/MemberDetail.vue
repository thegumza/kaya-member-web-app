<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" align="center">
        <el-page-header icon="el-icon-arrow-left" @back="$router.back()" />
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:30px;">
        <span style="font-size: 24px;">{{ profile.M04 }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:30px;">
        <span>{{ profile.M05 + ' '+ profile.M06+ ' '+ profile.M07 }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:30px;">
        <el-tabs v-model="selectedTab">
          <el-tab-pane :span="8" stretch="true" label="ค้างชำระ" name="first">
            <el-row align="middle" :gutter="20" style="margin: 16px 0">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>จำนวน</span>
                  </div>
                  <span>{{ debtBookLists.length }}</span><br><br>
                  <span>บิล</span><br>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>รวมเป็นเงิน</span>
                  </div>
                  <span>{{ debtBookListsTotal.toString() }}</span><br><br>
                  <span>บาท</span><br>
                </el-card>
              </el-col>
            </el-row>
            <el-table
              v-loading="listLoading"
              :data="debtBookLists"
              border
              fit
              highlight-current-row
              style="width: 100%; margin: 16px 0"
              @row-click="clickLink"
            >

              <el-table-column label="รายการ" header-align="center">
                <template slot-scope="{row}">
                  <el-card class="box-card">
                    <el-row>
                      <el-row :span="24">
                        <el-col :span="12">
                          <span>{{ 'หมายเลข '+row.B01 }}</span>
                        </el-col>
                        <el-col :span="12" align="right">
                          <span>{{ row.total + ' บาท' }}</span>
                        </el-col>
                      </el-row>
                      <el-col :span="24">
                        <span>{{ 'ประจำเดือน '+row.CB04 }}</span>
                      </el-col>
                    </el-row>
                  </el-card>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :span="8" stretch="true" label="ประวัติการชำระ" name="second">
            <el-row align="middle" :gutter="20" style="margin: 16px 0">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>จำนวน</span>
                  </div>
                  <span>{{ paidBookLists.length }}</span><br><br>
                  <span>บิล</span><br>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>รวมเป็นเงิน</span>
                  </div>
                  <span>{{ paidBookListsTotal.toString() }}</span><br><br>
                  <span>บาท</span><br>
                </el-card>
              </el-col>
            </el-row>
            <el-table
              v-loading="listLoading"
              :data="paidBookLists"
              border
              fit
              highlight-current-row
              style="width: 100%; margin: 16px 0"
              @row-click="paymentClickLink"
            >

              <el-table-column label="รายการ" header-align="center">
                <template slot-scope="{row}">
                  <el-card class="box-card">
                    <el-row>
                      <el-row :span="24">
                        <el-col :span="12">
                          <span>{{ 'หมายเลข '+row.B01 }}</span>
                        </el-col>
                        <el-col :span="12" align="right">
                          <span>{{ row.total + ' บาท' }}</span>
                        </el-col>
                      </el-row>
                      <el-col :span="24">
                        <span>{{ 'ประจำเดือน '+row.CB04 }}</span>
                      </el-col>
                    </el-row>
                  </el-card>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :span="8" stretch="true" label="ประวัติการใช้" name="third">
            <!--            <bar-chart :x-axis-val="xAxis" :y-axis-val="yAxis"></bar-chart>-->
            <el-row align="middle" :gutter="20" style="margin: 16px 0">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>จำนวน</span>
                  </div>
                  <span>{{ unitBookLists.length }}</span><br><br>
                  <span>บิล</span><br>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>รวมเป็นจำนวน</span>
                  </div>
                  <span>{{ unitBookListsTotal.toString() }}</span><br><br>
                  <span>หน่วย</span><br>
                </el-card>
              </el-col>
            </el-row>
            <el-table
              v-loading="listLoading"
              :data="unitBookLists"
              border
              fit
              highlight-current-row
              style="width: 100%; margin: 16px 0"
            >

              <el-table-column label="รายการ" header-align="center">
                <template slot-scope="{row}">
                  <el-card class="box-card">
                    <el-row>
                      <el-row :span="24">
                        <el-col :span="12">
                          <span>{{ 'หมายเลข '+row.B01 }}</span>
                        </el-col>
                        <el-col :span="12" align="right">
                          <span>{{ row.B21 + ' หน่วย' }}</span>
                        </el-col>
                      </el-row>
                      <el-col :span="24">
                        <span>{{ 'ประจำเดือน '+row.CB04 }}</span>
                      </el-col>
                    </el-row>
                  </el-card>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchMemberReport } from '@/api/member'
import { getUserDetailData } from '@/utils/auth'
import { getOrg, setBookList } from '@/utils/localStorage'
import { formatNumber } from '@/utils/utils'
// import BarChart from './BarChart'
const defaultForm = {
  title: '',
  description: '',
  location: '',
  active: ''
}

export default {
  name: 'PlaceDetail',
  components: {
    // BarChart
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: 'เป็นค่าว่างกรุณากรอกข้อมูล',
          type: 'error'
        })
        callback(new Error('กรุณากรอกข้อมูลให้ถูกต้อง'))
      } else {
        callback()
      }
    }
    const validateLocation = (rule, value, callback) => {
      if (value.includes(',') && value.split(',').length === 2) {
        callback()
      } else {
        callback(new Error('กรุณากรอกข้อมูลพิกัดให้ถูกต้อง (ตัวเลขสองชุดคั่นด้วย , )'))
      }
    }
    return {
      BOOK_LIST_KEY: 'BOOK_LIST_KEY',
      listLoading: true,
      selectedTab: 'first',
      titleButton: '',
      postForm: Object.assign({}, defaultForm),
      debtBookLists: [],
      debtBookListsTotal: 0.0,
      paidBookLists: [],
      paidBookListsTotal: 0.0,
      unitBookLists: [],
      unitBookListsTotal: 0,
      bookLists: [],
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }],
        location: [{ validator: validateLocation }]
      },
      tempRoute: {},
      xAxis: [],
      yAxis: []
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  async created() {
    this.profile = JSON.parse(getUserDetailData())
    this.fetchData()
    this.titleButton = 'สร้าง'
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    clickLink(bookList) {
      setBookList(bookList)
      this.$router.push({ path: '/member/receive/' + bookList.B01 })
    },
    paymentClickLink(bookList) {
      setBookList(bookList)
      this.$router.push({ path: '/member/payment/' + bookList.B01 })
    },
    fetchData() {
      this.listLoading = true
      fetchMemberReport().then(response => {
        let debt = 0.0
        let paid = 0.0
        let totalUnit = 0
        response.data.forEach(item => {
          const data = item
          let sum
          if (item['B10'] === '0') {
            sum = parseFloat(item['BA11']) + parseFloat(item['BA12']) + parseFloat(item['BA13']) + parseFloat(item['BA14']) + parseFloat(item['BA15'])
            data.total = formatNumber(sum)
            this.debtBookLists.push(data)
            debt = debt + sum
          } else {
            sum = parseFloat(item['BA11']) + parseFloat(item['BA12']) + parseFloat(item['BA13']) + parseFloat(item['BA14']) + parseFloat(item['BA15'])
            data.total = formatNumber(sum)
            this.paidBookLists.push(data)
            this.unitBookLists.push(data)
          }
        })
        if (this.unitBookLists.length > 12) {
          this.unitBookLists = this.unitBookLists.slice(0, 12)
        } else {
          this.unitBookLists = this.unitBookLists.slice(0, this.unitBookLists.length)
        }
        this.unitBookLists.forEach(item => {
          const unit = parseInt(item['B21'])
          // this.yAxis.push(parseInt(item['B21']))
          // this.xAxis.push((item['B01']))
          totalUnit = totalUnit + unit
        })
        if (this.paidBookLists.length > 12) {
          this.paidBookLists = this.paidBookLists.slice(0, 12)
        } else {
          this.paidBookLists = this.paidBookLists.slice(0, this.paidBookLists.length)
        }
        this.paidBookLists.forEach(item => {
          const sum = parseFloat(item['total'])
          paid = paid + sum
        })
        this.debtBookListsTotal = formatNumber(debt)
        this.paidBookListsTotal = formatNumber(paid)
        this.unitBookListsTotal = formatNumber(totalUnit)
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
