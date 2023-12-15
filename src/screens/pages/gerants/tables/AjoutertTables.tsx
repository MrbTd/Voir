import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BottomSheetComponent from '../../../../components/BottomSheetComponent';
import {
  imageRessource,
  paletteColor,
  showToast,
} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import {useNavigation} from '@react-navigation/native';
import {createTable} from '../../../../reducers/gerant/reducerTable';

interface AjouterTablesProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AjouterTables = ({
  bottomVisible,
  setBottomVisible,
}: AjouterTablesProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [numeroTable, setNumeroTable] = useState('');

  const handleSubmit = async () => {
    const data = {
      numero_table: numeroTable,
    };
    if (!handleError()) {
      dispatch(createTable(data, navigation));
    }
    resetState();
    setBottomVisible(false);
  };
  const resetState = () => {
    setNumeroTable('');
  };
  const handleError = () => {
    if (!numeroTable) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BottomSheetComponent
      title="Ajouter une table"
      isVisible={bottomVisible}
      onCancel={() => setBottomVisible(false)}
      onSave={
        handleError()
          ? () => showToast('veuillez remplir tous les champs svp !')
          : handleSubmit
      }
      btnTitle="Ajouter">
      <TextInput
        placeholder="NUMERO DE TABLE:"
        style={{borderBottomWidth: 0.5}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setNumeroTable(e)}
      />
    </BottomSheetComponent>
  );
};

export default AjouterTables;

const styles = StyleSheet.create({});
