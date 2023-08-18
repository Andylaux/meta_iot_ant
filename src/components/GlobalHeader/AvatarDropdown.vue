<template>
  <a-dropdown v-if="username" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="mugshot" class="antd-pro-global-header-index-avatar" />
      <span>{{ username }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          {{ $t('menu.account.center') }}
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          {{ $t('menu.account.settings') }}
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $t('menu.account.logout') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { getMyProfile } from '@/api/login'
import storage from 'store'

export default {
  name: 'AvatarDropdown',
  data () {
    return {
      mugshot: '',
      username: ''
    }
  },
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  mounted: function () {
    const untmp = localStorage.getItem('userName')
    console.log('untmp', untmp)
    if (!untmp) {
      console.log('!untmp')
      getMyProfile().then(res => {
                  console.log(res.username)
                  this.username = res.username
                  console.log('currentUser.name', this.username)
                  this.mugshot = process.env.VUE_APP_API_BASE_URL + res.mugshot
                  storage.set('userName', res.username, 7 * 24 * 60 * 60 * 1000)
                  storage.set('userMugshot', res.mugshot, 7 * 24 * 60 * 60 * 1000)
              })
    } else {
      console.log('untmp')
      const value = localStorage.getItem('userName')
      this.username = JSON.parse(value)
      const avatar = localStorage.getItem('userMugshot')
      this.mugshot = process.env.VUE_APP_API_BASE_URL + JSON.parse(avatar)
      console.log(this.username)
      console.log(this.mugshot)
    }
  },
  // mounted: function () {
  //   getMyProfile().then(res => {
  //               console.log(res)
  //               this.currentUser.name = res.username
  //               this.mugshot = process.env.VUE_APP_API_BASE_URL + res.mugshot
  //           })
  //   },

  methods: {
    handleToCenter () {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then(() => {
            localStorage.clear()
            this.$router.push({ name: 'iotlogin' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
