import request from '@/utils/request1';
import Constants from '@/utils/Constants';

export async function list(params) {
  return request(`${Constants.baseUrl}hot_search/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function update(params) {
  return request(`${Constants.baseUrl}hot_search/update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function edit(params) {
  return request(`${Constants.baseUrl}setting/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
