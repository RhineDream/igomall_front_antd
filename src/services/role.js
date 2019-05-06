import request1 from '@/utils/request1';

export async function list(params) {
  return request1('/role/list', {
    method: 'POST',
    data: params,
  });
}

export async function save(params) {
  return request1('/role/save', {
    method: 'POST',
    data: params,
  });
}
export async function edit(params) {
  return request1('/role/edit', {
    method: 'POST',
    data: params,
  });
}
export async function getAll(params) {
  return request1('/role/getAll', {
    method: 'POST',
    data: params,
  });
}
