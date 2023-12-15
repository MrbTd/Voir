import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {
  apiDeletetPlat,
  apiGetPlat,
  apiRegisterPlat,
  apiUpdatePlat,
} from '../../services/apiService';
import {statusCode} from '../../utils/data';
import {showToast} from '../../utils/Constantes';
import {NavigationProp} from '@react-navigation/native';

const initialState = {
  dataPlat: [],
  isLoadingPlat: false,
};

export const PlatSlice = createSlice({
  name: 'plat',
  initialState,
  reducers: {
    getPlat: (state, action) => {
      state.dataPlat = action.payload;
    },
    isLoadingStateSave(state, action) {
      state.isLoadingPlat = action.payload;
    },
  },
});

export default PlatSlice.reducer;
export const {getPlat, isLoadingStateSave} = PlatSlice.actions;

export const initializePlat = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));
    try {
      const result = await apiGetPlat();

      if (result?.status_code == statusCode.SUCESS) {
        dispatch(getPlat(result?.items));
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

export const createPlat = (
  formData: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiRegisterPlat(formData);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('le Plat a bien été crée');
        const result = await apiGetPlat();
        dispatch(getPlat(result?.items));
        navigation.navigate('Plats' as never);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const deletePlat = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiDeletetPlat(id);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('le Plat a bien été suprimé');
        const result = await apiGetPlat();
        dispatch(getPlat(result?.items));
        navigation.navigate('Plats' as never);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const updatePlat = (
  id: string,
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiUpdatePlat(id, data);

      if (res?.status_code == statusCode.SUCESS) {
        const result = await apiGetPlat();

        dispatch(getPlat(result?.items));
        navigation.navigate('Plats' as never);
        showToast('le Plat a bien été modifié');
      } else {
        console.log('err  Plats', res);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};
