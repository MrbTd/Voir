import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {dataCategoriePlat, dataUsers} from '../../../../utils/mocs';
import {useNavigation} from '@react-navigation/native';
import BodyGerant from '../../../../components/BodyGerant';
import RenderListCategoriePlat from './RenderListCategoriePlat';
import AjouterCategoriePlats from './AjouterCategoriePlats';
import {apiGetCategoriePlat} from '../../../../services/apiService';
import {initializeCategoriePlat} from '../../../../reducers/gerant/reducerCategoriePlat';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import LoadingModal from '../../../../components/LoadingModal';

const CategoriePlat = () => {
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {dataCatPlat, isLoadingCatPlat} = useAppSelector(
    state => state.catPlaGerant,
  );

  return (
    <BodyGerant
      title="Catégories des plats"
      onPress={() => setBottomVisible(true)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={dataCatPlat}
          keyExtractor={(item: any) => item?.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListCategoriePlat item={item} />}
        />
      </View>
      <AjouterCategoriePlats
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
      />
      <LoadingModal visible={isLoadingCatPlat} />
    </BodyGerant>
  );
};

export default CategoriePlat;

const styles = StyleSheet.create({});
