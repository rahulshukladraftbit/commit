import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import clearQuoteInterval from '../global-functions/clearQuoteInterval';
import combineFees from '../global-functions/combineFees';
import parseNetwork from '../global-functions/parseNetwork';
import roundToTwo from '../global-functions/roundToTwo';
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
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const CryptoBuyScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const getQuote = async (Variables, setGlobalVariableValue) => {
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
    const quoteURL = `${Variables.BASE_URL}/v1/transactions/quote?fiatCurrencyCode=${Variables.fiatCurrencyCode}&cryptoCurrencyCode=${Variables.cryptoCurrencyCode}&fixedSide=${Variables.fixedSide}&fixedAmount=${Variables.fixedAmount}&transactionType=wallet`;

    //Get User Limits
    const userLimits = await fetch(limitsURL, options).then(response =>
      response.json()
    );

    maxTransaction = userLimits.maxTransaction;
    availableLimit = userLimits.monthly.max - userLimits.monthly.used;

    if (Variables.fixedSide === 'fiat') {
      if (
        Variables.fixedAmount > maxTransaction ||
        Variables.fixedAmount > availableLimit
      ) {
        setQuoteOverLimits(true);
      } else {
        setQuoteOverLimits(false);
      }

      fetch(quoteURL, options)
        .then(response => {
          response.json().then(json => {
            if (!json.statusCode) {
              setInvalidQuote(false);
              setCryptoAmount(String(json.quotedAmount));
              setNobaFee(json.nobaFee);
              setProcessingFee(json.processingFee);
              setNetworkFee(json.networkFee);
              setExchangeRate(String(parseFloat(json.exchangeRate).toFixed(2)));
              setQuoteId(json.quoteID);
            } else {
              setInvalidQuote(true);
              setCryptoAmount('0');
              setNobaFee(0);
              setProcessingFee(0);
              setNetworkFee(0);
              setExchangeRate(0);
              setQuoteId(null);
            }
          });
        })
        .catch(e =>
          e.json().then(json => {
            console.log(json);
          })
        );
    } else {
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
              setFiatAmount(String(json.quotedAmount));
              setNobaFee(json.nobaFee);
              setProcessingFee(json.processingFee);
              setNetworkFee(json.networkFee);
              setExchangeRate(String(parseFloat(json.exchangeRate).toFixed(2)));
              setQuoteId(json.quoteID);
            } else {
              setInvalidQuote(true);
              setFiatAmount('0');
              setNobaFee(0);
              setProcessingFee(0);
              setNetworkFee(0);
              setExchangeRate(0);
              setQuoteId(null);
            }
          });
        })
        .catch(e => console.log(e));
    }
  };
  React.useEffect(() => {
    getQuote(
      Variables,
      setGlobalVariableValue,
      Variables.fixedSide,
      Variables.fixedAmount,
      Variables.cryptoCurrencyCode,
      Variables.fiatCurrencyCode
    );

    if (!Variables.updateInterval) {
      return;
    } else {
      if (!Variables.quoteIntervalID) {
        setGlobalVariableValue({
          key: 'quoteIntervalID',
          value: setInterval(() => {
            getQuote(
              Variables,
              setGlobalVariableValue,
              Variables.fixedSide,
              Variables.fixedAmount,
              Variables.cryptoCurrencyCode,
              Variables.fiatCurrencyCode
            );
          }, 5000),
        });
        setGlobalVariableValue({ key: 'updateInterval', value: false });
      } else {
        clearInterval(Variables.quoteIntervalID);
        setGlobalVariableValue({
          key: 'quoteIntervalID',
          value: setInterval(() => {
            getQuote(
              Variables,
              setGlobalVariableValue,
              Variables.fixedSide,
              Variables.fixedAmount,
              Variables.cryptoCurrencyCode,
              Variables.fiatCurrencyCode
            );
          }, 5000),
        });
        setGlobalVariableValue({ key: 'updateInterval', value: false });
      }
    }
  }, [Variables.updateInterval]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setGlobalVariableValue({ key: 'updateInterval', value: true });
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [Variables.fixedAmount]);
  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await getQuote(Variables, setGlobalVariableValue);
        setGlobalVariableValue({
          key: 'updateInterval',
          value: true,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [cryptoAmount, setCryptoAmount] = React.useState('');
  const [exchangeRate, setExchangeRate] = React.useState(0);
  const [fiatAmount, setFiatAmount] = React.useState('50');
  const [
    identityInformationalModalVisible,
    setIdentityInformationalModalVisible,
  ] = React.useState(false);
  const [invalidQuote, setInvalidQuote] = React.useState(false);
  const [networkFee, setNetworkFee] = React.useState(0);
  const [nobaFee, setNobaFee] = React.useState(0);
  const [processingFee, setProcessingFee] = React.useState(0);
  const [quoteId, setQuoteId] = React.useState('');
  const [quoteOverLimits, setQuoteOverLimits] = React.useState(false);
  const [subFeesVisible, setSubFeesVisible] = React.useState(false);

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
                    clearQuoteInterval(Variables);
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
                {'Buy '}
                {Constants['cryptoCurrencyCode']?.ticker}
              </Text>
            </View>

            <ScrollView bounces={true} showsVerticalScrollIndicator={true}>
              {/* Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Icon Border View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: theme.colors['Secondary 4'],
                      borderRadius: 100,
                      height: 100,
                      justifyContent: 'center',
                      marginBottom: 10,
                      width: 100,
                    },
                    dimensions.width
                  )}
                >
                  {/* Icon SVG */}
                  <SVG
                    style={StyleSheet.applyWidth(
                      { height: 70, width: 70 },
                      dimensions.width
                    )}
                    source={Constants['cryptoCurrencyIcon']}
                  />
                </View>
                {/* Asset Row */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginBottom: 10,
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Asset Name */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                        marginRight: 15,
                        textAlign: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    {Constants['cryptoCurrencyName']}
                  </Text>
                  {/* Asset Network */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors['Primary-Light-4'],
                        borderRadius: 100,
                        justifyContent: 'center',
                        paddingBottom: 2,
                        paddingLeft: 7,
                        paddingRight: 7,
                        paddingTop: 2,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Asset Network */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary'],
                          fontFamily: 'System',
                          fontWeight: '600',
                        },
                        dimensions.width
                      )}
                    >
                      {parseNetwork(
                        Variables,
                        Constants['cryptoCurrencyCode'],
                        Constants['cryptoCurrencyName']
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Center View */}
              <View
                style={StyleSheet.applyWidth({ zIndex: 1 }, dimensions.width)}
              >
                {/* Pay View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
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
                        marginBottom: 20,
                        textAlign: 'left',
                      },
                      dimensions.width
                    )}
                  >
                    {'Pay'}
                  </Text>
                  {/* Pay Input View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { justifyContent: 'center', marginBottom: 10 },
                      dimensions.width
                    )}
                  >
                    {/* Pay Input */}
                    <TextInput
                      onChangeText={newPayInputValue => {
                        try {
                          const value9vBnCNKi = newPayInputValue;
                          setFiatAmount(value9vBnCNKi);
                          const fiatAmount = value9vBnCNKi;
                          setGlobalVariableValue({
                            key: 'fixedAmount',
                            value: newPayInputValue,
                          });
                          const fixedSide = setGlobalVariableValue({
                            key: 'fixedSide',
                            value: 'fiat',
                          });
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
                      value={fiatAmount}
                      placeholder={fiatAmount.toString()}
                      placeholderTextColor={theme.colors['Primary-Light-1']}
                      returnKeyType={'done'}
                      editable={true}
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
                          justifyContent: 'space-between',
                          paddingLeft: 5,
                          paddingRight: 5,
                          position: 'absolute',
                          right: 15,
                          width: 95,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          { borderRadius: 100, height: 25, width: 25 },
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
                            fontWeight: '400',
                          },
                          dimensions.width
                        )}
                      >
                        {'USD'}
                      </Text>
                      <Icon
                        color={theme.colors['Primary-Light-1']}
                        size={20}
                        name={'MaterialIcons/keyboard-arrow-down'}
                      />
                    </View>
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
                            marginBottom: 10,
                            marginLeft: 15,
                            marginRight: 15,
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
                            marginBottom: 10,
                            marginLeft: 15,
                            marginRight: 15,
                          },
                          dimensions.width
                        )}
                      >
                        {'This transaction is over your limits.'}
                      </Text>
                    )}
                  </>
                </View>
                {/* Fees View */}
                <View
                  style={StyleSheet.applyWidth(
                    { paddingBottom: 20 },
                    dimensions.width
                  )}
                >
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
                          {'Conversion'}
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
                      {exchangeRate} {Constants['fiatCurrencyCode']}
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
                          {combineFees(
                            Variables,
                            processingFee,
                            nobaFee,
                            networkFee
                          )}
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
                            {roundToTwo(nobaFee)}
                          </Text>
                        </View>
                        {/* Fee Row 3 */}
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
                                {'Network fee'}
                              </Text>
                              <Icon
                                name={'MaterialIcons/info-outline'}
                                size={15}
                                color={theme.colors['Primary-Light-1']}
                              />
                            </View>
                          </Touchable>
                          {/* Network Fee */}
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
                            {'As low as $'}
                            {roundToTwo(networkFee)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                </View>
                {/* Get View */}
                <View>
                  {/* Get Header */}
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
                    {'Get'}
                  </Text>
                  {/* Get Input View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { justifyContent: 'center', marginBottom: 10 },
                      dimensions.width
                    )}
                  >
                    {/* Get Input */}
                    <TextInput
                      onChangeText={newGetInputValue => {
                        try {
                          const valueEFwiZ3eo = newGetInputValue;
                          setCryptoAmount(valueEFwiZ3eo);
                          const cryptoAmount = valueEFwiZ3eo;
                          setGlobalVariableValue({
                            key: 'fixedAmount',
                            value: cryptoAmount,
                          });
                          const fixedSide = setGlobalVariableValue({
                            key: 'fixedSide',
                            value: 'crypto',
                          });
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
                      value={cryptoAmount}
                      placeholder={cryptoAmount.toString()}
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
                        source={Constants['cryptoCurrencyIcon']}
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
                        {sliceTicker(Constants['cryptoCurrencyCode'])}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
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
                onPress={() => {
                  try {
                    clearQuoteInterval(Variables);
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
        </View>
      </View>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(CryptoBuyScreen);
