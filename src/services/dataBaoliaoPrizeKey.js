import request from '@/utils/request1';
import Constants from '@/utils/constants';

/**
 * 列表页面
 * @param params
 * @returns {Promise<void>}
 */
export async function list(params) {
  return request(`${Constants.baseUrl}dataBaoliaoPrizeKey/list`, {
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
  return request(`${Constants.baseUrl}dataBaoliaoPrizeKey/edit`, {
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
  return request(`${Constants.baseUrl}dataBaoliaoPrizeKey/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 获取奖项集合
 * @param params
 * @returns {Promise<void>}
 */
export async function all(params) {
  return request(`${Constants.baseUrl}dataBaoliaoPrizeKey/all`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
