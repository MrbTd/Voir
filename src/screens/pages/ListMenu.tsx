import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {imageRessource, paletteColor} from '../../utils/Constantes';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAppDispatch, useAppSelector} from '../../hooks/dispatchSelector';
import {searchData, searchDataCommande} from '../../utils/searchData';
import LoadingModal from '../../components/LoadingModal';
import {initializePlat} from '../../reducers/gerant/reducerPlat';
import {initializeTable} from '../../reducers/gerant/reducerTable';

const ListMenu = () => {
  const {dataPlat, isLoadingPlat} = useAppSelector(state => state.platGerant);
  const {dataTable, isLoadingTable} = useAppSelector(
    state => state.tableGerant,
  );
  const dispatch = useAppDispatch();

  const [verifSearch, setVerifSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    dataTable.map((item: any) => {
      return {
        label: `Table n°${item?.numero_table}`,
        value: item?.id,
      };
    }),
  );

  const donnéesGroupées = dataPlat.reduce((acc: any, obj: any) => {
    const clé = obj.category_name;
    if (!acc[clé]) {
      acc[clé] = [];
    }
    acc[clé].push(obj);
    return acc;
  }, {});

  const tableauRésultat = Object.keys(donnéesGroupées).map(clé => ({
    category_name: clé,
    items: donnéesGroupées[clé],
  }));

  const [dataCommande, setDataCommande] = useState(tableauRésultat);
  const [commandeSelectionne, setCommandeSelectionne] = useState([]) as any;
  const [recherche, setRecherche] = useState('');

  const filterRecherche = searchDataCommande(recherche, dataCommande, 'name');

  const navigation = useNavigation();

  const incrementQuantity = (
    category: string,
    itemId: string,
    item: {
      id: string;
      text: string;
      quantite: number;
      price: number;
      description: string;
    },
  ) => {
    setDataCommande(prevData =>
      prevData.map(categoryData => {
        if (categoryData.category_name === category) {
          return {
            ...categoryData,
            items: categoryData.items.map(
              (item: {id: string; quantite: number}) =>
                item.id === itemId
                  ? {...item, quantite: item.quantite + 1}
                  : item,
            ),
          };
        }
        return categoryData;
      }),
    );

    const commandeExiste = commandeSelectionne.find(
      (val: any) => val!.id === itemId,
    );

    if (commandeExiste) {
      const allCommande = commandeSelectionne.filter(
        (val: any) => val!.id !== itemId,
      );
      allCommande.push({...commandeExiste, quantite: item.quantite + 1});
      setCommandeSelectionne(allCommande);
    } else {
      commandeSelectionne.push({...item, quantite: item.quantite + 1});
    }
  };

  const decrementQuantity = (
    category: string,
    itemId: string,
    item: {
      id: string;
      text: string;
      quantite: number;
      price: number;
      description: string;
    },
  ) => {
    setDataCommande(prevData =>
      prevData.map(categoryData => {
        if (categoryData.category_name === category) {
          return {
            ...categoryData,
            items: categoryData.items.map(
              (item: {id: string; quantite: number}) =>
                item.id === itemId
                  ? {
                      ...item,
                      quantite: item.quantite === 0 ? 0 : item.quantite - 1,
                    }
                  : item,
            ),
          };
        }
        return categoryData;
      }),
    );
    const commandeExiste = commandeSelectionne.find(
      (val: any) => val!.id === itemId,
    );
    const allCommande = commandeSelectionne.filter(
      (val: any) => val!.id !== itemId,
    );

    if (item.quantite - 1 <= 0) {
      setCommandeSelectionne(allCommande);
    }

    if (commandeExiste && item.quantite - 1 > 0) {
      allCommande.push({...commandeExiste, quantite: item.quantite - 1});
      setCommandeSelectionne(allCommande);
    } else {
      commandeSelectionne.push({...item, quantite: item.quantite - 1});
    }
  };

  const isAllQuantitiesZero = () => {
    for (const category of dataCommande) {
      for (const item of category.items) {
        if (item.quantite > 0 && value) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    navigation.navigate({
      name: 'DetailsCommande',
      params: {table: value, commande: commandeSelectionne},
    } as never);
  };

  useEffect(() => {
    dispatch(initializePlat());
    dispatch(initializeTable());
  }, []);

  return (
    <View>
      <View>
        <View style={{position: 'relative'}}>
          <ImageBackground
            source={imageRessource.pattern}
            style={{height: 200}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
                padding: '2%',
                marginTop: '5%',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                style={{
                  backgroundColor: paletteColor.white,
                  padding: 2,
                  borderRadius: 5,
                }}
                color={paletteColor.yellow}
                onPress={() => navigation.goBack()}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {verifSearch && (
                  <TextInput
                    style={{
                      backgroundColor: paletteColor.white,
                      height: 35,
                      width: 200,
                      color: paletteColor.black,
                    }}
                    onChangeText={e => setRecherche(e)}
                  />
                )}
                {!verifSearch && (
                  <MaterialIcons
                    name="search"
                    size={30}
                    style={{
                      backgroundColor: paletteColor.white,
                      padding: 2,
                      borderRadius: 5,
                    }}
                    color={paletteColor.yellow}
                    onPress={() => {
                      setVerifSearch(!verifSearch);
                    }}
                  />
                )}
                {verifSearch && (
                  <MaterialIcons
                    name="search"
                    size={30}
                    style={{
                      backgroundColor: paletteColor.white,
                      padding: 2,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    color={paletteColor.yellow}
                    onPress={() => {
                      setVerifSearch(!verifSearch);
                      setRecherche('');
                    }}
                  />
                )}
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              bottom: -20,
              width: '80%',
              left: '10%',
            }}>
            <CustomButton
              backgroundColor={paletteColor.marron}
              label="Passer une commande"
              marginTop={10}
              colorText={paletteColor.white}
              fontSize={20}
              fontWeight="bold"
              disabled={true}
            />
          </View>
        </View>
        <View style={{marginTop: '10%', marginHorizontal: '5%'}}>
          <DropDownPicker
            style={{
              borderWidth: 2,
              borderColor: paletteColor.marron,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              width: '33%',
              padding: '1%',
              zIndex: 100,
            }}
            placeholder="Table n°"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
          />

          {recherche.length == 0 ? (
            <FlatList
              data={dataCommande}
              keyExtractor={item => item.category_name}
              style={{
                height: Dimensions.get('screen').height / 2.2,
                marginTop: 10,
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              renderItem={({item: value}) => (
                <View key={value.category_name}>
                  <CustomText
                    fontWeight="700"
                    marginTop={5}
                    marginBottom={10}
                    fontSize={20}>
                    {value.category_name}
                  </CustomText>
                  <FlatList
                    data={value.items}
                    renderItem={({item}) => (
                      <View style={styles.card} key={item.id}>
                        <Image
                          source={{uri: item?.image_link}}
                          style={styles.image}
                        />
                        <CustomText
                          fontSize={14}
                          numberOfLines={2}
                          fontWeight="bold"
                          marginTop={10}>
                          {item.name}
                        </CustomText>
                        <CustomText
                          fontSize={11}
                          color={'#B3B6B7'}
                          marginTop={5}
                          numberOfLines={1}>
                          {item.description}
                        </CustomText>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: paletteColor.yellow,
                              width: '55%',
                              justifyContent: 'center',
                              borderRadius: 5,
                              marginTop: 10,
                              padding: '2%',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                decrementQuantity(
                                  value.category_name,
                                  item.id,
                                  item,
                                );
                              }}>
                              <MaterialIcons
                                name="remove-circle"
                                size={20}
                                color={paletteColor.white}
                              />
                            </TouchableOpacity>
                            <CustomText
                              marginLeft={10}
                              marginRight={10}
                              color={paletteColor.white}>
                              {item.quantite}
                            </CustomText>
                            <TouchableOpacity
                              onPress={() => {
                                incrementQuantity(
                                  value.category_name,
                                  item.id,
                                  item,
                                );
                              }}>
                              <MaterialCommunityIcons
                                name="plus-circle"
                                size={20}
                                color={paletteColor.white}
                              />
                            </TouchableOpacity>
                          </View>

                          <CustomText
                            fontSize={13}
                            fontWeight="bold"
                            color={paletteColor.marron}
                            marginTop={10}>
                            {item.prix}Fr
                          </CustomText>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                  />
                </View>
              )}
            />
          ) : (
            <FlatList
              data={filterRecherche}
              keyExtractor={(item, index) => index.toString()}
              style={{
                height: Dimensions.get('screen').height / 2.2,
                marginTop: 10,
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              renderItem={({item: value}) => (
                <FlatList
                  data={value}
                  renderItem={({item}) => (
                    <View style={styles.card} key={item.id}>
                      <Image
                        source={{uri: item?.image_link}}
                        style={styles.image}
                      />
                      <CustomText
                        fontSize={14}
                        numberOfLines={2}
                        fontWeight="bold"
                        marginTop={10}>
                        {item.name}
                      </CustomText>
                      <CustomText
                        fontSize={11}
                        color={'#B3B6B7'}
                        marginTop={5}
                        numberOfLines={1}>
                        {item.description}
                      </CustomText>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: paletteColor.yellow,
                            width: '55%',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginTop: 10,
                            padding: '2%',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              decrementQuantity(
                                item.category_name,
                                item.id,
                                item,
                              );
                            }}>
                            <MaterialIcons
                              name="remove-circle"
                              size={20}
                              color={paletteColor.white}
                            />
                          </TouchableOpacity>
                          <CustomText
                            marginLeft={10}
                            marginRight={10}
                            color={paletteColor.white}>
                            {item.quantite}
                          </CustomText>
                          <TouchableOpacity
                            onPress={() => {
                              incrementQuantity(
                                item.category_name,
                                item.id,
                                item,
                              );
                            }}>
                            <MaterialCommunityIcons
                              name="plus-circle"
                              size={20}
                              color={paletteColor.white}
                            />
                          </TouchableOpacity>
                        </View>

                        <CustomText
                          fontSize={13}
                          fontWeight="bold"
                          color={paletteColor.marron}
                          marginTop={10}>
                          {item.prix}Fr
                        </CustomText>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  numColumns={2}
                />
              )}
            />
          )}
          <View style={{position: 'absolute', width: '100%', bottom: 0}}>
            <CustomButton
              disabled={isAllQuantitiesZero()}
              label="Voir la commande"
              backgroundColor={
                isAllQuantitiesZero() ? paletteColor.grey : paletteColor.yellow
              }
              onPress={handleSubmit}
              fontSize={20}
            />
          </View>
        </View>
      </View>
      <LoadingModal visible={isLoadingPlat} />
    </View>
  );
};

export default ListMenu;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    width: '45%',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});
