import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import addPaymentMethod from '../global-functions/addPaymentMethod';
import maskExpiration from '../global-functions/maskExpiration';
import splitExpiry from '../global-functions/splitExpiry';
import truncateBIN from '../global-functions/truncateBIN';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  IconButton,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const PaymentsAddCardScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const handleResponse = (
    Variables,
    setGlobalVariableValue,
    addPaymentResponse,
    originScreen
  ) => {
    try {
      if (addPaymentResponse.statusCode === 400) {
        setButtonLoading(false);

        showToastFunction.showToast(
          Variables,
          setGlobalVariableValue,
          'A technical error has occured. Please try again.',
          'error'
        );

        return;
      }

      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'Card succesfully linked to your account.',
        'success'
      );

      if (originScreen === 'home') {
        props.navigation.navigate('AuthenticatedPrimaryScreen');

        return;
      }
      if (originScreen === 'deposit') {
        props.navigation.navigate('PaymentsCardSelectScreen');

        return;
      }
      if (originScreen === 'cryptoflow') {
        props.navigation.navigate('PaymentsSelectScreen');

        return;
      }
      if (originScreen === 'manage') {
        props.navigation.navigate('PaymentsManageScreen');

        return;
      }
    } catch (error) {
      setButtonLoading(false);

      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'A technical error has occured. Please try again.',
        'error'
      );

      return;
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
      setOriginScreen(props.route?.params?.originScreen ?? 'cryptoflow');
      setButtonLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [cardAuthorizationModalVisible, setCardAuthorizationModalVisible] =
    React.useState(false);
  const [cardCVVInputValue, setCardCVVInputValue] = React.useState('');
  const [cardExpirationInputValue, setCardExpirationInputValue] =
    React.useState('');
  const [cardNicknameInputValue, setCardNicknameInputValue] =
    React.useState('');
  const [cardNumberInputValue, setCardNumberInputValue] = React.useState('');
  const [originScreen, setOriginScreen] = React.useState('');
  const [unsupportedCard, setUnsupportedCard] = React.useState(false);

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
              {/* Add a new card */}
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
                {'Add a new card'}
              </Text>
            </View>
            {/* Card Header */}
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
              {'Debit/credit card'}
            </Text>
            {/* Card Icon Row */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 20,
                },
                dimensions.width
              )}
            >
              {/* Visa Icon */}
              <Image
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 18,
                    marginRight: 5,
                    width: 28,
                  },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.VISA}
              />
              {/* Mastercard Icon 1 */}
              <Image
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 18,
                    marginRight: 5,
                    width: 28,
                  },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.Mastercard1}
              />
              {/* Mastercard Icon 2 */}
              <Image
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 18,
                    marginRight: 5,
                    width: 28,
                  },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.Mastercard2}
              />
              {/* Diners Club Icon */}
              <Image
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 18,
                    marginRight: 5,
                    width: 28,
                  },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.DinersClub}
              />
              {/* AMEX Icon */}
              <Image
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 18,
                    marginRight: 5,
                    width: 28,
                  },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.AMEX}
              />
              {/* Discover Icon */}
              <Image
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 18,
                    marginRight: 5,
                    width: 28,
                  },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.Discover}
              />
              {/* JCB Icon */}
              <Image
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 18,
                    marginRight: 5,
                    width: 28,
                  },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.JCP}
              />
            </View>
            {/* Card Number Input */}
            <TextInput
              onChangeText={newCardNumberInputValue => {
                const handler = async () => {
                  try {
                    setCardNumberInputValue(newCardNumberInputValue);
                    const checkBINResult =
                      await NobaServerApi.assetsCheckBINGET(Constants, {
                        bin: truncateBIN(newCardNumberInputValue),
                      });
                    const binSupported = checkBINResult?.supported;
                    setUnsupportedCard(binSupported === 'NotSupported');
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
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
                  marginRight: 15,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 10,
                  width: '100%',
                },
                dimensions.width
              )}
              value={cardNumberInputValue}
              placeholder={'Card number'}
              editable={true}
              placeholderTextColor={theme.colors['Primary-Light-1']}
              keyboardType={'numeric'}
              returnKeyType={'done'}
              maxLength={19}
            />
            {/* Alert Text */}
            <>
              {!unsupportedCard ? null : (
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Red'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      marginLeft: 15,
                      marginRight: 15,
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  {
                    "The issuing bank for this credit card does not support cryptocurrencies! Please try another credit card or switch to a debit card. You can still add this card if you'd like us to notify you once banking policies have changed."
                  }
                </Text>
              )}
            </>
            {/* Card Input Row */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  marginTop: 20,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Expiration Date Input */}
              <TextInput
                onChangeText={newExpirationDateInputValue => {
                  try {
                    setCardExpirationInputValue(
                      maskExpiration(
                        newExpirationDateInputValue,
                        cardExpirationInputValue
                      )
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
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '47%',
                  },
                  dimensions.width
                )}
                value={cardExpirationInputValue}
                placeholder={'Exp MM/YY'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                textContentType={'none'}
                keyboardType={'numeric'}
                returnKeyType={'done'}
                maxLength={5}
              />
              {/* CVV Input */}
              <TextInput
                onChangeText={newCVVInputValue => {
                  try {
                    setCardCVVInputValue(newCVVInputValue);
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
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '47%',
                  },
                  dimensions.width
                )}
                value={cardCVVInputValue}
                placeholder={'CVV'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                keyboardType={'numeric'}
                returnKeyType={'done'}
                maxLength={4}
              />
            </View>
            {/* Card Nickname Input */}
            <TextInput
              onChangeText={newCardNicknameInputValue => {
                try {
                  setCardNicknameInputValue(newCardNicknameInputValue);
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
              value={cardNicknameInputValue}
              placeholder={'Card Nickname'}
              editable={true}
              placeholderTextColor={theme.colors['Primary-Light-1']}
              keyboardType={'default'}
              returnKeyType={'done'}
            />
            {/* Informational Alert View */}
            <>
              {!(
                (props.route?.params?.originScreen ?? 'cryptoflow') ===
                'cryptoflow'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Secondary 4'],
                      borderRadius: 10,
                      marginBottom: 20,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 10,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* Alert Icon */}
                  <Icon
                    style={StyleSheet.applyWidth(
                      { marginBottom: 5 },
                      dimensions.width
                    )}
                    size={24}
                    name={'Ionicons/ios-alert-circle-outline'}
                    color={theme.colors['Primary']}
                  />
                  {/* Alert Header */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '600',
                        lineHeight: 18,
                        marginBottom: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {'Debit cards are 40% more likely to succeed!'}
                  </Text>
                  {/* Alert Text */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '400',
                        paddingBottom: 5,
                      },
                      dimensions.width
                    )}
                  >
                    {
                      'Many of the banks that issue credit cards have internal policies against processing transactions involving cryptocurrencies and digital assets. Using a debit card will increase your chances of a successful transaction!'
                    }
                  </Text>
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
            {/* Save */}
            <Button
              onPress={() => {
                console.log('Save ON_PRESS Start');
                let error = null;
                try {
                  console.log('Start ON_PRESS:0 SET_SCREEN_LOCAL_STATE');
                  setCardAuthorizationModalVisible(true);
                  console.log('Complete ON_PRESS:0 SET_SCREEN_LOCAL_STATE');
                } catch (err) {
                  console.error(err);
                  error = err.message ?? err;
                }
                console.log(
                  'Save ON_PRESS Complete',
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
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Save'}
              disabled={false}
            >
              {'Sign Up'}
            </Button>
            {/* Save Invalid */}
            <>
              {!false ? null : (
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
                  title={'Save'}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Card Authorization Modal Popup */}
      <>
        {!cardAuthorizationModalVisible ? null : (
          <Modal
            visible={cardAuthorizationModalVisible}
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
                adjustsFontSizeToFit={true}
              >
                {
                  'A pre-authorization fee will occur once your credit card is saved.'
                }
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
                  'A pre-authorization charge of $0 or $1 USD will be put on your account to verify payment information. This helps avoid failed transactions. This charge is for validation purposes and will be canceled in 2-5 business days.'
                }
              </Text>
              {/* Next Modal Button */}
              <>
                {buttonLoading ? null : (
                  <Button
                    onPress={() => {
                      const handler = async () => {
                        try {
                          setButtonLoading(true);
                          const addPaymentResponse = await addPaymentMethod(
                            Variables,
                            setGlobalVariableValue,
                            cardNicknameInputValue,
                            'Card',
                            cardNumberInputValue,
                            splitExpiry(cardExpirationInputValue, 'month'),
                            splitExpiry(cardExpirationInputValue, 'year'),
                            cardCVVInputValue,
                            undefined,
                            undefined
                          );
                          handleResponse(
                            Variables,
                            setGlobalVariableValue,
                            addPaymentResponse,
                            originScreen
                          );
                          setCardAuthorizationModalVisible(false);
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
                        marginBottom: 25,
                        textAlign: 'center',
                      },
                      dimensions.width
                    )}
                    title={'Next'}
                  >
                    {'Sign Up'}
                  </Button>
                )}
              </>
              {/* Next Modal Loading Button */}
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
                        marginBottom: 25,
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

export default withTheme(PaymentsAddCardScreen);
