<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">PrapaOnMobile</h3>
      </div>

      <el-form-item prop="username" style="font-family: FC-Iconic-Regular,serif;font-size: 24px;">
        <el-input
          ref="id"
          v-model="loginForm.id"
          style="font-family: FC-Iconic-Regular,serif;font-size: 24px;"
          placeholder="ชื่อผู้ใช้"
          name="id"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-radio-group v-model="radio" class="radio-login">
        <el-radio-button label="ประปาเทศบาล/อบต./หมู่บ้าน" />
        <el-radio-button label="ประปาเมืองปัตตานี" />
      </el-radio-group>

      <el-button :loading="loading" type="primary" class="login-button" @click.native.prevent="handleLogin">เข้าสู่ระบบ</el-button>
    </el-form>

  </div>
</template>

<script>
import { setURL, setOrgType } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      radio: 'หน่วยงานท้องถิ่น',
      loginForm: {},
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.id === '') {
      this.$refs.id.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.radio === 'ประปาเทศบาล/อบต./หมู่บ้าน') {
            setOrgType('prapa_all')
            setURL('http://178.128.16.65')
          } else {
            setOrgType('prapa_pattani')
            setURL('http://167.99.67.13')
          }
          this.loading = true
          this.$store.dispatch('member/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/member/list/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    font-family: FC-Iconic-Bold,serif;
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  font-family: FC-Iconic-Bold,serif;
  .el-input {
    display: inline-block;
    height: 86px;
    width: 100%;

    input {
      text-align: center;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 15px;
      color: $light_gray;
      height: 86px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2772BA;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  font-family: FC-Iconic-Bold,serif;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .radio-login {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 16px;
    font-family: FC-Iconic-Bold,serif;
    border-radius: 16px;
  }
  .login-button {
    background-color: $light_gray;
    color: $bg;
    padding: 16px;
    font-family: FC-Iconic-Bold,serif;
    width:100%;
    border-radius: 16px;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
