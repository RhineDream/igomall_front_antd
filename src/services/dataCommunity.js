import request from '@/utils/request1';
import Constants from '@/utils/Constants';

export async function list(params) {
  return request(`${Constants.baseUrl}dataCommunity/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function pass(params) {
  return request(`${Constants.baseUrl}dataCommunity/pass`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function reject(params) {
  return request(`${Constants.baseUrl}dataCommunity/reject`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function remove(params) {
  return request(`${Constants.baseUrl}dataCommunity/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
