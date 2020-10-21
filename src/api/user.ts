import service from '@/utils/request'

// 登录
export function login(data: any) {
  return service.request({
    url: '/api/users/login',
    method: 'post',
    data
  })
}
// 获取题目列表
export function getList(params: any) {
  return service.request({
    url: '/api/question/list',
    method: 'get',
    params
  })
}