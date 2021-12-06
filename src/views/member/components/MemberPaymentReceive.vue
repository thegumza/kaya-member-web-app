<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" align="center" style="margin-bottom:16px;">
        <el-page-header icon="el-icon-arrow-left" @back="$router.back()" />
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:16px;">
        <el-image
          style="width: 100px; height: 100px"
          :src="logo"
        />
      </el-col>
      <el-col :span="24" align="center" style="margin-top:8px;margin-bottom:16px;">
        <span style="font-size: 18px;">{{ orgData.ReceiveHeader }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:6px;">
        <span style="font-size: 16px;">{{ 'ประจำเดือน '+bookList.CB04 }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:6px;">
        <span style="font-size: 16px;">{{ orgData.Org01 }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:6px;">
        <span style="font-size: 16px;">{{ orgData.Org04 }}</span>
      </el-col>
      <el-col :span="24" align="center">
        <span style="font-size: 16px;">{{ orgData.Org03 }}</span>
      </el-col>
      <el-col :span="24" align="center">
        <el-divider />
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:6px;">
        <span style="font-size: 16px;">{{ 'สมาชิก '+profile.M01+' บ้านเลขที่ '+profile.M05 }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:6px;">
        <span style="font-size: 16px;">{{ profile.M04 }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:6px;">
        <span style="font-size: 16px;">{{ profile.M06 }}</span>
      </el-col>
      <el-col :span="24" align="center">
        <span style="font-size: 16px;">{{ profile.M07 }}</span>
      </el-col>
      <el-col :span="24" align="center">
        <el-divider />
      </el-col>
      <el-col style="margin-bottom:12px;">
        <el-row :span="24">
          <el-col :span="12">
            <span>{{ 'เลขมิเตอร์เดิม ' }}</span>
          </el-col>
          <el-col :span="12" align="right">
            <span>{{ bookList.B18 }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col style="margin-bottom:12px;">
        <el-row :span="24">
          <el-col :span="12">
            <span>{{ 'เลขมิเตอร์ใหม่ ' }}</span>
          </el-col>
          <el-col :span="12" align="right">
            <span>{{ bookList.B20 }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col style="margin-bottom:12px;">
        <el-row :span="24">
          <el-col :span="12">
            <span>{{ 'จำนวนหน่วย ' }}</span>
          </el-col>
          <el-col :span="12" align="right">
            <span>{{ bookList.B21 }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col style="margin-bottom:12px;">
        <el-row :span="24">
          <el-col :span="12">
            <span>{{ orgData.BillTitle }}</span>
          </el-col>
          <el-col :span="12" align="right">
            <span>{{ bookList.BA11 }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col style="margin-bottom:12px;">
        <el-row :span="24">
          <el-col :span="12">
            <span>{{ 'ค่าธรรมเนียม' }}</span>
          </el-col>
          <el-col :span="12" align="right">
            <span>{{ bookList.BA12 }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="bookList.bA15 !== '0.0'" style="margin-bottom:12px;">
        <el-row :span="24">
          <el-col :span="12">
            <span>{{ 'ค่าขยะฯ' }}</span>
          </el-col>
          <el-col :span="12" align="right">
            <span>{{ bookList.BA15 }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="bookList.bA13 !== '0.0'" style="margin-bottom:12px;">
        <el-row :span="24">
          <el-col :span="12">
            <span>{{ 'ภาษีมูลค่าเพิ่ม' }}</span>
          </el-col>
          <el-col :span="12" align="right">
            <span>{{ bookList.BA13 }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24" align="center">
        <el-divider />
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:16px;">
        <span style="font-size: 18px;">{{ 'รวมชำระทั้งสิ้น ' + bookList.total + ' บาท' }}</span>
      </el-col>
      <div v-if="orgData.tax_id !== ''">
        <el-col :span="24" align="center" style="margin-bottom:12px;">
          <span style="font-size: 16px;">{{ 'กรุงไทย Com Code: '+orgData.company_code }}</span>
        </el-col>
        <el-col :span="24" align="center" style="margin-bottom:12px;">
          <span style="font-size: 16px;">{{ 'Ref1: '+ktbData.ref1 }}</span>
        </el-col>
        <el-col :span="24" align="center" style="margin-bottom:12px;">
          <span style="font-size: 16px;">{{ 'Ref2: '+ktbData.ref2 }}</span>
        </el-col>
        <el-col :span="24" align="center" style="margin-bottom:12px;">
          <span style="font-size: 16px;">{{ 'Amount: '+ktbData.price }}</span>
        </el-col>
      </div>
      <el-col :span="24" align="center" style="margin-bottom:12px;line-height: 2;">
        <span style="font-size: 16px;">{{ orgData.ReceiveFooter }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:12px;">
        <span style="font-size: 16px;">{{ 'Powered by' }}</span>
      </el-col>
      <el-col :span="24" align="center" style="margin-bottom:16px;">
        <span style="font-size: 16px;">{{ 'www.mongkolonline.com' }}</span>
      </el-col>
    </el-row>
    <payment-report :logo="logo" :signature="signature" />
  </div>
</template>

<script>
import { fetchMemberReport } from '@/api/member'
import { getURL, getUserDetailData, getOrgType } from '@/utils/auth'
import { formatNumber } from '@/utils/utils'
import { getOrg, getBookList } from '@/utils/localStorage'
import PaymentReport from '@/views/member/components/PaymentReport'
const defaultForm = {
  title: '',
  description: '',
  location: '',
  active: ''
}

export default {
  name: 'PlaceDetail',
  components: {
    PaymentReport
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
      ktbCode: '',
      ktbData: {},
      orgData: {},
      bookList: {},
      listLoading: true,
      selectedTab: 'first',
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
      org: {},
      signature: '',
      logo: ''
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
  created() {
    this.orgData = getOrg()
    this.bookList = getBookList()
    this.profile = JSON.parse(getUserDetailData())
    this.createKTBCode(this.orgData, this.bookList)
    this.fetchData()
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getDataUri(url) {
      return new Promise(resolve => {
        var image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function() {
          var canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          var ctx = canvas.getContext('2d')
          ctx.drawImage(this, 0, 0)
          resolve(canvas.toDataURL('image/png'))
        }
        image.src = url
      })
    },
    createReference1(orgId, memberId) {
      if (getOrgType() === 'prapa_all') {
        return '01000' + orgId + memberId
      } else {
        return '0100000' + orgId + memberId
      }
    },
    createReference2(orgId, billId, memberId) {
      if (getOrgType() === 'prapa_all') {
        return this.formatOrg(orgId) + '0' + billId + memberId
      } else {
        return this.formatOrg(orgId) + '0' + billId + memberId
      }
    },
    formatOrg(org) {
      if (getOrgType() === 'prapa_all') {
        return '1' + org.substring(2, 6)
      } else {
        return '0' + org.substring(2, 6)
      }
    },
    calculateSumReference(refString1, refString2) {
      let ref1 = 0.0
      let ref2 = 0.0
      for (let i = 0; i < refString1.length; i++) {
        if (parseFloat(refString1.charAt(i)) % 2 === 0) {
          ref1 += parseFloat(refString1.charAt(i)) * 7
        } else {
          ref1 += parseFloat(refString1.charAt(i)) * 3
        }
      }
      for (let i = 0; i < refString2.length; i++) {
        if (parseFloat(refString2.charAt(i)) % 2 === 0) {
          ref2 += parseFloat(refString2.charAt(i)) * 9
        } else {
          ref2 += parseFloat(refString2.charAt(i)) * 5
        }
      }
      let ref = ''
      const refCode = formatNumber(((ref1 + ref2) / 100).toString())
      if (refCode.includes('.')) {
        ref = refCode.split('.')[1].padStart(2, '0')
      } else {
        ref.padStart(2, '0')
      }
      return ref
    },
    createKTBCode(org, bookList) {
      const bill = bookList.B01.toString().replace('-', '')
      const ref1 = this.createReference1(org.org_id, bookList.B03)
      const ref2 = this.createReference2(org.org_id, bill, bookList.B03)
      const sumRef = this.calculateSumReference(ref1, ref2)
      const price = formatNumber(bookList.total)
      this.ktbCode = '|' + org.tax_id + '\n' + ref1 + '\n' + ref2 + sumRef + '\n' + price.replace('.', '')
      this.ktbData = {
        bill,
        ref1,
        ref2,
        sumRef,
        price
      }
    },
    async fetchData() {
      this.listLoading = true
      this.signature = await this.getDataUri(getURL() + '/' + this.orgData.report_image_url)
      this.logo = await this.getDataUri(getURL() + '/' + this.orgData.logo_image_url)
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
