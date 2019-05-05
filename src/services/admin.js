import request1 from '@/utils/request1';

export async function list(params) {
  return request1('/admin/list', {
    method: 'POST',
    data: params,
  });
}

export async function save(params) {
  return request1('/admin/save', {
    method: 'POST',
    data: params,
  });
}
export async function edit(params) {
  return request1('/admin/edit', {
    method: 'POST',
    data: params,
  });
}
