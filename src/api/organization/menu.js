import request from '@/utils/request'

export function queryMenu(data) {
  return request({
    url: '/organization/menu/conditions',
    method: 'post',
    data
  })
}

export function fetchMenuByParentId(id) {
  return request({
    url: '/organization/menu/parent/' + id,
    method: 'get'
  })
}

export function getMenu(id) {
  return request({
    url: '/organization/menu/' + id,
    method: 'get'
  })
}

export function createMenu(data) {
  return request({
    url: '/organization/menu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/organization/menu/' + data.id,
    method: 'put',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: '/organization/menu/' + id,
    method: 'delete'
  })
}

