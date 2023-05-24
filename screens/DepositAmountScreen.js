import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import combineFees from '../global-functions/combineFees';
import sliceTicker from '../global-functions/sliceTicker';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  IconButton,
  SVG,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const DepositAmountScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const getQuoteUSDCDeposit = async (
    Variables,
    setGlobalVariableValue,
    fixedAmount
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

    const limitsURL = `${Variables.BASE_URL}/v1/consumers/limits`;
    const quoteURL = `${Variables.BASE_URL}/v1/transactions/quote?fiatCurrencyCode=${Variables.fiatCurrencyCode}&cryptoCurrencyCode=${Variables.cryptoCurrencyCode}&fixedSide=crypto&fixedAmount=${Variables.fixedAmount}&transactionType=wallet`;

    //Get User Limits
    const userLimits = await fetch(limitsURL, options).then(response =>
      response.json()
    );

    maxTransaction = userLimits.maxTransaction;
    availableLimit = userLimits.monthly.max - userLimits.monthly.used;

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
            setNobaFee(String(json.nobaFee.toFixed(2)));
            setProcessingFee(String(json.processingFee.toFixed(2)));
            setExchangeRate(String(json.exchangeRate.toFixed(2)));
            setQuoteId(json.quoteID);
          } else {
            setInvalidQuote(true);
            setQuotedAmount('0');
            setNobaFee('0');
            setProcessingFee('0');
            setQuoteId(null);
          }
        });
      })
      .catch(e => console.log(e));
  };
  React.useEffect(() => {
    const handler = setTimeout(() => {
      getQuoteUSDCDeposit(
        Variables,
        setGlobalVariableValue,
        Variables.fixedSide,
        Variables.fixedAmount,
        Variables.cryptoCurrencyCode,
        Variables.fiatCurrencyCode
      );
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [Variables.fixedAmount]);
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
          fixedAmount
        );
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [disableButton, setDisableButton] = React.useState(true);
  const [exchangeRate, setExchangeRate] = React.useState('');
  const [
    exchangeRateInformationalModalVisible,
    setExchangeRateInformationalModalVisible,
  ] = React.useState(false);
  const [fiatAmount, setFiatAmount] = React.useState('50');
  const [fixedAmount, setFixedAmount] = React.useState('50');
  const [fixedSide, setFixedSide] = React.useState('fiat');
  const [invalidQuote, setInvalidQuote] = React.useState(false);
  const [nobaFee, setNobaFee] = React.useState('');
  const [processingFee, setProcessingFee] = React.useState('');
  const [quoteId, setQuoteId] = React.useState('');
  const [quoteIntervalID, setQuoteIntervalID] = React.useState(0);
  const [quoteOverLimits, setQuoteOverLimits] = React.useState(false);
  const [quotedAmount, setQuotedAmount] = React.useState(0);
  const [subFeesVisible, setSubFeesVisible] = React.useState(false);
  const [updateInterval, setUpdateInterval] = React.useState(true);

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
        <KeyboardAvoidingView
          enabled={true}
          behavior={'position'}
          keyboardVerticalOffset={10}
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
            {/* Center View */}
            <View
              style={StyleSheet.applyWidth({ zIndex: 1 }, dimensions.width)}
            >
              {/* Amount View */}
              <View>
                {/* Amount Header */}
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
                  {'Amount'}
                </Text>
                {/* Amount Input View */}
                <View
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'center', marginBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* Amount Input */}
                  <TextInput
                    onChangeText={newAmountInputValue => {
                      try {
                        setGlobalVariableValue({
                          key: 'fixedAmount',
                          value: newAmountInputValue,
                        });
                        setQuoteOverLimits(false);
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
                        marginRight: 15,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 10,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                    placeholder={'50'}
                    editable={true}
                    placeholderTextColor={theme.colors['Primary-Light-1']}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                  />
                  {/* Currency Button */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors['Secondary 4'],
                        borderRadius: 100,
                        flexDirection: 'row',
                        height: 40,
                        paddingLeft: 5,
                        paddingRight: 5,
                        position: 'absolute',
                        right: 15,
                        top: 10,
                        width: 95,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Icon SVG */}
                    <SVG
                      style={StyleSheet.applyWidth(
                        { height: 25, marginRight: 10, width: 25 },
                        dimensions.width
                      )}
                      source={
                        'https://dj61eezhizi5l.cloudfront.net/assets/images/currency-logos/crypto/usdc.eth.svg'
                      }
                    />
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
                      {'USDc'}
                    </Text>
                  </View>
                  {/* Alert Text */}
                  <>
                    {!invalidQuote ? null : (
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Red'],
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {'Please enter a valid purchase amount.'}
                      </Text>
                    )}
                  </>
                  {/* Limits Alert Text */}
                  <>
                    {!quoteOverLimits ? null : (
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Red'],
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {'This transaction is over your limits.'}
                      </Text>
                    )}
                  </>
                </View>
              </View>
              {/* Quote View */}
              <View>
                {/* Quote Header */}
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
                  {'Deposit quote'}
                </Text>
                {/* Fees View */}
                <View
                  style={StyleSheet.applyWidth(
                    { paddingBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* Estimated Cost */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 15,
                        paddingLeft: 15,
                        paddingRight: 15,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Estimated Cost */}
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
                            fontWeight: '700',
                            marginRight: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {'Total cost'}
                      </Text>
                    </View>

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
                  {/* Exchange rate */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 15,
                        paddingLeft: 15,
                        paddingRight: 15,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Touchable Exchange Rate */}
                    <Touchable
                      onPress={() => {
                        try {
                          setExchangeRateInformationalModalVisible(true);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
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
                      {'1 '}
                      {sliceTicker(Constants['cryptoCurrencyCode'])}
                      {' = '}
                      {exchangeRate} {'USD'}
                    </Text>
                  </View>
                  {/* Total Fee Row */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 15,
                        paddingRight: 15,
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
                    {/* Touchable Fee */}
                    <Touchable
                      onPress={() => {
                        try {
                          setSubFeesVisible(!subFeesVisible);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      {/* Fee Right Row */}
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center', flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        {/* Total fee */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontWeight: '400',
                              marginRight: 5,
                            },
                            dimensions.width
                          )}
                        >
                          {'$'}
                          {combineFees(Variables, processingFee, nobaFee, 0)}
                        </Text>
                        {/* Close Icon */}
                        <>
                          {!subFeesVisible ? null : (
                            <Icon
                              size={15}
                              color={theme.colors['Primary-Light-1']}
                              name={'MaterialIcons/keyboard-arrow-up'}
                            />
                          )}
                        </>
                        {/* Open Icon */}
                        <>
                          {subFeesVisible ? null : (
                            <Icon
                              size={15}
                              color={theme.colors['Primary-Light-1']}
                              name={'MaterialIcons/keyboard-arrow-down'}
                            />
                          )}
                        </>
                      </View>
                    </Touchable>
                  </View>
                  {/* Fee Subview */}
                  <>
                    {!subFeesVisible ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          { paddingTop: 20 },
                          dimensions.width
                        )}
                      >
                        {/* Fee Row 1 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 20,
                              paddingLeft: 15,
                              paddingRight: 15,
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
                            {processingFee}
                          </Text>
                        </View>
                        {/* Fee Row 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 20,
                              paddingLeft: 15,
                              paddingRight: 15,
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
                            {nobaFee}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        {/* Button View */}
        <View
          style={StyleSheet.applyWidth({ marginBottom: 65 }, dimensions.width)}
        >
          {/* Next Invalid */}
          <>
            {!invalidQuote ? null : (
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
          {/* Next */}
          <>
            {invalidQuote ? null : (
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
                disabled={false}
                title={'Next'}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
        </View>
      </View>
      {/* Exchange Rate Informational Modal Popup */}
      <>
        {!exchangeRateInformationalModalVisible ? null : (
          <Modal
            visible={exchangeRateInformationalModalVisible}
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
                  name={'FontAwesome/exchange'}
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
                {'How is the exchange rate calculated?'}
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
                  'Noba partners with leading foreign currency exchanges to provide the best market rate. The provided rate is an estimate and may change between now and the time the transaction is processed.'
                }
              </Text>
              {/* Close Info Modal Button */}
              <Button
                onPress={() => {
                  try {
                    setExchangeRateInformationalModalVisible(false);
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

export default withTheme(DepositAmountScreen);
