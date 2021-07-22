import request from '@/utils/request'

// const ROOT  = "http://127.0.0.1:5000/"
const ROOT = "http://114.253.8.150:6064/"
export function factor_main_save(params) {
  return request({
    url: ROOT + 'factor_main_save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}



export function factor_main_list(params) {
  return request({
    url: ROOT + 'factor_main_list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}


export function factor_main_get(params) {
  return request({
    url: ROOT + 'factor_main_get',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}



export function factor_main_get_params(params) {
  return request({
    url: ROOT + 'factor_main_get_params',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}

export function factor_main_del_params(params) {
  return request({
    url: ROOT + 'factor_main_del_params',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}


export function factor_add_params(params) {
  return request({
    url: ROOT + 'factor_add_params',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}


export function factor_update_params(params) {
  return request({
    url: ROOT + 'factor_update_params',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}


export function factor_main_del(id) {
  return request({
    url: ROOT + 'factor_main_del',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      'main_id': id
    }
  })
}


export function factor_calc(id) {
  return request({
    url: ROOT + 'factor_calc?mainid=' + id,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}



export function factor_by_cartype(id) {
  return request({
    url: ROOT + 'factor_by_cartype?mainid=' + id,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export function factor_by_cartype_row(id) {
  return request({
    url: ROOT + 'factor_by_cartype_row?mainid=' + id,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}



export function factor_by_emission(params) {
  return request({
    url: ROOT + 'factor_by_emission',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}


export function factor_by_emission_row(params) {
  return request({
    url: ROOT + 'factor_by_emission_row',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })

}


export function getHomeMapEchartsData() {
  return request({
    url: 'http://114.253.8.150:6064/factor_by_cartype?mainid=62a02350-3b70-11eb-91e6-039fc9493227',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
