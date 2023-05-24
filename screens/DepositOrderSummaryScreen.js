import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import combineFees from '../global-functions/combineFees';
import handleTransaction from '../global-functions/handleTransaction';
import roundToTwo from '../global-functions/roundToTwo';
import validateForm from '../global-functions/validateForm';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Checkbox,
  Icon,
  IconButton,
  Link,
  SVG,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const DepositOrderSummaryScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const handleInvalidButton = (buttonLoading, formValid) => {
    if (!buttonLoading && !formValid) {
      return true;
    } else {
      return false;
    }
  };

  const handlePaymentMethodType = (Variables, setGlobalVariableValue) => {
    const pm = Variables.paymentMethod;

    if (pm.type === 'Card') {
      setPaymentMethodNumber(pm.cardData.last4Digits);
    } else {
      return;
    }
  };

  const getQuoteUSDCDeposit = async (
    Variables,
    setGlobalVariableValue,
    fixedAmount,
    fiatCurrencyCode,
    cryptoCurrencyCode
  ) => {
    const options = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Variables.AUTHORIZATION_HEADER,
        'x-noba-api-key': Variables.X_NOBA_API_KEY,
      }),
    };

    const limitsURL = 'https://api-dev.noba.com/v1/consumers/limits';
    const quoteURL = `https://api-dev.noba.com/v1/transactions/quote?fiatCurrencyCode=${fiatCurrencyCode}&cryptoCurrencyCode=${cryptoCurrencyCode}&fixedSide=crypto&fixedAmount=${fixedAmount}&transactionType=wallet`;

    //Get User Limits
    const userLimits = await fetch(limitsURL, options).then(response =>
      response.json()
    );

    maxTransaction = userLimits.maxTransaction;
    availableLimit = userLimits.monthly.max - userLimits.monthly.used;

    //Set the order date for this quote
    setOrderDate(TodaysDateFormatted.TodaysDateFormatted());

    fetch(quoteURL, options)
      .then(response => {
        response.json().then(json => {
          if (!json.statusCode) {
            if (
              String(json.quotedAmount) > maxTransaction ||
              String(json.quotedAmount) > availableLimit
            ) {
              setQuoteOverLimits(true);
            } else {
              setQuoteOverLimits(false);
            }
            setInvalidQuote(false);
            setQuotedAmount(String(json.quotedAmount));
            setNobaFee(json.nobaFee);
            setProcessingFee(json.processingFee);
            setExchangeRate(json.exchangeRate);
            setQuoteId(json.quoteID);
          } else {
            setInvalidQuote(true);
            setQuotedAmount('0');
            setNobaFee(0);
            setProcessingFee(0);
            setQuoteId(null);
          }
        });
      })
      .catch(e => console.log(e));
  };

  const handleResponse = (
    Variables,
    setGlobalVariableValue,
    transactionResponse
  ) => {
    try {
      if (transactionResponse.statusCode) {
        setButtonLoading(false);
        setFormValid(true);

        showToastFunction.showToast(
          Variables,
          setGlobalVariableValue,
          'A technical error has occured. Please try again or reach out to support.',
          'error'
        );

        return;
      }

      props.navigation.navigate('DepositOrderSubmittedScreen', {
        cryptoAmount: `${fixedAmount}`,
        orderID: `${transactionResponse.id}`,
      });

      return;
    } catch (error) {
      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'A technical error has occured. Please try again or reach out to support.',
        'error'
      );
    }
  };
  // React.useEffect(() =>{

  // getQuote(Variables, setGlobalVariableValue, Variables.fixedSide, Variables.fixedAmount, Variables.cryptoCurrencyCode, Variables.fiatCurrencyCode)

  //     if(!Variables.quoteIntervalID){
  //         setGlobalVariableValue({key: "quoteIntervalID", value: setInterval(() => {getQuote(Variables, setGlobalVariableValue, Variables.fixedSide, Variables.fixedAmount, Variables.cryptoCurrencyCode, Variables.fiatCurrencyCode)
  // }, 5000 )})
  //         setGlobalVariableValue({key: "updateInterval", value: false})
  //     } else{
  //         clearInterval(Variables.quoteIntervalID)
  //         setGlobalVariableValue({key: "quoteIntervalID", value: setInterval(() => {getQuote(Variables, setGlobalVariableValue, Variables.fixedSide, Variables.fixedAmount, Variables.cryptoCurrencyCode, Variables.fiatCurrencyCode)
  // }, 5000 )})
  //         setGlobalVariableValue({key: "updateInterval", value: false})
  //     }
  // }, [])
  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await getQuoteUSDCDeposit(
          Variables,
          setGlobalVariableValue,
          Constants['fixedAmount'],
          Constants['fiatCurrencyCode'],
          Constants['cryptoCurrencyCode']
        );
        handlePaymentMethodType(Variables, setGlobalVariableValue);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [cryptoAmount, setCryptoAmount] = React.useState('');
  const [exchangeRate, setExchangeRate] = React.useState(0);
  const [fiatAmount, setFiatAmount] = React.useState('');
  const [fixedAmount, setFixedAmount] = React.useState(
    Constants['fixedAmount']
  );
  const [fixedSide, setFixedSide] = React.useState(Constants['fixedSide']);
  const [formValid, setFormValid] = React.useState(false);
  const [invalidQuote, setInvalidQuote] = React.useState(false);
  const [networkFee, setNetworkFee] = React.useState(0);
  const [nobaFee, setNobaFee] = React.useState(0);
  const [nobaTermsChecked, setNobaTermsChecked] = React.useState(false);
  const [orderDate, setOrderDate] = React.useState('');
  const [paymentMethodNumber, setPaymentMethodNumber] = React.useState('');
  const [processingFee, setProcessingFee] = React.useState(0);
  const [quoteId, setQuoteId] = React.useState('');
  const [quoteIntervalID, setQuoteIntervalID] = React.useState(0);
  const [quoteOverLimits, setQuoteOverLimits] = React.useState(false);
  const [quotedAmount, setQuotedAmount] = React.useState(0);
  const [updateInterval, setUpdateInterval] = React.useState(true);
  const [validQuote, setValidQuote] = React.useState(false);
  const [zeroHashTermsChecked, setZeroHashTermsChecked] = React.useState(false);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['White'] },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
      hasBottomSafeArea={false}
    >
      {/* Center View */}
      <View
        style={StyleSheet.applyWidth(
          {
            height: '100%',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15,
            width: '100%',
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
            {/* Buy Header */}
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
              {'Deposit USDc'}
            </Text>
          </View>

          <ScrollView
            style={StyleSheet.applyWidth({ height: 500 }, dimensions.width)}
            showsVerticalScrollIndicator={true}
            bounces={true}
          >
            {/* Review */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Primary'],
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 20,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Review deposit request'}
            </Text>
            {/* Center View */}
            <View
              style={StyleSheet.applyWidth({ zIndex: 1 }, dimensions.width)}
            >
              {/* Get View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-4'],
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* Get Header */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Amount'}
                </Text>
                {/* Get Right Row */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      height: 40,
                      justifyContent: 'space-between',
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    dimensions.width
                  )}
                >
                  {/* Icon SVG */}
                  <SVG
                    style={StyleSheet.applyWidth(
                      { height: 25, marginRight: 5, width: 25 },
                      dimensions.width
                    )}
                    source={Constants['cryptoCurrencyIcon']}
                  />
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontWeight: '700',
                      },
                      dimensions.width
                    )}
                  >
                    {fixedAmount}
                    {' USDc'}
                  </Text>
                </View>
              </View>
              {/* Pay View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-4'],
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* Pay Header */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Deposit Quote'}
                </Text>
                {/* Pay Right Row */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      height: 40,
                      justifyContent: 'space-between',
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    dimensions.width
                  )}
                >
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 100,
                        height: 25,
                        marginRight: 5,
                        width: 25,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.UnitedStatesOfAmericaFlag}
                  />
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontWeight: '700',
                      },
                      dimensions.width
                    )}
                  >
                    {quotedAmount} {'USD'}
                  </Text>
                </View>
              </View>
              {/* Exchange rate */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-4'],
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* Touchable Conversion */}
                <Touchable>
                  {/* Fee Left Row */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary-Light-1'],
                          fontFamily: 'System',
                          fontSize: 14,
                          fontWeight: '400',
                          marginRight: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {'Exchange rate'}
                    </Text>
                    <Icon
                      name={'MaterialIcons/info-outline'}
                      size={15}
                      color={theme.colors['Primary-Light-1']}
                    />
                  </View>
                </Touchable>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'1 USDc = '}
                  {exchangeRate} {'USD'}
                </Text>
              </View>
              {/* Total Fee Row */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary-Light-1'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'Total fee'}
                </Text>
                {/* Total fee */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'$'}
                  {combineFees(Variables, processingFee, nobaFee, networkFee)}
                </Text>
              </View>
              {/* Fee Row 1 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  },
                  dimensions.width
                )}
              >
                {/* Touchable Processing Fee */}
                <Touchable>
                  {/* Fee Left Row */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary-Light-1'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          marginRight: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {'Processing fee'}
                    </Text>
                    <Icon
                      name={'MaterialIcons/info-outline'}
                      size={15}
                      color={theme.colors['Primary-Light-1']}
                    />
                  </View>
                </Touchable>
                {/* Processing Fee */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'$'}
                  {roundToTwo(processingFee)}
                </Text>
              </View>
              {/* Fee Row 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  },
                  dimensions.width
                )}
              >
                {/* Touchable Noba Fee */}
                <Touchable>
                  {/* Fee Left Row */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary-Light-1'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          marginRight: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {'Noba fee'}
                    </Text>
                    <Icon
                      name={'MaterialIcons/info-outline'}
                      size={15}
                      color={theme.colors['Primary-Light-1']}
                    />
                  </View>
                </Touchable>
                {/* Noba Fee */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'$'}
                  {roundToTwo(nobaFee)}
                </Text>
              </View>
              {/* Network Fee Disclosure */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                {
                  'The estimated network fee is an approximation and the actual network fee applied on a withdrawal may differ.'
                }
              </Text>
              {/* Date View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-4'],
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary-Light-1'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      marginRight: 5,
                    },
                    dimensions.width
                  )}
                >
                  {'Date'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {orderDate}
                </Text>
              </View>
              {/* Payment Method View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-4'],
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary-Light-1'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'Payment method'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'••• '}
                  {paymentMethodNumber}
                </Text>
              </View>
              {/* Noba Terms View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginTop: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Noba Terms Checkbox */}
                <Checkbox
                  onPress={newNobaTermsCheckboxValue => {
                    try {
                      setNobaTermsChecked(newNobaTermsCheckboxValue);
                      setFormValid(
                        validateForm(
                          newNobaTermsCheckboxValue,
                          zeroHashTermsChecked,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        )
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 5 },
                    dimensions.width
                  )}
                  status={nobaTermsChecked}
                  size={24}
                  color={theme.colors['Primary']}
                />
                {/* Noba Terms */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'I agree to the Noba '}
                  <Link
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.noba.com/terms-of-service'
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.primary,
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                      },
                      dimensions.width
                    )}
                    title={'Terms of Service'}
                  />
                  <Text
                    style={StyleSheet.applyWidth(
                      { color: theme.colors['Primary'], fontSize: 12 },
                      dimensions.width
                    )}
                  >
                    {", and I have read and understand Noba's "}
                  </Text>
                  <Link
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.noba.com/privacy-notice'
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.primary,
                        fontFamily: 'System',
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                      },
                      dimensions.width
                    )}
                    title={'Privacy Notice.'}
                  />
                </Text>
              </View>
              {/* Zero Hash Terms View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    marginBottom: 25,
                  },
                  dimensions.width
                )}
              >
                {/* Zero Hash Terms Checkbox */}
                <Checkbox
                  onPress={newZeroHashTermsCheckboxValue => {
                    try {
                      setZeroHashTermsChecked(newZeroHashTermsCheckboxValue);
                      setFormValid(
                        validateForm(
                          newZeroHashTermsCheckboxValue,
                          nobaTermsChecked,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        )
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 5 },
                    dimensions.width
                  )}
                  status={zeroHashTermsChecked}
                  size={24}
                  color={theme.colors['Primary']}
                />
                {/* Zero Hash Terms */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                    },
                    dimensions.width
                  )}
                >
                  {'I agree to the Zero Hash and Zero Hash Liquidity Services '}
                  <Link
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.noba.com/terms-of-service'
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.primary,
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                      },
                      dimensions.width
                    )}
                    title={'User Agreement'}
                  />
                  <Text
                    style={StyleSheet.applyWidth(
                      { color: theme.colors['Primary'], fontSize: 12 },
                      dimensions.width
                    )}
                  >
                    {', and I have read and understand the Zero Hash '}
                  </Text>
                  <Link
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.noba.com/privacy-notice'
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.primary,
                        fontFamily: 'System',
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                      },
                      dimensions.width
                    )}
                    title={'Privacy Policy'}
                  />
                  <Text
                    style={StyleSheet.applyWidth(
                      { color: theme.colors['Primary'], fontSize: 12 },
                      dimensions.width
                    )}
                  >
                    {' and '}
                  </Text>
                  <Link
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.noba.com/terms-of-service'
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.primary,
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                      },
                      dimensions.width
                    )}
                    title={'Regulatory Disclosures'}
                  />
                  <Text
                    style={StyleSheet.applyWidth(
                      { color: theme.colors['Primary'], fontSize: 12 },
                      dimensions.width
                    )}
                  >
                    {
                      '. I understand that the value of any cryptocurrency, including digital assets pegged to fiat currency, commodities, or any other asset, may go to zero.'
                    }
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* Button View */}
        <View
          style={StyleSheet.applyWidth({ marginBottom: 65 }, dimensions.width)}
        >
          {/* Deposit Invalid */}
          <>
            {!handleInvalidButton(formValid, buttonLoading) ? null : (
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
                title={'Deposit now'}
                disabled={true}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
          {/* Deposit Now */}
          <>
            {!formValid ? null : (
              <Button
                onPress={() => {
                  const handler = async () => {
                    try {
                      setFormValid(false);
                      setButtonLoading(true);
                      const transactionResponse = await handleTransaction(
                        Variables,
                        setGlobalVariableValue,
                        'crypto',
                        'nobaWallet',
                        Constants['paymentMethod']?.paymentToken,
                        Constants['fiatCurrencyCode'],
                        Constants['cryptoCurrencyCode'],
                        quotedAmount,
                        Constants['fixedAmount'],
                        'wallet',
                        Constants['sessionKey']
                      );
                      handleResponse(
                        Variables,
                        setGlobalVariableValue,
                        transactionResponse
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
                    textAlign: 'center',
                    zIndex: -1,
                  },
                  dimensions.width
                )}
                title={'Deposit now'}
                disabled={false}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
          {/* Deposit Now Loading */}
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
                    height: 42,
                    textAlign: 'center',
                    zIndex: -1,
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
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(DepositOrderSummaryScreen);
