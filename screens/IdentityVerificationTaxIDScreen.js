import React from 'react';
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
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const IdentityVerificationTaxIDScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

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

  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [
    identityInformationalModalVisible,
    setIdentityInformationalModalVisible,
  ] = React.useState(false);
  const [lastName, setLastName] = React.useState('');
  const [middleName, setMiddleName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState('');

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
              {/* Tax ID */}
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
                {'Tax ID'}
              </Text>
            </View>
            {/* SSN View */}
            <>
              {!(Constants['taxCountryISOCode'] === 'US') ? null : (
                <View
                  style={StyleSheet.applyWidth({ zIndex: 1 }, dimensions.width)}
                >
                  {/* Enter Information Header */}
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
                    {'What is your social security number?'}
                  </Text>
                  {/* SSN Input */}
                  <TextInput
                    onChangeText={newSSNInputValue => {
                      try {
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
                    placeholder={'Social security number'}
                    editable={true}
                    placeholderTextColor={theme.colors['Primary-Light-1']}
                    returnKeyType={'done'}
                    maxLength={19}
                    keyboardType={'numeric'}
                  />
                  {/* Touchable Informational Row */}
                  <Touchable
                    onPress={() => {
                      try {
                        setIdentityInformationalModalVisible(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginBottom: 20 },
                      dimensions.width
                    )}
                  >
                    {/* Informational Row */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        },
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
                          {
                            color: theme.colors['Primary-Light-1'],
                            fontFamily: 'System',
                            fontWeight: '400',
                            marginLeft: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {'Why do you need my SSN?'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
            {/* CURP View */}
            <>
              {!(Constants['taxCountryISOCode'] === 'MX') ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20, zIndex: 1 },
                    dimensions.width
                  )}
                >
                  {/* Enter Information Header */}
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
                    {'What is your CURP number?'}
                  </Text>
                  {/* CURP Input */}
                  <TextInput
                    onChangeText={newCURPInputValue => {
                      try {
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
                    placeholder={'CURP'}
                    editable={true}
                    placeholderTextColor={theme.colors['Primary-Light-1']}
                    returnKeyType={'done'}
                    maxLength={19}
                    keyboardType={'numeric'}
                  />
                  {/* Touchable Informational Row */}
                  <Touchable
                    onPress={() => {
                      try {
                        setIdentityInformationalModalVisible(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginBottom: 20 },
                      dimensions.width
                    )}
                  >
                    {/* Informational Row */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        },
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
                          {
                            color: theme.colors['Primary-Light-1'],
                            fontFamily: 'System',
                            fontWeight: '400',
                            marginLeft: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {'Why do you need my CURP?'}
                      </Text>
                    </View>
                  </Touchable>
                  {/* I don't have this ID */}
                  <Touchable>
                    {/* No ID Row */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Informational Text */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Primary-Light-1'],
                            fontFamily: 'System',
                            fontWeight: '600',
                          },
                          dimensions.width
                        )}
                      >
                        {"I don't have a CURP"}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
            {/* DIAN View */}
            <>
              {!(Constants['taxCountryISOCode'] === 'CO') ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20, zIndex: 1 },
                    dimensions.width
                  )}
                >
                  {/* Enter Information Header */}
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
                    {'What is your DIAN number?'}
                  </Text>
                  {/* DIAN Input */}
                  <TextInput
                    onChangeText={newDIANInputValue => {
                      try {
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
                    placeholder={'DIAN'}
                    editable={true}
                    placeholderTextColor={theme.colors['Primary-Light-1']}
                    returnKeyType={'done'}
                    maxLength={19}
                    keyboardType={'numeric'}
                  />
                  {/* Touchable Informational Row */}
                  <Touchable
                    onPress={() => {
                      try {
                        setIdentityInformationalModalVisible(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginBottom: 20 },
                      dimensions.width
                    )}
                  >
                    {/* Informational Row */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        },
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
                          {
                            color: theme.colors['Primary-Light-1'],
                            fontFamily: 'System',
                            fontWeight: '400',
                            marginLeft: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {'Why do you need my DIAN?'}
                      </Text>
                    </View>
                  </Touchable>
                  {/* I don't have this ID */}
                  <Touchable>
                    {/* No ID ROw */}
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
                          {
                            color: theme.colors['Primary-Light-1'],
                            marginLeft: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {"I don't have a DIAN"}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
          </View>
          {/* Button View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 65 },
              dimensions.width
            )}
          >
            {/* Next */}
            <Button
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
                  marginBottom: 20,
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
            {/* I don't have a CURP */}
            <>
              {!(Constants['taxCountryISOCode'] === 'MX') ? null : (
                <Button
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['White'],
                      borderBottomWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0)',
                      borderLeftWidth: 1,
                      borderRadius: 100,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      height: 42,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  disabled={false}
                  title={"I don't have a CURP"}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* I don't have a DIAN */}
            <>
              {!(Constants['taxCountryISOCode'] === 'CO') ? null : (
                <Button
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['White'],
                      borderBottomWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0)',
                      borderLeftWidth: 1,
                      borderRadius: 100,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      height: 42,
                      marginBottom: 20,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  disabled={false}
                  title={"I don't have a DIAN"}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* I don't have an SSN */}
            <>
              {!(Constants['taxCountryISOCode'] === 'US') ? null : (
                <Button
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['White'],
                      borderBottomWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0)',
                      borderLeftWidth: 1,
                      borderRadius: 100,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      height: 42,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  disabled={false}
                  title={"I don't have an SSN"}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Personal Data Informational Modal Popup */}
      <>
        {!identityInformationalModalVisible ? null : (
          <Modal
            visible={identityInformationalModalVisible}
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
                  name={'MaterialCommunityIcons/security'}
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
                {'Why do you need my identity information?'}
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
                  'We need your information to help verify your identity to comply with KYC (Know Your Customer) and anti-money laundering regulations. KYC helps prevent fraudulent accounts and keeps both you and us secure.'
                }
              </Text>
              {/* Close Info Modal Button */}
              <Button
                onPress={() => {
                  try {
                    setIdentityInformationalModalVisible(false);
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

export default withTheme(IdentityVerificationTaxIDScreen);
