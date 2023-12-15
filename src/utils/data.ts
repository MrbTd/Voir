export const asyncStorageType = {
  TOKEN: 'token',
  USERID: 'userId',
};

export const statusCode = {
  SUCESS: 200,
};

export const userRole = {
  ADMIN: 'Admin',
  GERANT: 'Gerant',
  SERVEUR: 'Serveur',
  CUISINIER: 'Cuisinier',
};

export const dataRole = [
  {key: userRole.ADMIN, value: userRole.ADMIN},
  {key: userRole.GERANT, value: userRole.GERANT},
  {key: userRole.SERVEUR, value: userRole.SERVEUR},
  {key: userRole.CUISINIER, value: userRole.CUISINIER},
];

export const etatCommande = {
  LANCE: 0,
  ENCOURS: 1,
  TERMINER: 2,
};
