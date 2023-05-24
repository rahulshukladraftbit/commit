import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import isNotEmptyString from '../global-functions/isNotEmptyString';
import maskDateOfBirth from '../global-functions/maskDateOfBirth';
import validateDateOfBirth from '../global-functions/validateDateOfBirth';
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

const OnboardingDOBScreen = props => {
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

  const handleNavigation = Variables => {
    // On the off chance that someone tries to sign in after creating their
    // account but not completing basic KYC, this screen should skip the phone verificaiton

    if (!Variables.AUTHORIZATION_HEADER) {
      props.navigation.navigate('OnboardingPhoneScreen');
    } else {
      props.navigation.navigate('OnboardingNameScreen');
    }
  };

  const showAlerts = (dateOfBirthIsValid, dateOfBirth) => {
    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate() + 1)) {
        age--;
      }
      return age;
    }

    if (!dateOfBirthIsValid & (dateOfBirth.length > 0)) {
      setAlertVisible(true);
      setAgeValid(true);
    } else {
      if (getAge(dateOfBirth) < 18) {
        setAgeValid(false);
      } else {
        setAgeValid(true);
      }
      setAlertVisible(false);
    }
  };

  const { theme } = props;
  const { navigation } = props;

  const [ageValid, setAgeValid] = React.useState(true);
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [dateOfBirthFilled, setDateOfBirthFilled] = React.useState(false);
  const [dateOfBirthIsValid, setDateOfBirthIsValid] = React.useState(true);
  const [
    identityInformationalModalVisible,
    setIdentityInformationalModalVisible,
  ] = React.useState(false);

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
              {/* Date of birth */}
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
                {'Date of birth'}
              </Text>
            </View>
            {/* Center View */}
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 20, zIndex: 1 },
                dimensions.width
              )}
            >
              {/* When were you born? */}
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
                {'When were you born?'}
              </Text>
              {/* Date Of Birth Input */}
              <TextInput
                onChangeText={newDateOfBirthInputValue => {
                  try {
                    const valuesqaW6S92 = maskDateOfBirth(
                      newDateOfBirthInputValue,
                      dateOfBirth
                    );
                    setDateOfBirth(valuesqaW6S92);
                    const maskedDateOfBirth = valuesqaW6S92;
                    setDateOfBirthIsValid(
                      validateDateOfBirth(maskedDateOfBirth)
                    );
                    setDateOfBirthFilled(isNotEmptyString(maskedDateOfBirth));
                    showAlerts(
                      validateDateOfBirth(newDateOfBirthInputValue),
                      maskedDateOfBirth
                    );
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
                    marginRight: 15,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
                value={dateOfBirth}
                placeholder={'YYYY-MM-DD'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                keyboardType={'numeric'}
                maxLength={10}
              />
              {/* Alerts View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', width: '100%' },
                  dimensions.width
                )}
              >
                {/* Underage Text */}
                <>
                  {ageValid ? null : (
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Red'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          marginLeft: 15,
                          marginRight: 15,
                        },
                        dimensions.width
                      )}
                    >
                      {
                        "We're sorry, but you must be over 18 years of age to use Noba."
                      }
                    </Text>
                  )}
                </>
                {/* Alert Text */}
                <>
                  {!alertVisible ? null : (
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Red'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          marginLeft: 15,
                          marginRight: 15,
                        },
                        dimensions.width
                      )}
                    >
                      {'Please enter a valid date.'}
                    </Text>
                  )}
                </>
              </View>
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
                  { marginTop: 10 },
                  dimensions.width
                )}
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
            {/* Next Invalid */}
            <>
              {validateForm(
                dateOfBirthIsValid,
                dateOfBirthFilled,
                ageValid,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
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
            {/* Next */}
            <>
              {!validateForm(
                dateOfBirthIsValid,
                dateOfBirthFilled,
                ageValid,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
              ) ? null : (
                <Button
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'dateOfBirth',
                        value: dateOfBirth,
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

export default withTheme(OnboardingDOBScreen);
