import request from '@/utils/request1';
import Constants from '@/utils/constants';

export async function list(params) {
  return request(`${Constants.baseUrl}dataBaoliaoComments/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function pass(params) {
  return request(`${Constants.baseUrl}dataBaoliaoComments/pass`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function reject(params) {
  return request(`${Constants.baseUrl}dataBaoliaoComments/reject`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function remove(params) {
  return request(`${Constants.baseUrl}dataBaoliaoComments/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
