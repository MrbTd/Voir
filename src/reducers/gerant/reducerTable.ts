import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {
  apiDeletetTable,
  apiGetTable,
  apiRegisterTable,
  apiUpdateTable,
} from '../../services/apiService';
import {statusCode} from '../../utils/data';
import {showToast} from '../../utils/Constantes';
import {NavigationProp} from '@react-navigation/native';

const initialState = {
  dataTable: [],
  isLoadingTable: false,
};

export const TableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    getTable: (state, action) => {
      state.dataTable = action.payload;
    },
    isLoadingStateSave(state, action) {
      state.isLoadingTable = action.payload;
    },
  },
});

export default TableSlice.reducer;
export const {getTable, isLoadingStateSave} = TableSlice.actions;

export const initializeTable = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));
    try {
      const result = await apiGetTable();

      if (result?.status_code == statusCode.SUCESS) {
        dispatch(getTable(result?.items));
      } else {
        showToast(result?.message);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      showToast('un problème est survenu. veuillez réessayer svp !');
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const createTable = (
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiRegisterTable(data);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('la Table a bien été crée');
        const result = await apiGetTable();
        dispatch(getTable(result?.items));
        navigation.navigate('Tables' as never);
      } else {
        showToast(res?.message);

        console.log('err cree table', res);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
      showToast('un problème est survenu. veuillez réessayer svp !');
    }
  };
};

export const deleteTable = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiDeletetTable(id);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('la Table a bien été suprimé');
        const result = await apiGetTable();
        dispatch(getTable(result?.items));
        navigation.navigate('Tables' as never);
      } else {
        showToast(res?.message);

        console.log('err delete table', res);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const updateTable = (
  id: string,
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiUpdateTable(id, data);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('la tables a bien été modifié');
        const result = await apiGetTable();

        dispatch(getTable(result?.items));
        navigation.navigate('Tables' as never);
      } else {
        showToast(res?.message);

        console.log('err update table', res);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);

      showToast('un problème est survenu. veuillez réessayer svp !');
      dispatch(isLoadingStateSave(false));
    }
  };
};
