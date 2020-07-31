import request from '@/utils/request'

export function queryPosition(data) {
  return request({
    url: '/organization/position/conditions',
    method: 'post',
    data
  })
}

export function getPosition(id) {
  return request({
    url: '/organization/position/' + id,
    method: 'get'
  })
}

export function getAllPositions() {
  return request({
    url: '/organization/position/all',
    method: 'get'
  })
}

export function createPosition(data) {
  return request({
    url: '/organization/position',
    method: 'post',
    data
  })
}

export function updatePosition(data) {
  return request({
    url: '/organization/position/' + data.id,
    method: 'put',
    data
  })
}

export function deletePosition(id) {
  return request({
    url: '/organization/position/' + id,
    method: 'delete'
  })
}

