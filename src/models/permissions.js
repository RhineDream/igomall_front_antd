import { list, save, edit } from '@/services/permissions';

export default {
  namespace: 'permissions',

  state: {
    data: [],
    values: {},
  },

  effects: {
    *list({ payload, callback }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'listInfo',
        payload: response,
      });
      if (callback) {
        callback(response);
      }
    },
    *save({ payload, callback }, { call }) {
      const response = yield call(save, payload);
      if (callback) {
        callback(response);
      }
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(edit, payload);
      yield put({
        type: 'editInfo',
        payload: response,
      });
    },
  },

  reducers: {
    listInfo(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    editInfo(state, action) {
      return {
        ...state,
        values: action.payload,
      };
    },
  },
};
