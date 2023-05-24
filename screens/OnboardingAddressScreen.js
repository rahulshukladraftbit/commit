import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  IconButton,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const OnboardingAddressScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const validateAddress = (line1, line2, regionCode, postalCode, city) => {
    if (
      line1.length === 0 ||
      regionCode.length === 0 ||
      postalCode.length === 0 ||
      city.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleNavigation = Variables => {
    if (Variables.addressCountryISOCode === 'US') {
      props.navigation.navigate('OnboardingUSSSNScreen');
    } else {
      props.navigation.navigate('OnboardingEmailScreen');
    }
  };

  const filterRegions = (inputRegions, inputText) => {
    var filteredRegions = inputRegions.filter(function (region) {
      return (
        (region.name.toLowerCase().includes(inputText.toLowerCase()) ||
          region.code.toLowerCase().includes(inputText.toLowerCase())) &&
        region.supported != false
      );
    });

    return filteredRegions;
  };

  const filterCountries = (inputCountries, inputText) => {
    var filteredCountries = inputCountries.filter(function (country) {
      return (
        country.countryName.toLowerCase().includes(inputText.toLowerCase()) ||
        country.countryISOCode.toLowerCase().includes(inputText.toLowerCase())
      );
    });

    return filteredCountries;
  };

  const { theme } = props;
  const { navigation } = props;

  const [addressCity, setAddressCity] = React.useState('');
  const [
    addressInformationalModalVisible,
    setAddressInformationalModalVisible,
  ] = React.useState(false);
  const [addressLine1, setAddressLine1] = React.useState('');
  const [addressLine2, setAddressLine2] = React.useState('');
  const [addressPostalCode, setAddressPostalCode] = React.useState('');
  const [addressRegion, setAddressRegion] = React.useState('State/Region');
  const [addressRegionCode, setAddressRegionCode] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [regionInputText, setRegionInputText] = React.useState('');
  const [regionSelectorVisible, setRegionSelectorVisible] =
    React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAvoidingView
        style={StyleSheet.applyWidth({ height: '100%' }, dimensions.width)}
        enabled={true}
        behavior={'padding'}
      >
        {/* Center Container */}
        <View
          style={StyleSheet.applyWidth(
            {
              height: '100%',
              justifyContent: 'space-between',
              paddingLeft: 15,
              paddingRight: 15,
            },
            dimensions.width
          )}
        >
          {/* Top Container */}
          <View>
            {/* Top Row */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 25,
                  marginTop: 65,
                },
                dimensions.width
              )}
            >
              {/* Back Button */}
              <IconButton
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { left: 0, position: 'absolute' },
                  dimensions.width
                )}
                size={32}
                icon={'Ionicons/chevron-back-sharp'}
                color={theme.colors['Primary']}
              />
              {/* Address */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                  },
                  dimensions.width
                )}
              >
                {'Address'}
              </Text>
            </View>
            {/* Address View */}
            <View>
              {/* Address Header */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 20,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {'Enter your address'}
              </Text>
              {/* Address Line 1 */}
              <TextInput
                onChangeText={newAddressLine1Value => {
                  try {
                    setAddressLine1(newAddressLine1Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Primary-Light-1'],
                    fontFamily: 'System',
                    fontWeight: '400',
                    height: 42,
                    marginBottom: 20,
                    marginRight: 15,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
                value={addressLine1}
                placeholder={'Address Line 1'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                maxLength={19}
                textContentType={'streetAddressLine1'}
              />
              {/* Address Line 2 */}
              <TextInput
                onChangeText={newAddressLine2Value => {
                  try {
                    setAddressLine2(newAddressLine2Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Primary-Light-1'],
                    fontFamily: 'System',
                    fontWeight: '400',
                    height: 42,
                    marginBottom: 20,
                    marginRight: 15,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
                value={addressLine2}
                placeholder={'Address Line 2 (Optional)'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                maxLength={19}
                textContentType={'streetAddressLine2'}
              />
              {/* City */}
              <TextInput
                onChangeText={newCityValue => {
                  try {
                    setAddressCity(newCityValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Primary-Light-1'],
                    fontFamily: 'System',
                    fontWeight: '400',
                    height: 42,
                    marginBottom: 20,
                    marginRight: 15,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
                value={addressCity}
                placeholder={'City'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                maxLength={19}
                textContentType={'addressCity'}
              />
              {/* Region Selector Touchable */}
              <Touchable
                onPress={() => {
                  try {
                    if (false) {
                      return;
                    }
                    setRegionSelectorVisible(!regionSelectorVisible);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { marginBottom: 20, width: '100%' },
                  dimensions.width
                )}
              >
                {/* Region Selector */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: theme.colors['Primary-Light-1'],
                      borderLeftWidth: 1,
                      borderRadius: 100,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      bottom: 1,
                      flexDirection: 'row',
                      height: 42,
                      justifyContent: 'space-between',
                      paddingLeft: 15,
                      paddingRight: 15,
                    },
                    dimensions.width
                  )}
                >
                  {/* Region Selector */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary-Light-1'],
                        fontFamily: 'System',
                        fontWeight: '400',
                      },
                      dimensions.width
                    )}
                  >
                    {addressRegion}
                  </Text>
                  {/* Open Icon */}
                  <>
                    {!!regionSelectorVisible ? null : (
                      <Icon
                        style={StyleSheet.applyWidth(
                          { position: 'absolute', right: 15, zIndex: -1 },
                          dimensions.width
                        )}
                        color={theme.colors['Primary-Light-1']}
                        name={'MaterialIcons/keyboard-arrow-down'}
                        size={22}
                      />
                    )}
                  </>
                  {/* Close Icon */}
                  <>
                    {!regionSelectorVisible ? null : (
                      <Icon
                        style={StyleSheet.applyWidth(
                          { position: 'absolute', right: 15 },
                          dimensions.width
                        )}
                        color={theme.colors['Primary-Light-1']}
                        name={'MaterialIcons/keyboard-arrow-up'}
                        size={22}
                      />
                    )}
                  </>
                  {/* Clear Icon Button */}
                  <>
                    {!addressRegionCode ? null : (
                      <IconButton
                        onPress={() => {
                          try {
                            setAddressRegion('State/Region');
                            setAddressRegionCode('');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          { position: 'absolute', right: 40 },
                          dimensions.width
                        )}
                        icon={'Feather/x-circle'}
                        color={theme.colors['Red']}
                        size={22}
                      />
                    )}
                  </>
                </View>
              </Touchable>
              {/* Postal Code Input */}
              <TextInput
                onChangeText={newPostalCodeInputValue => {
                  try {
                    setAddressPostalCode(newPostalCodeInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Primary-Light-1'],
                    fontFamily: 'System',
                    fontWeight: '400',
                    height: 42,
                    marginBottom: 20,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
                value={addressPostalCode}
                placeholder={'Postal Code'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                textContentType={'postalCode'}
                keyboardType={'numeric'}
              />
              {/* Touchable Informational Row */}
              <Touchable
                onPress={() => {
                  try {
                    setAddressInformationalModalVisible(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Informational Row */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Eye Icon */}
                  <Icon
                    style={StyleSheet.applyWidth(
                      { height: 20, width: 20 },
                      dimensions.width
                    )}
                    name={'MaterialCommunityIcons/eye'}
                    color={theme.colors['Primary-Light-1']}
                    size={20}
                  />
                  {/* Informational Text */}
                  <Text
                    style={StyleSheet.applyWidth(
                      { color: theme.colors['Primary-Light-1'], marginLeft: 5 },
                      dimensions.width
                    )}
                  >
                    {'Why do you need my address?'}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
          {/* Button View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 65 },
              dimensions.width
            )}
          >
            {/* Next */}
            <>
              {!validateAddress(
                addressLine1,
                addressLine2,
                addressRegionCode,
                addressPostalCode,
                addressCity
              ) ? null : (
                <Button
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'addressLine1',
                        value: addressLine1,
                      });
                      setGlobalVariableValue({
                        key: 'addressLine2',
                        value: addressLine2,
                      });
                      setGlobalVariableValue({
                        key: 'addressCity',
                        value: addressCity,
                      });
                      setGlobalVariableValue({
                        key: 'addressRegionCode',
                        value: addressRegionCode,
                      });
                      setGlobalVariableValue({
                        key: 'addressPostalCode',
                        value: addressPostalCode.toString(),
                      });
                      handleNavigation(Variables);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Primary'],
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                      borderRadius: 100,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: theme.colors['Secondary'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      height: 42,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  disabled={false}
                  title={'Next'}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Next Invalid */}
            <>
              {validateAddress(
                addressLine1,
                addressLine2,
                addressRegionCode,
                addressPostalCode,
                addressCity
              ) ? null : (
                <Button
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Primary-Light-3'],
                      borderBottomWidth: 1,
                      borderColor: theme.colors['Primary-Light-3'],
                      borderLeftWidth: 1,
                      borderRadius: 100,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: theme.colors['White'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      height: 42,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  title={'Next'}
                  disabled={true}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Region Selector Modal Popup */}
      <>
        {!regionSelectorVisible ? null : (
          <Modal
            visible={regionSelectorVisible}
            animationType={'slide'}
            transparent={true}
          >
            <KeyboardAvoidingView
              style={StyleSheet.applyWidth(
                {
                  bottom: 0,
                  height: '100%',
                  justifyContent: 'flex-end',
                  left: 0,
                  position: 'absolute',
                  width: '100%',
                },
                dimensions.width
              )}
              behavior={'position'}
              enabled={false}
            >
              {/* Modal Bottom View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['White'],
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    justifyContent: 'flex-end',
                    paddingBottom: 50,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 25,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Region Header */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 20,
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Select your region'}
                </Text>
                {/* Search View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* Region Search Input */}
                  <TextInput
                    onChangeText={newRegionSearchInputValue => {
                      try {
                        setRegionInputText(newRegionSearchInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 100,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        color: theme.colors['Primary-Light-1'],
                        fontFamily: 'System',
                        fontWeight: '400',
                        height: 42,
                        marginBottom: 10,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 10,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                    value={regionInputText}
                    placeholder={'State/Region'}
                    editable={true}
                    placeholderTextColor={theme.colors['Primary-Light-1']}
                    textContentType={'addressState'}
                    returnKeyType={'done'}
                    disabled={false}
                    autoFocus={true}
                  />
                  {/* Search Icon */}
                  <Icon
                    style={StyleSheet.applyWidth(
                      { position: 'absolute', right: 15, top: 11, zIndex: -1 },
                      dimensions.width
                    )}
                    color={theme.colors['Primary-Light-1']}
                    size={20}
                    name={'MaterialIcons/search'}
                  />
                </View>
                {/* Fetch Supported Regions */}
                <NobaServerApi.FetchAssetsGetCountrySubdivisionsGET
                  countryCode={Constants['addressCountryISOCode']}
                >
                  {({
                    loading,
                    error,
                    data,
                    refetchAssetsGetCountrySubdivisions,
                  }) => {
                    const fetchSupportedRegionsData = data;
                    if (!fetchSupportedRegionsData || loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return (
                        <Text style={{ textAlign: 'center' }}>
                          There was a problem fetching this data
                        </Text>
                      );
                    }

                    return (
                      <>
                        {/* Region List View */}
                        <>
                          {!regionSelectorVisible ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['White'],
                                  marginBottom: 20,
                                  maxHeight: 200,
                                  paddingBottom: 10,
                                  paddingLeft: 15,
                                  paddingRight: 15,
                                  paddingTop: 10,
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              <ScrollView
                                showsVerticalScrollIndicator={true}
                                bounces={true}
                              >
                                {/* Region List */}
                                <FlatList
                                  data={filterRegions(
                                    fetchSupportedRegionsData?.subdivisions,
                                    regionInputText
                                  )}
                                  listKey={'xhamXi6W'}
                                  keyExtractor={regionListData =>
                                    regionListData?.id ||
                                    regionListData?.uuid ||
                                    JSON.stringify(regionListData)
                                  }
                                  renderItem={({ item }) => {
                                    const regionListData = item;
                                    return (
                                      <>
                                        {/* Touchable Region Option */}
                                        <Touchable
                                          onPress={() => {
                                            try {
                                              setRegionSelectorVisible(false);
                                              setAddressRegionCode(
                                                regionListData?.code
                                              );
                                              setAddressRegion(
                                                regionListData?.name
                                              );
                                              setRegionInputText('');
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          {/* Region Option View */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                height: 38,
                                                justifyContent: 'space-between',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Region name */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color: theme.colors.strong,
                                                  fontFamily: 'System',
                                                  fontWeight: '600',
                                                  marginLeft: 10,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {regionListData?.name}
                                            </Text>
                                            {/* Region Option BG */}
                                            <>
                                              {!(
                                                regionListData?.code ===
                                                addressRegionCode
                                              ) ? null : (
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      backgroundColor:
                                                        theme.colors[
                                                          'Secondary 4'
                                                        ],
                                                      borderRadius: 100,
                                                      bottom: 0,
                                                      height: '100%',
                                                      left: 0,
                                                      position: 'absolute',
                                                      width: '100%',
                                                      zIndex: -1,
                                                    },
                                                    dimensions.width
                                                  )}
                                                />
                                              )}
                                            </>
                                          </View>
                                        </Touchable>
                                      </>
                                    );
                                  }}
                                  contentContainerStyle={StyleSheet.applyWidth(
                                    { flex: 1 },
                                    dimensions.width
                                  )}
                                  numColumns={1}
                                />
                              </ScrollView>
                            </View>
                          )}
                        </>
                      </>
                    );
                  }}
                </NobaServerApi.FetchAssetsGetCountrySubdivisionsGET>
                {/* Close Region Selection Modal Button */}
                <Button
                  onPress={() => {
                    try {
                      setRegionSelectorVisible(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Primary'],
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                      borderRadius: 100,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: theme.colors['Secondary'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      height: 38,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Close'}
                >
                  {'Sign Up'}
                </Button>
              </View>
            </KeyboardAvoidingView>
            {/* Modal Transparent Overlay BG */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Overlay'],
                  height: '100%',
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  zIndex: -1,
                },
                dimensions.width
              )}
            />
          </Modal>
        )}
      </>
      {/* Address Informational Modal Popup */}
      <>
        {!addressInformationalModalVisible ? null : (
          <Modal
            visible={addressInformationalModalVisible}
            animationType={'slide'}
            transparent={true}
          >
            {/* Modal View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['White'],
                  bottom: 0,
                  justifyContent: 'flex-end',
                  left: 0,
                  paddingBottom: 50,
                  paddingLeft: 15,
                  paddingRight: 15,
                  position: 'absolute',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Modal Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['Secondary'],
                    borderRadius: 8,
                    height: 50,
                    justifyContent: 'center',
                    marginBottom: 15,
                    marginTop: 25,
                    width: 50,
                  },
                  dimensions.width
                )}
              >
                {/* Informational Icon */}
                <Icon
                  size={24}
                  color={theme.colors['Primary']}
                  name={'MaterialCommunityIcons/information-outline'}
                />
              </View>
              {/* Modal Header */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {'Why do you need my address?'}
              </Text>
              {/* Informational Text */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontWeight: '400',
                    marginBottom: 15,
                  },
                  dimensions.width
                )}
              >
                {
                  'We need your address to help verify your identity and location to comply with KYC (Know Your Customer) and anti-money laundering regulations.  KYC helps prevent fraudulent accounts and keeps both you and us secure.'
                }
              </Text>
              {/* Close Info Modal Button */}
              <Button
                onPress={() => {
                  try {
                    setAddressInformationalModalVisible(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Primary'],
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Secondary'],
                    fontFamily: 'System',
                    fontWeight: '700',
                    height: 38,
                    marginBottom: 25,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Close'}
              >
                {'Sign Up'}
              </Button>
            </View>
            {/* Modal Transparent Overlay BG */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Overlay'],
                  height: '100%',
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  zIndex: -1,
                },
                dimensions.width
              )}
            />
          </Modal>
        )}
      </>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingAddressScreen);
