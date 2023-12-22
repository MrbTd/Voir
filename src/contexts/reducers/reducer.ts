import {actionTypeReducer} from './actionReducer';

export const initialState = {
  isLoading: true,
  data: {
    role: null,
    token: null,
    idUser: null,
  },
};

export default function reducerAuth(
  state: any,
  action: {type: any; data?: {role: string; token: string; idUser: string}},
) {
  switch (action.type) {
    case actionTypeReducer.RESTORE_TOKEN:
      return {
        data: {
          role: action.data?.role,
          token: action.data?.token,
          idUser: action.data?.idUser,
        },
        isLoading: false,
      };
    case actionTypeReducer.SIGN_IN:
      return {
        ...state,
        data: {
          role: action.data?.role,
          token: action.data?.token,
          idUser: action.data?.idUser,
        },
      };
    case actionTypeReducer.SIGN_OUT:
      return {
        ...state,
        data: {
          role: null,
          token: null,
          idUser: null,
        },
      };
  }
}
