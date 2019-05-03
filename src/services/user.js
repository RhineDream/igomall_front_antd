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
