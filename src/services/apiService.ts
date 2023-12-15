import axiosInstance from '../utils/axios';
import {baseUrl} from '../utils/urls';

//AUTHENTIFICATION

export const loginAuth = async (data: {email: string; password: string}) => {
  const result = await axiosInstance.post(baseUrl + '/login', data);
  return result.data;
};

//-------------------- GERANTS --------------------

//CATEGORIE PLATS
export const apiGetCategoriePlat = async () => {
  const result = await axiosInstance.get(baseUrl + '/cats');
  return result.data;
};

export const apiDeletetCategoriePlat = async (idCatPlat: string) => {
  const result = await axiosInstance.delete(baseUrl + '/cats/' + idCatPlat);
  return result.data;
};

export const apiRegisterCategoriePlat = async (data: any) => {
  const result = await axiosInstance.post(baseUrl + '/cats/create', data);
  return result.data;
};

export const apiUpdateCategoriePlat = async (id: string, data: any) => {
  const result = await axiosInstance.post(baseUrl + '/cats/edit/' + id, data);
  return result.data;
};

//UTILISATEUR
export const apiRegisterUtilisateur = async (data: any) => {
  const result = await axiosInstance.post(baseUrl + '/register', data);
  return result.data;
};

export const apiGetUtilisateur = async () => {
  const result = await axiosInstance.get(baseUrl + '/users');
  return result.data;
};

export const apiDeletetUtilisateur = async (idUser: string) => {
  const result = await axiosInstance.delete(baseUrl + '/users/' + idUser);
  return result.data;
};

export const apiUpdateUtilisateur = async (id: string, data: any) => {
  const result = await axiosInstance.post(baseUrl + '/users/edit/' + id, data);
  return result.data;
};

//SOUS CATEGORIE PLATS
export const apiGetSousCategorie = async () => {
  const result = await axiosInstance.get(baseUrl + '/souscats');
  return result.data;
};

export const apiDeletetSousCategorie = async (idSousCatPlat: string) => {
  const result = await axiosInstance.delete(
    baseUrl + '/souscats/' + idSousCatPlat,
  );
  return result.data;
};

export const apiRegisterSousCategorie = async (data: any) => {
  const result = await axiosInstance.post(baseUrl + '/souscats/create', data);
  return result.data;
};

export const apiUpdateSousCategorie = async (id: string, data: any) => {
  const result = await axiosInstance.post(
    baseUrl + '/souscats/edit/' + id,
    data,
  );
  return result.data;
};

// BOISSON

export const apiGetBoisson = async () => {
  const result = await axiosInstance.get(baseUrl + '/boissons');
  return result.data;
};

export const apiDeletetBoisson = async (id: string) => {
  const result = await axiosInstance.delete(baseUrl + '/boissons/' + id);
  return result.data;
};

export const apiRegisterBoisson = async (data: any) => {
  const result = await axiosInstance.post(baseUrl + '/boissons/create', data);
  return result.data;
};

export const apiUpdateBoisson = async (id: string, data: any) => {
  const result = await axiosInstance.post(
    baseUrl + '/boissons/edit/' + id,
    data,
  );
  return result.data;
};

// TABLES

export const apiGetTable = async () => {
  const result = await axiosInstance.get(baseUrl + '/tables');
  return result.data;
};

export const apiDeletetTable = async (id: string) => {
  const result = await axiosInstance.delete(baseUrl + '/tables/' + id);
  return result.data;
};

export const apiRegisterTable = async (data: any) => {
  const result = await axiosInstance.post(baseUrl + '/tables/create', data);
  return result.data;
};

export const apiUpdateTable = async (id: string, data: any) => {
  const result = await axiosInstance.put(baseUrl + '/tables/edit/' + id, data);
  return result.data;
};

// PLATS

export const apiGetPlat = async () => {
  const result = await axiosInstance.get(baseUrl + '/plats');
  return result.data;
};

export const apiDeletetPlat = async (id: string) => {
  const result = await axiosInstance.delete(baseUrl + '/plats/' + id);
  return result.data;
};

export const apiRegisterPlat = async (data: any) => {
  const result = await axiosInstance.post(baseUrl + '/plats/create', data);
  return result.data;
};

export const apiUpdatePlat = async (id: string, data: any) => {
  const result = await axiosInstance.post(baseUrl + '/plats/edit/' + id, data);
  return result.data;
};

// LISTE COMMANDE GERANT

export const apiGetListCommandeGerant = async () => {
  const result = await axiosInstance.get(baseUrl + '/commandes');
  return result.data;
};

// LISTE COMMANDE GERANT

export const apiGetAvis = async () => {
  const result = await axiosInstance.get(baseUrl + '/avis');
  return result.data;
};

//-------------------- SERVEUR --------------------

export const apiCreateCommandeServeur = async (data: any) => {
  const result = await axiosInstance.post(baseUrl + '/commandes/create', data);
  return result.data;
};
