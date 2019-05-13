import { update, edit } from '@/services/setting';

export default {
  namespace: 'setting1',
  state: {
    data: {},
  },

  effects: {
    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (callback) {
        callback(response);
      }
      yield put({
        type: 'saveStepFormData',
        payload: response,
      });
    },
    *edit({ payload, callback }, { call, put }) {
      const response = yield call(edit, payload);
      if (callback) {
        callback(response);
      }
      yield put({
        type: 'saveStepFormData',
        payload: response,
      });
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};
