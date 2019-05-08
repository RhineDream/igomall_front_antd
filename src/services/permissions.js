import request1 from '@/utils/request1';

export async function list(params) {
  return request1('/permissions/list', {
    method: 'POST',
    data: params,
  });
}

export async function save(params) {
  return request1('/permissions/save', {
    method: 'POST',
    data: params,
  });
}
export async function edit(params) {
  return request1('/permissions/edit', {
    method: 'POST',
    data: params,
  });
}
