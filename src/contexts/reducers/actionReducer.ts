export const actionTypeReducer = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

export const actionReducer = (
  type: any,
  data?: {role: string; token: string; idUser: string},
) => {
  switch (type) {
    case actionTypeReducer.RESTORE_TOKEN:
      return {type: actionTypeReducer.RESTORE_TOKEN, data};

    case actionTypeReducer.SIGN_IN:
      return {type: actionTypeReducer.SIGN_IN, data};

    case actionTypeReducer.SIGN_OUT:
      return {type: actionTypeReducer.SIGN_OUT};

    default:
      break;
  }
};
