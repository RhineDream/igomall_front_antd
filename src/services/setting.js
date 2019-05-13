import request from '@/utils/request1';
import Constants from '@/utils/Constants';

export async function update(params) {
  return request(`${Constants.baseUrl}setting/update`, {
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
