import request from '@/utils/request1';
import Constants from '@/utils/Constants';

/**
 * 列表页面
 * @param params
 * @returns {Promise<void>}
 */
export async function list(params) {
  return request(`${Constants.baseUrl}dataClassify/list`, {
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
  return request(`${Constants.baseUrl}dataClassify/edit`, {
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
  return request(`${Constants.baseUrl}dataClassify/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
