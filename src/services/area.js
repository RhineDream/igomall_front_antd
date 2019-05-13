import request from '@/utils/request1';
import Constants from '../utils/Constants';

export async function list(params) {
  return request(`${Constants.baseUrl}area/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function save(params) {
  return request(`${Constants.baseUrl}area/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function remove(params) {
  return request(`${Constants.baseUrl}area/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function tree(params) {
  return request(`${Constants.baseUrl}area/tree`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
