import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {
  apiDeletetUtilisateur,
  apiGetUtilisateur,
  apiRegisterUtilisateur,
  apiUpdateUtilisateur,
} from '../../services/apiService';
import {statusCode} from '../../utils/data';
import {showToast} from '../../utils/Constantes';
import {NavigationProp} from '@react-navigation/native';

const initialState = {
  dataUsers: [],
  isLoadingUser: false,
};

export const UtilisateurSlice = createSlice({
  name: 'utilisateur',
  initialState,
  reducers: {
    getUtilisateurs: (state, action) => {
      state.dataUsers = action.payload;
    },
    isLoadingStateSave(state, action) {
      state.isLoadingUser = action.payload;
    },
  },
});

export default UtilisateurSlice.reducer;
export const {getUtilisateurs, isLoadingStateSave} = UtilisateurSlice.actions;

export const initializeUtilisateur = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));
    try {
      const result = await apiGetUtilisateur();
      if (result?.status_code == statusCode.SUCESS) {
        dispatch(getUtilisateurs(result?.items));
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

export const createUtilisateur = (
  formData: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiRegisterUtilisateur(formData);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('le compte a bien été crée');
        const result = await apiGetUtilisateur();
        dispatch(getUtilisateurs(result?.items));
        navigation.navigate('ListUtilisateur' as never);
      } else {
        console.log('err create user', res);
        showToast(res?.message);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
      showToast('un problème est survenu. veuillez réessayer svp !');
    }
  };
};

export const deleteUtilisateur = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiDeletetUtilisateur(id);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('le compte a bien été suprimé');
        const result = await apiGetUtilisateur();
        dispatch(getUtilisateurs(result?.items));
        navigation.navigate('ListUtilisateur' as never);
      } else {
        console.log('err delete user', res);
        showToast(res?.message);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
      showToast('un problème est survenu. veuillez réessayer svp !');
    }
  };
};

export const updateUtilisateur = (
  id: string,
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  to: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const res = await apiUpdateUtilisateur(id, data);

      if (res?.status_code == statusCode.SUCESS) {
        showToast('le compte a bien été modifié');
        const result = await apiGetUtilisateur();
        dispatch(getUtilisateurs(result?.items));
        navigation?.navigate(to as never);
      } else {
        console.log('err apiUpdateUtilisateur user', res);
        showToast(res?.message);
      }
      dispatch(isLoadingStateSave(false));
    } catch (error) {
      console.log('error', error);
      dispatch(isLoadingStateSave(false));
      showToast('un problème est survenu. veuillez réessayer svp !');
    }
  };
};
