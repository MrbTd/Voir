import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {dataCategoriePlat, dataUsers} from '../../../../utils/mocs';
import {useNavigation} from '@react-navigation/native';
import RenderListPlats from './RenderListPlats';
import BodyGerant from '../../../../components/BodyGerant';
import AjouterPlats from './AjouterPlats';

const Plats = () => {
  const navigation = useNavigation();
  const [bottomVisible, setBottomVisible] = useState(false);

  return (
    <BodyGerant title="Plats" onPress={() => setBottomVisible(true)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={dataCategoriePlat}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListPlats item={item} />}
        />
      </View>

      <AjouterPlats
        isVisible={bottomVisible}
        onCancel={() => setBottomVisible(false)}
        onSave={() => {
          setBottomVisible(false);
        }}
      />
    </BodyGerant>
  );
};

export default Plats;

const styles = StyleSheet.create({});
