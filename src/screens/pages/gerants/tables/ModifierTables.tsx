import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomSheetComponent from '../../../../components/BottomSheetComponent';
import {
  imageRessource,
  paletteColor,
  showToast,
} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {createSousCategorie} from '../../../../reducers/gerant/reducerSousCategorie';
import {useNavigation} from '@react-navigation/native';
import {updateTable} from '../../../../reducers/gerant/reducerTable';

interface ModifierTablesProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}

const ModifierTables = ({
  bottomVisible,
  setBottomVisible,
  item,
}: ModifierTablesProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [numeroTable, setNumeroTable] = useState(item?.numero_table);

  const handleSubmit = async () => {
    const data = {
      numero_table: `${numeroTable}`,
    };
    if (!handleError()) {
      dispatch(updateTable(item?.id, data, navigation));
    }
    setBottomVisible(false);
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
      title="Modifier une table"
      isVisible={bottomVisible}
      onCancel={() => setBottomVisible(false)}
      onSave={
        handleError()
          ? () => showToast('veuillez remplir tous les champs svp !')
          : handleSubmit
      }
      btnTitle="Modifier">
      <TextInput
        placeholder="NUMERO DE TABLE:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setNumeroTable(e)}
        defaultValue={`${numeroTable}`}
        keyboardType="numeric"
      />
    </BottomSheetComponent>
  );
};

export default ModifierTables;

const styles = StyleSheet.create({});
