import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import * as Progress from 'react-native-progress';
import BodyGerant from '../../../../components/BodyGerant';
import {paletteColor} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';

const AvisClients = () => {
  return (
    <BodyGerant title="Avis clients" isBtnAvis={false}>
      <View style={{marginHorizontal: '5%', marginVertical: '8%'}}>
        <View
          style={{
            backgroundColor: paletteColor.yellow,
            borderRadius: 8,
            padding: '4%',
            justifyContent: 'center',
            elevation: 1.5,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
            <View>
              <CustomText
                fontWeight="bold"
                color={paletteColor.white}
                fontSize={35}>
                3.08
              </CustomText>
              <CustomText color={paletteColor.white} fontSize={10}>
                Moyenne de notation
              </CustomText>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}>
                <CustomText color={paletteColor.white}>4</CustomText>
                <Progress.Bar
                  progress={0.3}
                  width={175}
                  height={10}
                  borderRadius={10}
                  color={paletteColor.yellow}
                  unfilledColor={paletteColor.white}
                  style={{
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                />
                <CustomText color={paletteColor.white}>30</CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}>
                <CustomText color={paletteColor.white}>4</CustomText>
                <Progress.Bar
                  progress={0.3}
                  width={175}
                  height={10}
                  borderRadius={10}
                  color={paletteColor.yellow}
                  unfilledColor={paletteColor.white}
                  style={{
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                />
                <CustomText color={paletteColor.white}>30</CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}>
                <CustomText color={paletteColor.white}>4</CustomText>
                <Progress.Bar
                  progress={0.3}
                  width={175}
                  height={10}
                  borderRadius={10}
                  color={paletteColor.yellow}
                  unfilledColor={paletteColor.white}
                  style={{
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                />
                <CustomText color={paletteColor.white}>30</CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}>
                <CustomText color={paletteColor.white}>4</CustomText>
                <Progress.Bar
                  progress={0.3}
                  width={175}
                  height={10}
                  borderRadius={10}
                  color={paletteColor.yellow}
                  unfilledColor={paletteColor.white}
                  style={{
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                />
                <CustomText color={paletteColor.white}>30</CustomText>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: paletteColor.white,
            borderRadius: 8,
            padding: '4%',
            justifyContent: 'center',
            elevation: 1.5,
            marginTop: '5%',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText fontSize={12} color={paletteColor.marron}>
              Avis - Table 1
            </CustomText>
            <CustomText fontSize={12} color={paletteColor.marron}>
              30/10/2023 - 10:00
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '65%', marginTop: '5%'}}>
              <CustomText fontSize={12}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </CustomText>
            </View>
            <View>
              <CustomText textAlign="right" color={paletteColor.yellow}>
                4
              </CustomText>
              <Progress.Bar
                progress={0.3}
                width={100}
                height={10}
                borderRadius={10}
                color={paletteColor.yellow}
                unfilledColor={paletteColor.white}
                style={{
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </BodyGerant>
  );
};

export default AvisClients;

const styles = StyleSheet.create({});
