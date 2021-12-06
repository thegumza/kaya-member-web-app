<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 20px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="title" required>
                ชื่อสถานที่
              </MDinput>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" prop="description">
              <MDinput v-model="postForm.description" :maxlength="100" name="description">
                รายละเอียดสถานที่
              </MDinput>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="location">
              <MDinput v-model="postForm.location" :maxlength="100" name="location">
                พิกัด (ละติจูด , ลองจิจูด) * กรุณกรอกตัวเลขสองชุด คั่นด้วย comma เช่น 19.412632,100.1213272
              </MDinput>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="active">
              <el-radio v-model="postForm.active" label="1">ใช้งาน</el-radio>
              <el-radio v-model="postForm.active" label="0">ไม่ใช้งาน</el-radio>
            </el-form-item>
          </el-col>
          <el-button style="height: 44px; width: 200px" class="is-round is-plain" type="primary" @click="submitForm">
            {{ titleButton }}
          </el-button>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import { fetchPlace, createPlace, updatePlace } from '@/api/place'
import { searchUser } from '@/api/remote-search'

const defaultForm = {
  title: '',
  description: '',
  location: '',
  active: ''
}

export default {
  name: 'PlaceDetail',
  components: { MDinput },
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
      titleButton: '',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }],
        location: [{ validator: validateLocation }]
      },
      tempRoute: {}
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
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      console.log(id)
      this.fetchData(id)
    }
    this.titleButton = 'สร้าง'

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    createLocationObject(locationString) {
      try {
        const location = locationString.replace(' ', '').split(',')
        const latitude = parseInt(location[0])
        const longitude = parseInt(location[1])
        return [latitude, longitude]
      } catch (e) {
        return [0, 0]
      }
    },
    fetchData(id) {
      fetchPlace(id).then(response => {
        this.postForm = response.data

        // set tagsview title
        // this.setTagsViewTitle()

        // set page title
        // this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.location = this.createLocationObject(this.postForm.location)
          const tempData = Object.assign({}, this.postForm)
          delete tempData.id
          if (this.isEdit) {
            updatePlace(this.tempRoute.params.id, tempData).then(response => {
              const dialogTitle = 'แก้ไขสถานที่'
              const data = response.data
              if (data) {
                this.postForm = defaultForm
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'แก้ไขสถานที่สำเร็จ',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'แก้ไขสถานที่ไม่สำเร็จ',
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          } else {
            createPlace(tempData).then(response => {
              const dialogTitle = 'เพิ่มสถานที่'
              const data = response.data
              if (data) {
                this.postForm = defaultForm
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'เพิ่มสถานที่สำเร็จ',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'เพิ่มสถานที่ไม่สำเร็จ',
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          }

          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
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
