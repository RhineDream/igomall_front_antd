import request1 from '@/utils/request1';

export async function list(params) {
  return request1('/admin/list', {
    method: 'POST',
    data: params,
  });
}

export async function list1(params) {
  return request1('/admin/list', {
    method: 'POST',
    data: params,
  });
}
