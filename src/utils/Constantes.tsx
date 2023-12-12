import moment from 'moment';
import {ToastAndroid} from 'react-native';

export const paletteColor = {
  marron: '#AC3906',
  yellow: '#FF9900',
  white: '#ffffff',
  black: '#000',
  grey_light: '#EBEBE4',
  grey: '#cecece',
  red: '#ff0000',
  green: '#aaffaa',
};

export const imageRessource = {
  logo: require('../assets/logo.png'),
  pattern: require('../assets/pattern.jpg'),
  commande: require('../assets/commande.jpg'),
  commandeEnCours: require('../assets/commandeEnCours.jpg'),
  user: require('../assets/user.jpg'),
  deconnexion: require('../assets/deconnexion.png'),
  salade: require('../assets/salade.jpg'),
  eat: require('../assets/eat.jpg'),
  upload: require('../assets/upload.png'),
  table: require('../assets/table.jpg'),
};

export const showToast = (title: string) => {
  ToastAndroid.show(title, ToastAndroid.SHORT);
};

export const formaDate = (date: string) => {
  return moment(new Date(date)).locale('fr').format('L');
};
