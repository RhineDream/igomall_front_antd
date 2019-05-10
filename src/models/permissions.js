import { list, save, edit, remove, getAll } from '@/services/permissions';

export default {
  namespace: 'permissions',

  state: {
    data: [],
    values: {},
    getAllData: [],
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
    *remove({ payload, callback }, { call }) {
      const response = yield call(remove, payload);
      if (callback) {
        callback(response);
      }
    },
    *getAll({ payload }, { call, put }) {
      const response = yield call(getAll, payload);
      yield put({
        type: 'getAllInfo',
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
    getAllInfo(state, action) {
      return {
        ...state,
        getAllData: action.payload,
      };
    },
  },
};
