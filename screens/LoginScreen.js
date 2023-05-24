import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import authenticationLogin from '../global-functions/authenticationLogin';
import isNotEmptyString from '../global-functions/isNotEmptyString';
import validateEmail from '../global-functions/validateEmail';
import { parseBoolean } from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  IconButton,
  Link,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const LoginScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const showAlerts = (
    emailIsValid,
    emailIsFilled,
    numberIsValid,
    numberIsfilled
  ) => {
    if (!emailIsValid & emailIsFilled) {
      setEmailAlertVisible(true);
    } else {
      setEmailAlertVisible(false);
    }

    if (!numberIsValid & numberIsFilled) {
      //Phone alert... required to be called AlertVisible due to custom component
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  };

  const handleResponse = (
    Variables,
    setGlobalVariableValue,
    authResponse,
    type
  ) => {
    try {
      if (type === 'email') {
        if (authResponse.statusCode === 403) {
          setEmailNotFoundAlertVisible(true);
          return;
        }
        setLoginOTPModalVisible(true);
        return;
      }
      if (type === 'phone') {
        if (authResponse.statusCode === 403) {
          setPhoneNotFoundAlertVisible(true);
          return;
        }
        setLoginPhoneOTPModalVisible(true);
        return;
      }
    } catch {
      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'A technical error has occured. Please try again.',
        'error'
      );

      clearInterval(Variables.toastIntervalID);
    }
  };

  const resetVariables = () => {
    setEmailAddress('');
    setEmailIsValid(false);
    setEmailIsFilled(false);
    setEmailAlertVisible(false);
    setEmailNotFoundAlertVisible(false);

    setPhoneNumberScreen('');
    setNumberIsValid(false);
    setNumberIsFilled(false);
    setAlertVisible(false);
    setPhoneNotFoundAlertVisible(false);
  };

  const { theme } = props;
  const { navigation } = props;

  const [alertVisible, setAlertVisible] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [emailAlertVisible, setEmailAlertVisible] = React.useState(false);
  const [emailIsFilled, setEmailIsFilled] = React.useState(false);
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [emailNotFoundAlertVisible, setEmailNotFoundAlertVisible] =
    React.useState(false);
  const [loginOTPModalVisible, setLoginOTPModalVisible] = React.useState(false);
  const [loginPhoneOTPModalVisible, setLoginPhoneOTPModalVisible] =
    React.useState(false);
  const [loginWith, setLoginWith] = React.useState('phone');
  const [numberIsFilled, setNumberIsFilled] = React.useState(false);
  const [numberIsValid, setNumberIsValid] = React.useState(false);
  const [phoneNotFoundAlertVisible, setPhoneNotFoundAlertVisible] =
    React.useState(false);
  const [phoneNumberScreen, setPhoneNumberScreen] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { borderColor: theme.colors['Primary-Light-1'] },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
    >
      <KeyboardAvoidingView
        style={StyleSheet.applyWidth(
          {
            flex: 1,
            justifyContent: 'space-around',
            paddingLeft: 16,
            paddingRight: 16,
          },
          dimensions.width
        )}
        behavior={'padding'}
        enabled={false}
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
            { left: 25, position: 'absolute', top: 65, zIndex: 1 },
            dimensions.width
          )}
          size={32}
          icon={'Ionicons/chevron-back-sharp'}
        />
        {/* Center View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
              paddingBottom: 65,
              paddingTop: 120,
            },
            dimensions.width
          )}
        >
          {/* Top View */}
          <View
            style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          >
            {/* Icon View */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center' },
                dimensions.width
              )}
            >
              {/* Noba Mark */}
              <Image
                style={StyleSheet.applyWidth(
                  { borderRadius: 15, height: 100, width: 100 },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.NobaMarkLightGreen}
              />
            </View>
            {/* Welcome Back Header */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'System',
                  fontSize: 24,
                  fontWeight: '700',
                  marginBottom: 10,
                  marginTop: 16,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'Welcome Back'}
            </Text>
            {/* Put the dollar to work */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Primary-Light-1'],
                  fontFamily: 'System',
                  fontWeight: '700',
                  marginBottom: 25,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'Put the dollar to work'}
            </Text>
            {/* Inputs View */}
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 36 },
                dimensions.width
              )}
            >
              {/* Login With Email */}
              <>
                {!(loginWith === 'phone') ? null : (
                  <Button
                    onPress={() => {
                      try {
                        setLoginWith('email');
                        resetVariables();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
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
                        marginBottom: 5,
                        textAlign: 'center',
                        zIndex: -1,
                      },
                      dimensions.width
                    )}
                    title={'Login with email'}
                    disabled={false}
                  >
                    {'Sign Up'}
                  </Button>
                )}
              </>
              {/* Login With Phone */}
              <>
                {!(loginWith === 'email') ? null : (
                  <Button
                    onPress={() => {
                      try {
                        setLoginWith('phone');
                        resetVariables();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
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
                        marginBottom: 5,
                        textAlign: 'center',
                        zIndex: -1,
                      },
                      dimensions.width
                    )}
                    title={'Login with phone'}
                    disabled={false}
                  >
                    {'Sign Up'}
                  </Button>
                )}
              </>
              {/* Email View */}
              <>
                {!(loginWith === 'email') ? null : (
                  <View>
                    {/* Email Input */}
                    <>
                      {!(loginWith === 'email') ? null : (
                        <TextInput
                          onChangeText={newEmailInputValue => {
                            try {
                              setEmailAddress(newEmailInputValue);

                              const value51DeSBu0 =
                                validateEmail(newEmailInputValue);
                              setEmailIsValid(value51DeSBu0);
                              const emailIsValid = value51DeSBu0;
                              setEmailNotFoundAlertVisible(false);

                              const valueVJHck1HQ =
                                isNotEmptyString(newEmailInputValue);
                              setEmailIsFilled(valueVJHck1HQ);
                              const emailIsfilled = valueVJHck1HQ;
                              showAlerts(
                                emailIsValid,
                                emailIsfilled,
                                undefined,
                                undefined
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
                              height: 60,
                              paddingBottom: 10,
                              paddingLeft: 15,
                              paddingRight: 15,
                              paddingTop: 10,
                            },
                            dimensions.width
                          )}
                          value={emailAddress}
                          placeholder={'Email '}
                          editable={true}
                          placeholderTextColor={theme.colors['Primary-Light-1']}
                          textContentType={'emailAddress'}
                          keyboardType={'email-address'}
                          returnKeyType={'done'}
                        />
                      )}
                    </>
                    {/* Invalid Alert Text */}
                    <>
                      {!emailAlertVisible ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Red'],
                              fontFamily: 'System',
                              fontSize: 12,
                              fontWeight: '400',
                              marginBottom: 10,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 5,
                            },
                            dimensions.width
                          )}
                        >
                          {'Please enter a valid email address.'}
                        </Text>
                      )}
                    </>
                    {/* No Account Alert Text */}
                    <>
                      {!emailNotFoundAlertVisible ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Red'],
                              fontFamily: 'System',
                              fontSize: 12,
                              fontWeight: '400',
                              marginBottom: 10,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 5,
                            },
                            dimensions.width
                          )}
                        >
                          {'No account was found. Please check your entry or '}
                          {/* No Account Sign up */}
                          <Link
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Red'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                            title={'sign up.'}
                          />
                        </Text>
                      )}
                    </>
                  </View>
                )}
              </>
              {/* Phone View */}
              <>
                {!(loginWith === 'phone') ? null : (
                  <View>
                    {/* Invalid Alert Text */}
                    <>
                      {!alertVisible ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Red'],
                              fontFamily: 'System',
                              fontSize: 12,
                              fontWeight: '400',
                              marginBottom: 10,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 5,
                            },
                            dimensions.width
                          )}
                        >
                          {'Please enter a valid phone number.'}
                        </Text>
                      )}
                    </>
                    {/* No Account Alert Text */}
                    <>
                      {!phoneNotFoundAlertVisible ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Red'],
                              fontFamily: 'System',
                              fontSize: 12,
                              fontWeight: '400',
                              marginBottom: 10,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 5,
                            },
                            dimensions.width
                          )}
                        >
                          {'No account was found. Please check your entry or '}
                          {/* No Account Sign up */}
                          <Link
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Red'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                            title={'sign up.'}
                          />
                        </Text>
                      )}
                    </>
                  </View>
                )}
              </>
            </View>
          </View>
          {/* Bottom Section View */}
          <View>
            {/* Email Buttons View */}
            <>
              {!(loginWith === 'email') ? null : (
                <View>
                  {/* Request Code Email Button */}
                  <>
                    {!emailIsValid ? null : (
                      <Button
                        onPress={() => {
                          const handler = async () => {
                            try {
                              setGlobalVariableValue({
                                key: 'emailAddress',
                                value: emailAddress,
                              });
                              const authenticationEmailJSONResponse =
                                await authenticationLogin(
                                  Variables,
                                  setGlobalVariableValue,
                                  emailAddress,
                                  false,
                                  'CONSUMER'
                                );
                              handleResponse(
                                Variables,
                                setGlobalVariableValue,
                                authenticationEmailJSONResponse,
                                'email'
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
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
                            marginBottom: 20,
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                        title={'Request Code'}
                      >
                        {'Sign Up'}
                      </Button>
                    )}
                  </>
                  {/* Invalid Request Code Email Button */}
                  <>
                    {emailIsValid ? null : (
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
                            marginBottom: 20,
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                        title={'Request Code'}
                        disabled={true}
                        loading={false}
                      >
                        {'Sign Up'}
                      </Button>
                    )}
                  </>
                </View>
              )}
            </>
            {/* Phone Buttons View */}
            <>
              {!(loginWith === 'phone') ? null : (
                <View>
                  {/* Request Code Phone Button */}
                  <>
                    {!numberIsValid ? null : (
                      <Button
                        onPress={() => {
                          const handler = async () => {
                            console.log(
                              'Request Code Phone Button ON_PRESS Start'
                            );
                            let error = null;
                            try {
                              console.log(
                                'Start ON_PRESS:0 SET_GLOBAL_VARIABLE'
                              );
                              setGlobalVariableValue({
                                key: 'phoneNumber',
                                value: phoneNumberScreen,
                              });
                              console.log(
                                'Complete ON_PRESS:0 SET_GLOBAL_VARIABLE'
                              );
                              console.log('Start ON_PRESS:1 CUSTOM_FUNCTION');
                              const authenticationPhoneJSONResponse =
                                await authenticationLogin(
                                  Variables,
                                  setGlobalVariableValue,
                                  phoneNumberScreen,
                                  false,
                                  'CONSUMER'
                                );
                              console.log(
                                'Complete ON_PRESS:1 CUSTOM_FUNCTION',
                                { authenticationPhoneJSONResponse }
                              );
                              console.log('Start ON_PRESS:2 CUSTOM_FUNCTION');
                              handleResponse(
                                Variables,
                                setGlobalVariableValue,
                                authenticationPhoneJSONResponse,
                                'phone'
                              );
                              console.log(
                                'Complete ON_PRESS:2 CUSTOM_FUNCTION'
                              );
                            } catch (err) {
                              console.error(err);
                              error = err.message ?? err;
                            }
                            console.log(
                              'Request Code Phone Button ON_PRESS Complete',
                              error ? { error } : 'no error'
                            );
                          };
                          handler();
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
                            marginBottom: 20,
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                        title={'Request Code'}
                      >
                        {'Sign Up'}
                      </Button>
                    )}
                  </>
                  {/* Invalid Request Code Phone Button */}
                  <>
                    {numberIsValid ? null : (
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
                            marginBottom: 20,
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                        title={'Request Code'}
                        disabled={true}
                      >
                        {'Sign Up'}
                      </Button>
                    )}
                  </>
                </View>
              )}
            </>
            {/* Disclosure Group */}
            <Text
              style={StyleSheet.applyWidth(
                { color: theme.colors['Primary-Light-1'], textAlign: 'center' },
                dimensions.width
              )}
            >
              {'By logging in you agree to our '}
              {/* ToS Link */}
              <Link
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://noba.com/terms-of-service'
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  { color: theme.colors.primary },
                  dimensions.width
                )}
                title={'Terms of Service'}
              />
              {/* and */}
              <Text
                style={StyleSheet.applyWidth(
                  { color: theme.colors['Primary-Light-1'] },
                  dimensions.width
                )}
              >
                {' and '}
              </Text>
              {/* PN Link */}
              <Link
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://noba.com/privacy-notice'
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  { color: theme.colors.primary },
                  dimensions.width
                )}
                title={'Privacy Policy'}
              />
              {/* test */}
              <Text
                style={StyleSheet.applyWidth(
                  { color: theme.colors.strong },
                  dimensions.width
                )}
              >
                {'.'}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Modal Email Otp Popup */}
      <>
        {!loginOTPModalVisible ? null : (
          <Modal
            visible={loginOTPModalVisible}
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
                <Icon
                  size={24}
                  name={'MaterialIcons/mark-email-unread'}
                  color={theme.colors['Primary']}
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
                {"We've just sent you a confirmation email!"}
              </Text>

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
                  'In the confirmation email, you will find a verification code to copy and paste in the next step.'
                }
              </Text>
              {/* Next Button -> OTP Screen */}
              <Button
                onPress={() => {
                  console.log('Next Button -> OTP Screen ON_PRESS Start');
                  let error = null;
                  try {
                    console.log('Start ON_PRESS:0 SET_SCREEN_LOCAL_STATE');
                    setLoginOTPModalVisible(false);
                    console.log('Complete ON_PRESS:0 SET_SCREEN_LOCAL_STATE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'Next Button -> OTP Screen ON_PRESS Complete',
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
                    height: 38,
                    marginBottom: 25,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Next'}
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
      {/* Phone OTP Modal Popup */}
      <>
        {!loginPhoneOTPModalVisible ? null : (
          <Modal
            visible={loginPhoneOTPModalVisible}
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
                <Icon
                  size={24}
                  color={theme.colors['Primary']}
                  name={'MaterialIcons/sms'}
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
                {"We've just texted you a verification code!"}
              </Text>

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
                  'Fill in the code on the next step to verify your phone number.'
                }
              </Text>
              {/* Next -> OTP Entry */}
              <Button
                onPress={() => {
                  try {
                    setLoginPhoneOTPModalVisible(false);
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
                    zIndex: -1,
                  },
                  dimensions.width
                )}
                disabled={false}
                title={'Next'}
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
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
