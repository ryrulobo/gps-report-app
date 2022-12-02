import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  SHOW_DATA,
  SHOW_DATA_BY_ID,
} from "../actions/actionType";

const initialState = {
  error: "",
  data: [],
  totalPage: 0,
  dataById: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        error: action.error,
      };
    case USER_LOGOUT:
      return {
        ...state,
        error: action.error,
      };
    case USER_REGISTER:
      return {
        ...state,
        error: action.error,
      };
    case SHOW_DATA:
      if (action.payload.err) {
        return {
          ...state,
          error: action.payload.err,
        };
      }
      return {
        ...state,
        error: action.payload.err,
        data: action.payload.data.rows,
        totalPage: Math.ceil(action.payload.data.count / 5),
      };
    case SHOW_DATA_BY_ID:
      if (action.payload.err) {
        return {
          ...state,
          error: action.payload.err,
        };
      }
      return {
        ...state,
        error: action.error,
        dataById: action.payload.data,
      };
    default:
      return state;
  }
}

export default reducer;
