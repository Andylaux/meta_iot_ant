<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <h2>模板名称：{{ templateDetail.title }}</h2>
      <img :width="300" :src="baseURL+templateDetail.img" />
      <p>模板描述：{{ templateDetail.description }}</p>
      <p>创建时间：{{ templateDetail.created | formatDate }}</p>
      <p>更新时间：{{ templateDetail.updated | formatDate }}</p>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { getTemplateDetail } from '@/api/device'

const padDate = function (va) {
  va = va < 10 ? '0' + va : va
  return va
}

export default {
  data () {
    return {
      templateDetail: '',
      baseURL: process.env.VUE_APP_API_BASE_URL
    }
  },
  mounted: function () {
    const param = this.$route.params.templateId
    getTemplateDetail(param).then((res) => {
      console.log(res)
      this.templateDetail = res
    })
  },
  filters: {
        formatDate: function (val) {
          const value = new Date(val)
          const year = value.getFullYear()
          const month = padDate(value.getMonth() + 1)
          const day = padDate(value.getDate())
          const hour = padDate(value.getHours())
          const minutes = padDate(value.getMinutes())
          const seconds = padDate(value.getSeconds())
          return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
        }
    },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
