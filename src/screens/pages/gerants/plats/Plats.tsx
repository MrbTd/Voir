import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {dataCategoriePlat, dataUsers} from '../../../../utils/mocs';
import {useNavigation} from '@react-navigation/native';
import RenderListPlats from './RenderListPlats';
import BodyGerant from '../../../../components/BodyGerant';
import AjouterPlats from './AjouterPlats';
import LoadingModal from '../../../../components/LoadingModal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {initializePlat} from '../../../../reducers/gerant/reducerPlat';

const Plats = () => {
  const navigation = useNavigation();
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {dataPlat, isLoadingPlat} = useAppSelector(state => state.platGerant);

  return (
    <BodyGerant title="Plats" onPress={() => setBottomVisible(true)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={dataPlat}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListPlats item={item} />}
        />
      </View>

      <AjouterPlats
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
      />
      <LoadingModal visible={isLoadingPlat} />
    </BodyGerant>
  );
};

export default Plats;

const styles = StyleSheet.create({});
