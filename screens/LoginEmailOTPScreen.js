import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import isEmptyString from '../global-functions/isEmptyString';
import validateOTP from '../global-functions/validateOTP';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  IconButton,
  Link,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
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

const LoginEmailOTPScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const handleResponse = async (
    Variables,
    setGlobalVariableValue,
    access_token
  ) => {
    if (!access_token) {
      setButtonLoading(false);
      setOtpValid(true);
      setOtpError(true);

      return;
    }

    setGlobalVariableValue({
      key: 'AUTHORIZATION_HEADER',
      value: 'Bearer ' + access_token,
    });

    const url = `${Variables.BASE_URL}/v1/consumers`;

    const options = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
        'x-noba-api-key': Variables.X_NOBA_API_KEY,
      }),
    };

    try {
      const response = await fetch(url, options);
      const userObject = await response.json();

      if (userObject) {
        const status = userObject.status;
        const kyc = userObject.kycVerificationData.kycVerificationStatus;
        const document =
          userObject.documentVerificationData.documentVerificationStatus;
        const isLocked = userObject.isLocked;

        //STATUSES ARE CHANGING - ALIGN WITH J-WU and THE GHOST
        if (status === 'PermanentHold') {
          props.navigation.navigate('IssuesAccountLockedScreen');

          return;
        } else if (status === 'Approved') {
          props.navigation.navigate('AuthenticatedPrimaryScreen');

          return;
        } else if (kyc === 'NotSubmitted') {
          props.navigation.navigate('OnboardingIncompleteScreen');

          return;
        } else if (document === 'NotSubmitted') {
          props.navigation.navigate('IdentityVerificationStartScreen');

          return;
        } else {
          props.navigation.navigate('AuthenticatedPrimaryScreen');

          return;
        }
      }
    } catch (error) {
      console.log(error);
      setGlobalVariableValue({ key: 'AUTHORIZATION_HEADER', value: '' });

      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'A technical error has occured. Please login again or reach out to support.',
        'error'
      );
    }
  };

  const resetVariables = () => {
    setButtonLoading(false);
    setOtpValid(false);
  };

  const handleInvalidButton = (otpValid, buttonLoading) => {
    if (!otpValid & !buttonLoading) {
      return true;
    } else {
      return false;
    }
  };

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      resetVariables();
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [noEmailModalVisible, setNoEmailModalVisible] = React.useState(false);
  const [otpError, setOtpError] = React.useState(false);
  const [otpValid, setOtpValid] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');

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
        enabled={false}
        behavior={'padding'}
      >
        {/* Center View */}
        <View
          style={StyleSheet.applyWidth(
            { height: '100%', justifyContent: 'space-between' },
            dimensions.width
          )}
        >
          {/* Top View */}
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
            </View>
            {/* OTP Input View */}
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 36 },
                dimensions.width
              )}
            >
              {/* Enter Verification Header */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 10,
                    marginTop: 16,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {'Enter verification code'}
              </Text>
              {/* OTP */}
              <TextInput
                onChangeText={newOTPValue => {
                  try {
                    setOtpValue(newOTPValue);
                    setOtpValid(validateOTP(newOTPValue));
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
                    marginBottom: 15,
                    marginTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
                value={otpValue}
                placeholder={'Verification code'}
                editable={true}
                secureTextEntry={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                keyboardType={'numeric'}
                returnKeyType={'done'}
                maxLength={6}
              />
              {/* Expire Text */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    marginBottom: 15,
                  },
                  dimensions.width
                )}
              >
                {'This code will expire in '}
                {/* Expire Text */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '700',
                    },
                    dimensions.width
                  )}
                >
                  {'15 minutes.'}
                </Text>
              </Text>
              {/* Touchable Informational Row */}
              <Touchable
                onPress={() => {
                  try {
                    setNoEmailModalVisible(true);
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
                      {
                        color: theme.colors['Primary-Light-1'],
                        fontFamily: 'System',
                        fontWeight: '400',
                        marginLeft: 5,
                      },
                      dimensions.width
                    )}
                  >
                    {"I didn't get my code. "}
                    {/* Resend Email Link */}
                    <Link
                      onPress={() => {
                        const handler = async () => {
                          try {
                            await NobaServerApi.authenticationRequestOTPPOST(
                              Constants,
                              {
                                emailOrPhone: Constants['emailAddress'],
                                identityType: 'CONSUMER',
                              }
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary-Light-1'],
                          fontFamily: 'System',
                          fontWeight: '700',
                          textDecorationLine: 'underline',
                        },
                        dimensions.width
                      )}
                      title={'Resend email'}
                    />
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
          {/* Bottom View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 65 },
              dimensions.width
            )}
          >
            {/* Invalid Login Button */}
            <>
              {!handleInvalidButton(otpValid, buttonLoading) ? null : (
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
                      height: 38,
                      marginBottom: 16,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Login'}
                  disabled={true}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Login Loading Button */}
            <>
              {!buttonLoading ? null : (
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
                      height: 38,
                      marginBottom: 16,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={''}
                  loading={true}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Login Button */}
            <>
              {!otpValid ? null : (
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setOtpValid(false);
                        setButtonLoading(true);
                        const optVerificationResposne =
                          await NobaServerApi.authenticationVerifyOTPPOST(
                            Constants,
                            {
                              emailOrPhone: Constants['emailAddress'],
                              identityType: 'CONSUMER',
                              otp: parseInt(otpValue, 10),
                            }
                          );
                        const access_token =
                          optVerificationResposne?.access_token;
                        await handleResponse(
                          Variables,
                          setGlobalVariableValue,
                          access_token
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
                      height: 38,
                      marginBottom: 16,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Login'}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Disclosure Group */}
            <Text
              style={StyleSheet.applyWidth(
                { color: theme.colors['Primary-Light-1'], textAlign: 'center' },
                dimensions.width
              )}
            >
              {'By signing in you agree to our '}
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
              {/* . */}
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
      {/* Did Not Receive Code Modal Popup */}
      <>
        {!noEmailModalVisible ? null : (
          <Modal
            visible={noEmailModalVisible}
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
                {/* Shield Icon */}
                <Icon
                  size={24}
                  color={theme.colors['Primary']}
                  name={'Ionicons/mail-unread'}
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
                adjustsFontSizeToFit={true}
              >
                {"Didn't get your verification code?"}
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
                  'Some email clients may filter our emails as promotional or spam messages. Please check these mailboxes or request another code: '
                }
                {/* Resend Email Link */}
                <Link
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await NobaServerApi.authenticationRequestOTPPOST(
                          Constants,
                          { identityType: 'CONSUMER' }
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary-Light-1'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      textDecorationLine: 'underline',
                    },
                    dimensions.width
                  )}
                  title={'Resend email'}
                />
              </Text>
              {/* Close Modal Button */}
              <Button
                onPress={() => {
                  try {
                    setNoEmailModalVisible(false);
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

export default withTheme(LoginEmailOTPScreen);
