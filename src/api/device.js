import request from '@/utils/request'

const deviceApi = {
  devTemplates: '/devtemplates/',
  templateDetail: '/devtemplates/'
}

// get user profile
export function getDevTemplates () {
    return request({
      url: deviceApi.devTemplates,
      method: 'get'
    })
  }

// get template detail
export function getTemplateDetail (param) {
    return request({
      url: deviceApi.devTemplates + param + '/',
      method: 'get'
    })
  }
