import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import isNotEmptyString from '../global-functions/isNotEmptyString';
import validateForm from '../global-functions/validateForm';
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

const OnboardingNameScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const filterCountries = (inputCountries, inputText) => {
    var filteredCountries = inputCountries.filter(function (country) {
      return (
        country.countryName.toLowerCase().includes(inputText.toLowerCase()) ||
        country.countryISOCode.toLowerCase().includes(inputText.toLowerCase())
      );
    });

    return filteredCountries;
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

  const { theme } = props;
  const { navigation } = props;

  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [firstNameFilled, setFirstNameFilled] = React.useState(false);
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [
    identityInformationalModalVisible,
    setIdentityInformationalModalVisible,
  ] = React.useState(false);
  const [lastName, setLastName] = React.useState('');
  const [lastNameFilled, setLastNameFilled] = React.useState(false);
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
              {/* Create Account */}
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
                {'Name'}
              </Text>
            </View>
            {/* Center View */}
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
                {'What should we call you?'}
              </Text>
              {/* First Name Input */}
              <TextInput
                onChangeText={newFirstNameInputValue => {
                  try {
                    setFirstName(newFirstNameInputValue);

                    const valuefpetb8Bq = isNotEmptyString(
                      newFirstNameInputValue
                    );
                    setFirstNameFilled(valuefpetb8Bq);
                    const firstNameFilled = valuefpetb8Bq;
                    const formIsValid = validateForm(
                      firstNameFilled,
                      lastNameFilled,
                      newFirstNameInputValue,
                      newFirstNameInputValue,
                      newFirstNameInputValue,
                      newFirstNameInputValue,
                      newFirstNameInputValue,
                      newFirstNameInputValue
                    );
                    setFormIsValid(formIsValid);
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
                placeholder={'First name'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                textContentType={'givenName'}
              />
              {/* Last Name Input */}
              <TextInput
                onChangeText={newLastNameInputValue => {
                  try {
                    setLastName(newLastNameInputValue);

                    const value8AJOEWlV = isNotEmptyString(
                      newLastNameInputValue
                    );
                    setLastNameFilled(value8AJOEWlV);
                    const lastNameFilled = value8AJOEWlV;
                    const formIsValid = validateForm(
                      lastNameFilled,
                      firstNameFilled,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined
                    );
                    setFormIsValid(formIsValid);
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
                placeholder={'Last name'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                textContentType={'familyName'}
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
                    {'Why do you need my identity information?'}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
          {/* Button View */}
          <View>
            {/* Next */}
            <>
              {!formIsValid ? null : (
                <Button
                  onPress={() => {
                    console.log('Next ON_PRESS Start');
                    let error = null;
                    try {
                      console.log('Start ON_PRESS:0 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'firstName',
                        value: firstName,
                      });
                      console.log('Complete ON_PRESS:0 SET_GLOBAL_VARIABLE');
                      console.log('Start ON_PRESS:1 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'lastName',
                        value: lastName,
                      });
                      console.log('Complete ON_PRESS:1 SET_GLOBAL_VARIABLE');
                    } catch (err) {
                      console.error(err);
                      error = err.message ?? err;
                    }
                    console.log(
                      'Next ON_PRESS Complete',
                      error ? { error } : 'no error'
                    );
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
                      marginBottom: 65,
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
              {!!formIsValid ? null : (
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
                      marginBottom: 65,
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

export default withTheme(OnboardingNameScreen);
