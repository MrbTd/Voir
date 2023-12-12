import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {
  apiDeletetCategoriePlat,
  apiGetCategoriePlat,
  apiRegisterCategoriePlat,
} from '../../services/apiService';
import {statusCode} from '../../utils/data';
import {showToast} from '../../utils/Constantes';
import {NavigationProp} from '@react-navigation/native';

const initialState = {
  dataCatPlat: [],
  isLoadingCatPlat: false,
};

export const CategoriePlatSlice = createSlice({
  name: 'categoriePlat',
  initialState,
  reducers: {
    getCatPlat: (state, action) => {
      state.dataCatPlat = action.payload;
    },
    isLoadingStateSave(state, action) {
      state.isLoadingCatPlat = action.payload;
    },
  },
});

export default CategoriePlatSlice.reducer;
export const {getCatPlat, isLoadingStateSave} = CategoriePlatSlice.actions;

export const initializeCategoriePlat = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));
    try {
      const result = await apiGetCategoriePlat();
      if (result?.status_code == statusCode.SUCESS) {
        dispatch(getCatPlat(result?.items));
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

export const createCategoriePlat = (
  formData: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiRegisterCategoriePlat(formData);

      if (res?.status_code == statusCode.SUCESS) {
        dispatch(isLoadingStateSave(false));
        showToast('la catégorie a bien été crée');
        const result = await apiGetCategoriePlat();
        dispatch(getCatPlat(result?.items));
        navigation.navigate('CategoriePlat' as never);
      }
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const deleteCategoriePlat = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiDeletetCategoriePlat(id);

      if (res?.status_code == statusCode.SUCESS) {
        dispatch(isLoadingStateSave(false));
        showToast('la categorie a bien été suprimé');
        const result = await apiGetCategoriePlat();
        dispatch(getCatPlat(result?.items));
        navigation.navigate('CategoriePlat' as never);
      }
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};
