import request from '@/utils/request1';
import Constants from '../utils/Constants';

export async function list(params) {
  return request(`${Constants.baseUrl}config_init/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function save(params) {
  return request(`${Constants.baseUrl}config_init/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function edit(params) {
  return request(`${Constants.baseUrl}config_init/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function remove(params) {
  return request(`${Constants.baseUrl}config_init/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
