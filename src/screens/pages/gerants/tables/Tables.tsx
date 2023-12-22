import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {dataCategoriePlat, dataUsers} from '../../../../utils/mocs';
import {useNavigation} from '@react-navigation/native';
import BodyGerant from '../../../../components/BodyGerant';
import RenderListSousCategoriePlat from './RenderListsTables';
import AjouterTables from './AjoutertTables';
import RenderListTables from './RenderListsTables';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {initializeTable} from '../../../../reducers/gerant/reducerTable';
import LoadingModal from '../../../../components/LoadingModal';
import {searchData} from '../../../../utils/searchData';

const Tables = () => {
  const [bottomVisible, setBottomVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {dataTable, isLoadingTable} = useAppSelector(
    state => state.tableGerant,
  );

  const [recherche, setRecherche] = useState('');
  const filterRecherche = searchData(recherche, dataTable, 'numero_table');

  useEffect(() => {
    dispatch(initializeTable());
  }, []);
  return (
    <BodyGerant
      title="Tables"
      onPress={() => setBottomVisible(true)}
      onChangeText={e => setRecherche(e)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={filterRecherche}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListTables item={item} />}
        />
      </View>
      <AjouterTables
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
      />
      <LoadingModal visible={isLoadingTable} />
    </BodyGerant>
  );
};

export default Tables;

const styles = StyleSheet.create({});
