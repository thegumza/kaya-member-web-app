<template>
  <el-button :loading="loading" type="primary" class="pdf-button" @click="printPdf">บันทึก PDF</el-button>
</template>

<script>
// const { formatTextDate } = require('./formatDate')
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const fs = require('fs')
import { font } from './THSarabunNew-normal'
import { font_bold } from './THSarabunNew-bold'
import { formatNumber, formatNumber2Digit } from './utils'
import { getUserDetailData } from '@/utils/auth'
import { getBookList, getOrg } from '@/utils/localStorage'
import { ThaiBaht } from 'thai-baht-text-ts' // for ES6
// const thaiBath = require('./thaibaht')
export default {
  components: {
    jsPDF
  },
  props: ['signature', 'logo'],
  data() {
    return {
      member: {},
      org: {},
      config: '',
      thmonth: ['', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
        'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน',
        'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    }
  },
  async created() {
    this.member = JSON.parse(getUserDetailData())
    this.org = getOrg()
    this.bookList = getBookList()
  },
  methods: {
    formatTextDate(text) {
      try {
        if (text !== '' && text !== undefined) {
          const date = text.split('/')
          let year = ''
          if (date[2].toString().length === 11) year = parseInt(date[2], 10) + 2543
          else year = parseInt(date[2], 10) + 543
          return `${date[0]}/${date[1]}/${year}`
        }
        return '-'
      } catch (e) {
        return text
      }
    },
    async printPdf() {
      this.generatePDF(this.bookList, this.member)
    },
    async generatePDF(bookList, memberData) {
      const org = this.org
      const address = org.Org03
      const tax = org.tax_id
      const signature = this.signature
      const logo = this.logo
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [210, 210]
      })
      const member = memberData
      const bookLists = bookList
      const array = []
      doc.addFileToVFS('THSarabunNew-normal.ttf', font)
      doc.addFileToVFS('THSarabunNew-bold.ttf', font_bold)
      doc.addFont('THSarabunNew-normal.ttf', 'THSarabunNew', 'normal')
      doc.addFont('THSarabunNew-bold.ttf', 'THSarabunNew', 'bold')
      doc.setFont('THSarabunNew', 'normal')
      const data = bookLists
      const bookListData = bookLists
      let BA11 = 0
      let BA12 = 0
      let BA13 = 0
      let BA15 = 0
      let sumBA = 0
      if (data.BA11 !== undefined && data.BA11 !== null && data.BA11 !== '' && data.BA11 !== 'NaN') {
        BA11 = parseFloat(data.BA11)
      }
      if (data.BA12 !== undefined && data.BA12 !== null && data.BA12 !== '' && data.BA12 !== 'NaN') {
        BA12 = parseFloat(data.BA12)
      }
      if (data.BA13 !== undefined && data.BA13 !== null && data.BA13 !== '' && data.BA13 !== 'NaN') {
        BA13 = parseFloat(data.BA13)
      }
      if (data.BA15 !== undefined && data.BA15 !== null && data.BA15 !== '' && data.BA15 !== 'NaN') {
        BA15 = parseFloat(data.BA15)
      }
      sumBA = BA11 + BA12 + BA13 + BA15
      array.push([
        this.formatTextDate(data.B20),
        this.formatTextDate(data.B18),
        data.B21,
        formatNumber2Digit(BA11),
        formatNumber2Digit(BA12),
        formatNumber2Digit(BA15),
        formatNumber2Digit(BA13),
        formatNumber(sumBA)
      ])
      array.push([data.B19, data.B17, { content: ThaiBaht(sumBA), colSpan: 6, styles: { halign: 'center' }}])
      doc.autoTable({
        showHead: 'everyPage',
        showFoot: 'everyPage',
        styles: { font: 'THSarabunNew', fontSize: 14, textColor: 0 },
        margin: { left: 10, top: 70, right: 10 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          lineColor: 180,
          lineWidth: 0.1,
          fontSize: 12,
          halign: 'center'
        },
        theme: 'grid',
        columnStyles: {
          0: { cellWidth: 25, halign: 'center' },
          1: { cellWidth: 25, halign: 'center' },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 20, halign: 'center' },
          4: { cellWidth: 25, halign: 'center' },
          5: { cellWidth: 25, halign: 'center' },
          6: { cellWidth: 20, halign: 'center' },
          7: { cellWidth: 30, halign: 'center' }
        },
        head: [
          [
            'จดครั้งหลัง',
            'จดครั้งก่อน',
            'หน่วยที่ใช้',
            'ค่าน้ำ',
            'ค่ารักษามาตร',
            'ค่าขยะ/บำบัดฯ',
            'ภาษี',
            'รวมเป็นเงินทั้งสิ้น'
          ]
        ],
        body: array,
        // eslint-disable-next-line no-shadow,no-unused-vars
        didDrawPage(data) {
          // Header
          doc.setFont('THSarabunNew', 'bold')
          doc.setFontSize(16)
          doc.text('ใบเสร็จรับเงินค่าน้ำประปา/ใบกำกับภาษี', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' })
          doc.text(org.Org01, doc.internal.pageSize.getWidth() / 2, 22, { align: 'center' })
          doc.setFontSize(14)
          doc.text(address, doc.internal.pageSize.getWidth() / 2, 29, { align: 'center' })
          doc.text(`เลขประจำตัวผู้เสียภาษี ${tax}`, doc.internal.pageSize.getWidth() / 2, 36, { align: 'center' })
          doc.text(`ค่าน้ำประจำเดือน     ${bookLists.CB04}`, 10, 43)
          doc.text(`ได้รับเงินจาก     ${member.M04}`, 10, 50)
          doc.text(`ที่อยู่     ${member.M05} ${member.M06} ${member.road}`, 10, 57)
          doc.text(`เลขประจำมาตร     ${member.M27}`, 10, 64)
          doc.text(`เบอร์โทร     ${member.M07}`, 90, 64)
          doc.text(`ใบเสร็จรับเงินเลขที่     ${bookListData.B22}`, 140, 43)
          doc.text(`เลขที่ผู้ใช้น้ำ     ${member.M01}`, 140, 50)
          if (signature !== '' && signature !== null) {
            doc.addImage(signature, 'PNG', 35, 110, 20, 10)
          }
          doc.text('หัวหน้าหน่วยงานคลัง', 32, 125)
          doc.text(bookListData.B23, 132, 120)
          doc.text('พนักงานเก็บเงิน', 135, 125)
          if (data.B24 !== undefined) doc.text(`วันที่รับเงิน ${bookListData.B24}`, 130, 130)
          if (logo !== '' && logo !== null) {
            doc.addImage(logo, 'PNG', 45, 10, 20, 20)
          }
          doc.setFont('THSarabunNew', 'normal')
        }
      })
      doc.setProperties({
        title: `report${new Date().toLocaleString()}`
      })
      doc.save('ใบเสร็จรับเงินค่าน้ำประปา' + bookLists.CB04)
    },
    warningDialog() {
      this.$vs.dialog({
        type: 'alert',
        color: 'warning',
        title: `คำเตือน`,
        text: 'ไม่มีข้อมูลบันทึกการชำระ',
        acceptText: 'ปิด'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg:#2772BA;
  $dark_gray:#889aa4;
  $white:#ffffff;
  .pdf-button {
    background-color: $bg;
    color: $white;
    padding: 16px;
    font-family: FC-Iconic-Bold,serif;
    width:100%;
    border-radius: 16px;
  }
</style>
