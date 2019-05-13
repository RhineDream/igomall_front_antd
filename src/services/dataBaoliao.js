import request from '@/utils/request1';
import Constants from '@/utils/constants';

export async function list(params) {
  return request(`${Constants.baseUrl}dataBaoliao/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 通过
 * @param params
 * @returns {Promise<void>}
 */
export async function pass(params) {
  return request(`${Constants.baseUrl}dataBaoliao/pass`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 拒绝
 * @param params
 * @returns {Promise<void>}
 */
export async function reject(params) {
  return request(`${Constants.baseUrl}dataBaoliao/reject`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 不确定
 * @param params
 * @returns {Promise<void>}
 */
export async function uncertain(params) {
  return request(`${Constants.baseUrl}dataBaoliao/uncertain`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 撤回
 * @param params
 * @returns {Promise<void>}
 */
export async function withdraw(params) {
  return request(`${Constants.baseUrl}dataBaoliao/cancel`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function remove(params) {
  return request(`${Constants.baseUrl}dataBaoliao/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function view(params) {
  return request(`${Constants.baseUrl}dataBaoliao/examine`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function edit(params) {
  return request(`${Constants.baseUrl}dataBaoliao/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 下一个报料
 * @param params
 * @returns {Promise<void>}
 */
export async function next(params) {
  return request(`${Constants.baseUrl}dataBaoliao/next`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
