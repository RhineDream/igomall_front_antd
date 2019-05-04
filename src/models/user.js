import {
  query as queryUsers,
  queryCurrent,
  changeAvatar,
  changePwd,
  changeMobile,
} from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *changeAvatar({ payload, callback }, { call }) {
      const response = yield call(changeAvatar, payload);
      if (callback) {
        callback(response);
      }
    },
    *changePwd({ payload, callback }, { call }) {
      const response = yield call(changePwd, payload);
      if (callback) {
        callback(response);
      }
    },
    *changeMobile({ payload, callback }, { call }) {
      const response = yield call(changeMobile, payload);
      if (callback) {
        callback(response);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
