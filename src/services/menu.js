import request1 from '@/utils/request1';

export async function list(params) {
  return request1('/menu/list', {
    method: 'POST',
    data: params,
  });
}

export async function save(params) {
  return request1('/menu/save', {
    method: 'POST',
    data: params,
  });
}
export async function edit(params) {
  return request1('/menu/edit', {
    method: 'POST',
    data: params,
  });
}
export async function remove(params) {
  return request1('/menu/delete', {
    method: 'POST',
    data: params,
  });
}
