import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
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
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const OnboardingPhoneVerificationOTPScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const handleInvalidButton = (otpValid, buttonLoading) => {
    if (!otpValid & !buttonLoading) {
      return true;
    } else {
      return false;
    }
  };

  const resetVariables = () => {
    setOtpError(false);
    setButtonLoading(false);
  };

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
        if (isLocked) {
          props.navigation.navigate('IssuesAccountLockedScreen');

          return;
        } else if (status === 'Approved') {
          props.navigation.navigate('AuthenticatedPrimaryScreen');

          return;
        } else if (kyc === 'NotSubmitted') {
          props.navigation.navigate('OnboardingNumberScreen');

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
      props.navigation.navigate('OnboardingPhoneScreen');
      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'A technical error has occured. Please try again.',
        'error'
      );
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
        behavior={'padding'}
        enabled={false}
      >
        {/* Center Container */}
        <View
          style={StyleSheet.applyWidth(
            { height: '100%', justifyContent: 'space-between' },
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
              {/* Verify wallet */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    textTransform: 'none',
                  },
                  dimensions.width
                )}
              >
                {'Verify phone'}
              </Text>
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
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {'Enter verification code'}
              </Text>
              {/* Verification Code */}
              <TextInput
                onChangeText={newVerificationCodeValue => {
                  try {
                    setOtpValue(newVerificationCodeValue);
                    setOtpError(false);
                    setOtpValid(validateOTP(newVerificationCodeValue));
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
              {/* Alert Text */}
              <>
                {!otpError ? null : (
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
                      },
                      dimensions.width
                    )}
                  >
                    {
                      'The submitted code is invalid. Please try again or request a new code.'
                    }
                  </Text>
                )}
              </>
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
                    {/* Resend SMS Link */}
                    <Link
                      onPress={() => {
                        const handler = async () => {
                          try {
                            await NobaServerApi.authenticationRequestOTPPOST(
                              Constants,
                              {
                                emailOrPhone: Constants['phoneNumber'],
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
                      title={'Resend SMS'}
                    />
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
          {/* Button View */}
          <View>
            {/* Verify Invalid */}
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
                      height: 42,
                      marginBottom: 65,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  disabled={true}
                  title={'Verify'}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Verify */}
            <>
              {!otpValid ? null : (
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setOtpValid(false);
                        setButtonLoading(true);
                        const authenticationResponse =
                          await NobaServerApi.authenticationVerifyOTPPOST(
                            Constants,
                            {
                              emailOrPhone: Constants['phoneNumber'],
                              identityType: 'CONSUMER',
                              otp: parseInt(otpValue, 10),
                            }
                          );
                        const access_token =
                          authenticationResponse?.access_token;
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
                      height: 42,
                      marginBottom: 65,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  disabled={false}
                  title={'Verify'}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Verify Loading */}
            <>
              {!buttonLoading ? null : (
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const otpResponse =
                          await NobaServerApi.authenticationVerifyOTPPOST(
                            Constants,
                            {
                              emailOrPhone: Constants['phoneNumber'],
                              identityType: 'CONSUMER',
                            }
                          );
                        const access_token = otpResponse?.access_token;
                        setOtpError(isEmptyString(access_token));
                        if (isEmptyString(access_token)) {
                          return;
                        }
                        await handleResponse(
                          Variables,
                          setGlobalVariableValue,
                          undefined
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
                      marginBottom: 65,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={''}
                  disabled={false}
                  loading={true}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingPhoneVerificationOTPScreen);
