<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 20px;" prop="title">
              <el-select v-model="postForm.place" placeholder="เลือกเส้นทาง" style="width: 300px;margin-top: -20px;margin-bottom: 20px;" class="filter-item">
                <el-option v-for="item in placeOptions" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" prop="title">
              <el-select v-model="postForm.user" placeholder="เลือกเส้นทาง" style="width: 300px;margin-top: -20px;margin-bottom: 20px;" class="filter-item">
                <el-option v-for="item in userOptions" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="location">
              <el-radio v-model="postForm.active" label="1">ใช้งาน</el-radio>
              <el-radio v-model="postForm.active" label="0">ไม่ใช้งาน</el-radio>
            </el-form-item>

          </el-col>
          <el-button style="height: 44px; width: 200px" class="is-round is-plain" type="primary" @click="submitForm">
            สร้าง
          </el-button>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import { fetchRoute, createRoute, updateRoute } from '@/api/route'
import { fetchList } from '@/api/place'
import { fetchList as fetchUser } from '@/api/user'
import { searchUser } from '@/api/remote-search'

const defaultForm = {
  place: '',
  user: '',
  active: '1'
}

export default {
  name: 'RouteDetail',
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
    return {
      place: {},
      user: {},
      temp: {
        place: '',
        user: '',
        active: ''
      },
      listQuery: {
        limit: 0
      },
      userQuery: {
        limit: 0,
        role: 'user'
      },
      placeOptions: [],
      userOptions: [],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }]
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
    } else {
      this.fetchList()
      this.fetchUser()
    }

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
        return { coordinates: [latitude, longitude], type: 'Point' }
      } catch (e) {
        return { coordinates: [0, 0], type: 'Point' }
      }
    },
    async fetchData(id) {
      await fetchRoute(id).then(response => {
        this.postForm = response.data

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()

        this.fetchList()
        this.fetchUser()
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchList() {
      await fetchList(this.listQuery).then(response => {
        this.list = response.data.results
        this.total = response.data.totalResults
        this.list.forEach(element => {
          if (this.postForm.place === element.id) {
            this.place = element
          }
          this.placeOptions.push({ label: element.title, key: element.id })
        })
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    async fetchUser() {
      await fetchUser(this.userQuery).then(response => {
        this.list = response.data.results
        this.total = response.data.totalResults
        this.list.forEach(element => {
          if (this.postForm.user === element.id) {
            this.user = element
          }
          this.userOptions.push({ label: element.name, key: element.id })
        })
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    setTagsViewTitle() {
      const title = 'แก้ไข เส้นทาง'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'แก้ไข เส้นทาง'
      document.title = title
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.postForm)
          delete tempData.id
          this.loading = true
          if (this.isEdit) {
            updateRoute(this.tempRoute.params.id, tempData).then(response => {
              const dialogTitle = 'แก้ไขเส้นทาง'
              const data = response.data
              if (data) {
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'แก้ไขเส้นทางสำเร็จ',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'แก้ไขเส้นทางไม่สำเร็จ',
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          } else {
            createRoute(tempData).then(response => {
              const dialogTitle = 'เพิ่มเส้นทาง'
              const data = response.data
              if (data) {
                this.postForm = defaultForm
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'เพิ่มเส้นทางสำเร็จ',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: dialogTitle,
                  message: 'เพิ่มเส้นทางไม่สำเร็จ',
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
