import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RenderListUtilisateur from './RenderListUtilisateur';
import BodyGerant from '../../../../components/BodyGerant';
import AjouterUtilisateur from './AjouterUtilisateur';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {initializeUtilisateur} from '../../../../reducers/gerant/reducerUtilisateur';
import LoadingModal from '../../../../components/LoadingModal';

const ListUtilisateur = () => {
  const navigation = useNavigation();
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {dataUsers, isLoadingUser} = useAppSelector(state => state.usersGerant);

  return (
    <BodyGerant title="Utilisateur" onPress={() => setBottomVisible(true)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={dataUsers}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListUtilisateur item={item} />}
        />
      </View>

      <AjouterUtilisateur
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
      />
      <LoadingModal visible={isLoadingUser} />
    </BodyGerant>
  );
};

export default ListUtilisateur;

const styles = StyleSheet.create({});
