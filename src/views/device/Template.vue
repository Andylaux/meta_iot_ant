<template>
  <page-header-wrapper>
    <div class="main">
      <a-row :gutter="[16,16]">
        <a-col :span="6" v-for="item in devTemplates" :key="item.id">
          <a-card hoverable>
            <img slot="cover" alt="example" :src="baseURL+item.img" />
            <template slot="actions" class="ant-card-actions">
              <a-icon key="setting" type="setting" @click="templateDetail(item.id)"/>
              <a-icon key="edit" type="edit" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta :title="item.title" :description="item.description">
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="6">
          <a-card hoverable>
            <a-button type="primary" @click="showModal">创建新设备模板</a-button>
            <a-modal :visible="visible" width="1000px" title="创建设备模板" @ok="handleOk" @cancel="handleCancel">
              <a-form :form="form">
                <a-form-item
                  label="模板名称"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="[
                      'title',
                      { rules: [{ required: true, message: $t('form.basic-form.title.required') }] },
                    ]"
                    name="title"
                    placeholder="模板名称"
                  />
                </a-form-item>
                <a-form-item
                  label="模板描述"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-textarea
                    rows="4"
                    placeholder="模板描述"
                    v-decorator="[
                      'description'
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="设备通信协议"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-select
                    style="width: 120px"
                    v-decorator="[
                      'protocal'
                    ]"
                  >
                    <a-select-option value="HTTP">HTTP</a-select-option>
                    <a-select-option value="MQTT">MQTT</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="设备型号"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="[
                      'devtype'
                    ]"
                    name="devtype"
                    placeholder="设备型号"
                  />
                </a-form-item>
                <a-form-item
                  label="模板图片"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    id="temimg"
                    name="img"
                    type="file"
                  />
                </a-form-item>
                <a-form-item
                  label="是否允许设备发起注册"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  :required="false"
                >
                  <a-radio-group v-decorator="['target', { initialValue: 1 }]">
                    <a-radio value="true">True</a-radio>
                    <a-radio value="false">False</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-form>
            </a-modal>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>
<script>
import { getDevTemplates } from '@/api/device'
export default {
  data () {
    return {
      devTemplates: [],
      baseURL: process.env.VUE_APP_API_BASE_URL,
      visible: false
    }
  },
  mounted: function () {
    getDevTemplates().then(res => {
                console.log(res)
                this.devTemplates = res
            })
  },
  methods: {
    templateDetail (param) {
      this.$router.push({ name: 'templateDetail', params: { templateId: param } })
    },
    showModal () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
