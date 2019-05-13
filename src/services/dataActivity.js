import request from '@/utils/request1';
import Constants from '@/utils/constants';

/**
 * 列表页面
 * @param params
 * @returns {Promise<void>}
 */
export async function list(params) {
  return request(`${Constants.baseUrl}activity/list`, {
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
  return request(`${Constants.baseUrl}activity/pass`, {
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
  return request(`${Constants.baseUrl}activity/reject`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 删除
 * @param params
 * @returns {Promise<void>}
 */
export async function remove(params) {
  return request(`${Constants.baseUrl}activity/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 获取活动
 * @param params
 * @returns {Promise<void>}
 */
export async function all(params) {
  return request(`${Constants.baseUrl}activity/all`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 保存
 * @param params
 * @returns {Promise<void>}
 */
export async function save(params) {
  return request(`${Constants.baseUrl}activity/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 编辑页面
 * @param params
 * @returns {Promise<void>}
 */
export async function edit(params) {
  return request(`${Constants.baseUrl}activity/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 判断唯一性
 * @param params
 * @returns {Promise<void>}
 */
export async function unique(params) {
  return request(`${Constants.baseUrl}activity/unique`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
