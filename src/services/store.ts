import {configureStore} from '@reduxjs/toolkit';
import reducerUtilisateur from '../reducers/gerant/reducerUtilisateur';
import reducerCategoriePlat from '../reducers/gerant/reducerCategoriePlat';
import reducerSousCategorie from '../reducers/gerant/reducerSousCategorie';
import reducerBoisson from '../reducers/gerant/reducerBoisson';
import reducerTable from '../reducers/gerant/reducerTable';
import reducerPlat from '../reducers/gerant/reducerPlat';

export const store = configureStore({
  reducer: {
    usersGerant: reducerUtilisateur,
    catPlaGerant: reducerCategoriePlat,
    sousCatGerant: reducerSousCategorie,
    boissonGerant: reducerBoisson,
    tableGerant: reducerTable,
    platGerant: reducerPlat,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
