import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {dataCategoriePlat, dataUsers} from '../../../../utils/mocs';
import {useNavigation} from '@react-navigation/native';
import BodyGerant from '../../../../components/BodyGerant';
import RenderListSousCategoriePlat from './RenderListsBoissons';
import AjouterBoissons from './AjouterBoissons';
import RenderListBoissons from './RenderListsBoissons';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {initializeBoisson} from '../../../../reducers/gerant/reducerBoisson';
import LoadingModal from '../../../../components/LoadingModal';

const Boissons = () => {
  const [bottomVisible, setBottomVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {dataBoisson, isLoadingBoisson} = useAppSelector(
    state => state.boissonGerant,
  );

  return (
    <BodyGerant title="Boissons" onPress={() => setBottomVisible(true)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={dataBoisson}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListBoissons item={item} />}
        />
      </View>
      <AjouterBoissons
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
      />
      <LoadingModal visible={isLoadingBoisson} />
    </BodyGerant>
  );
};

export default Boissons;

const styles = StyleSheet.create({});
