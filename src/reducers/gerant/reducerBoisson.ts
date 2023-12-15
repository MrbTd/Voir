import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {
  apiDeletetBoisson,
  apiGetBoisson,
  apiRegisterBoisson,
  apiUpdateBoisson,
} from '../../services/apiService';
import {statusCode} from '../../utils/data';
import {showToast} from '../../utils/Constantes';
import {NavigationProp} from '@react-navigation/native';

const initialState = {
  dataBoisson: [],
  isLoadingBoisson: false,
};

export const BoissonSlice = createSlice({
  name: 'boisson',
  initialState,
  reducers: {
    getBoisson: (state, action) => {
      state.dataBoisson = action.payload;
    },
    isLoadingStateSave(state, action) {
      state.isLoadingBoisson = action.payload;
    },
  },
});

export default BoissonSlice.reducer;
export const {getBoisson, isLoadingStateSave} = BoissonSlice.actions;

export const initializeBoisson = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));
    try {
      const result = await apiGetBoisson();

      if (result?.status_code == statusCode.SUCESS) {
        dispatch(getBoisson(result?.items));
      } else {
        showToast('un problème est survenu. veuillez réessayer svp !');
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const createBoisson = (
  formData: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiRegisterBoisson(formData);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('la Boisson a bien été crée');
        const result = await apiGetBoisson();
        dispatch(getBoisson(result?.items));
        navigation.navigate('Boissons' as never);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const deleteBoisson = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiDeletetBoisson(id);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('la Boisson a bien été suprimé');
        const result = await apiGetBoisson();
        dispatch(getBoisson(result?.items));
        navigation.navigate('Boissons' as never);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const updateBoisson = (
  id: string,
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiUpdateBoisson(id, data);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('la boisson a bien été modifié');
        const result = await apiGetBoisson();
        console.log('=======================result=============');
        console.log(result);
        console.log('====================================');
        dispatch(getBoisson(result?.items));
        navigation.navigate('Boissons' as never);
      } else {
        console.log('err delete boisson', res);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};
