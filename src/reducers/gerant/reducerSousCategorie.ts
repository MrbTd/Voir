import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, Dispatch} from '@reduxjs/toolkit';

import {statusCode} from '../../utils/data';
import {showToast} from '../../utils/Constantes';
import {NavigationProp} from '@react-navigation/native';
import {
  apiDeletetSousCategorie,
  apiGetSousCategorie,
  apiRegisterSousCategorie,
} from '../../services/apiService';

const initialState = {
  dataSousCat: [],
  isLoadingSousCat: false,
};

export const SousCategorieSlice = createSlice({
  name: 'sousCategorie',
  initialState,
  reducers: {
    getSousCategories: (state, action) => {
      state.dataSousCat = action.payload;
    },
    isLoadingStateSave(state, action) {
      state.isLoadingSousCat = action.payload;
    },
  },
});

export default SousCategorieSlice.reducer;
export const {getSousCategories, isLoadingStateSave} =
  SousCategorieSlice.actions;

export const initializeSousCategorie = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));
    try {
      const result = await apiGetSousCategorie();
      if (result?.status_code == statusCode.SUCESS) {
        dispatch(getSousCategories(result?.items));
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

export const createSousCategorie = (
  formData: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiRegisterSousCategorie(formData);
      if (res?.status_code == statusCode.SUCESS) {
        dispatch(isLoadingStateSave(false));
        showToast('la Sous CategoriePlat a bien été crée');
        const result = await apiGetSousCategorie();
        dispatch(getSousCategories(result?.items));
        navigation.navigate('SousCategoriePlat' as never);
      }
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const deleteSousCategorie = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiDeletetSousCategorie(id);

      if (res?.status_code == statusCode.SUCESS) {
        dispatch(isLoadingStateSave(false));
        showToast('la Sous CategoriePlat  a bien été suprimé');
        const result = await apiGetSousCategorie();
        dispatch(getSousCategories(result?.items));
        navigation.navigate('SousCategoriePlat' as never);
      }
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
    }
  };
};