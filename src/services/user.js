import request from '@/utils/request';
import request1 from '@/utils/request1';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request1('/currentUser', {
    method: 'POST',
    data: {
      id: localStorage.getItem('userId'),
    },
  });
}

export async function changeAvatar(params) {
  return request1('/admin/changeAvatar', {
    method: 'POST',
    data: params,
  });
}

export async function changePwd(params) {
  return request1('/admin/changePwd', {
    method: 'POST',
    data: params,
  });
}

export async function changeMobile(params) {
  return request1('/admin/changeMobile', {
    method: 'POST',
    data: params,
  });
}
