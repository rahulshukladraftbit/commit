import React from 'react';
import * as CoinGeckoApi from '../apis/CoinGeckoApi.js';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import clearTransactionParams from '../global-functions/clearTransactionParams';
import findBalance from '../global-functions/findBalance';
import removeATags from '../global-functions/removeATags';
import roundToFiveOrLess from '../global-functions/roundToFiveOrLess';
import roundToTwo from '../global-functions/roundToTwo';
import sliceTicker from '../global-functions/sliceTicker';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  IconButton,
  SVG,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const CryptoAboutScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const getCoingeckoID = cryptoName => {
    const gcd = coingeckoCoins.coingeckoDictionary;

    try {
      thisID = gcd.find(element => element.name === cryptoName).coingeckoID;
      return thisID;
    } catch (error) {
      return;
    }
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'updateInterval',
        value: true,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [cryptoDescription, setCryptoDescription] = React.useState('');
  const [daySpanSelected, setDaySpanSelected] = React.useState('');
  const [priceOrPercent, setPriceOrPercent] = React.useState('percent');
  const [selectedTimeSpan, setSelectedTimeSpan] = React.useState('24H');
  const [thisCryptoSparkLine, setThisCryptoSparkLine] = React.useState([0, 0]);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Secondary 4'] },
        dimensions.width
      )}
      hasSafeArea={false}
      scrollable={false}
    >
      {/* Back Icon Button */}
      <IconButton
        onPress={() => {
          try {
            clearTransactionParams(Variables, setGlobalVariableValue);
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { marginBottom: 20, marginLeft: 15, marginTop: 60 },
          dimensions.width
        )}
        size={32}
        icon={'Ionicons/chevron-back-sharp'}
        color={theme.colors['Primary']}
      />
      {/* Fetch Quote */}
      <NobaServerApi.FetchTransactionsGetQuoteGET
        refetchInterval={parseInt(5000, 10)}
        cryptoCurrencyCode={Constants['cryptoCurrencyCode']}
        fiatCurrencyCode={'USD'}
        fixedAmount={50}
        fixedSide={'fiat'}
        transactionType={'onramp'}
      >
        {({ loading, error, data, refetchTransactionsGetQuote }) => {
          const fetchQuoteData = data;
          if (!fetchQuoteData || loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return (
              <Text style={{ textAlign: 'center' }}>
                There was a problem fetching this data
              </Text>
            );
          }

          return (
            <>
              {/* S1: Crypto Top */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['White'],
                    borderRadius: 30,
                    marginBottom: 15,
                    marginLeft: 10,
                    marginRight: 10,
                    paddingBottom: 25,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 25,
                  },
                  dimensions.width
                )}
              >
                {/* Crypto Top Row */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  {/* Icon and Name */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Crypto Icon */}
                    <SVG
                      style={StyleSheet.applyWidth(
                        { height: 32, marginRight: 10, width: 32 },
                        dimensions.width
                      )}
                      source={Constants['cryptoCurrencyIcon']}
                    />
                    {/* This Crypto Name */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary'],
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {Constants['cryptoCurrencyName']}
                    </Text>
                  </View>
                  {/* This Crypto Price */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary-Light-1'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                      },
                      dimensions.width
                    )}
                  >
                    {'$'}
                    {roundToTwo(fetchQuoteData?.exchangeRate)}
                  </Text>
                </View>
              </View>
              {/* Sroll Center Frame */}
              <ScrollView
                contentContainerStyle={StyleSheet.applyWidth(
                  { paddingBottom: 215 },
                  dimensions.width
                )}
                bounces={true}
                showsVerticalScrollIndicator={true}
              >
                {/* Fetch Coin Gecko */}
                <CoinGeckoApi.FetchGETCoinDetailsGET
                  coin={getCoingeckoID(Constants['cryptoCurrencyName'])}
                  onData={fetchCoinGeckoData => {
                    try {
                      setThisCryptoSparkLine(
                        fetchCoinGeckoData?.market_data?.sparkline_7d?.price
                      );
                      setCryptoDescription(fetchCoinGeckoData?.description?.en);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {({ loading, error, data, refetchGETCoinDetails }) => {
                    const fetchCoinGeckoData = data;
                    if (!fetchCoinGeckoData || loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return (
                        <Text style={{ textAlign: 'center' }}>
                          There was a problem fetching this data
                        </Text>
                      );
                    }

                    return (
                      <>
                        {/* Crypto View */}
                        <View>
                          {/* S2: Market Data */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors['White'],
                                borderRadius: 30,
                                marginBottom: 15,
                                marginLeft: 10,
                                marginRight: 10,
                                paddingBottom: 25,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 15,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Header Row */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginBottom: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Market Data Header */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Primary'],
                                    fontFamily: 'System',
                                    fontSize: 20,
                                    fontWeight: '700',
                                  },
                                  dimensions.width
                                )}
                                numberOfLines={1}
                                adjustsFontSizeToFit={true}
                              >
                                {sliceTicker(Constants['cryptoCurrencyCode'])}
                                {' Market Data'}
                              </Text>
                              {/* Market Cap Rank */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Primary'],
                                    fontFamily: 'System',
                                    fontSize: 18,
                                    fontWeight: '400',
                                  },
                                  dimensions.width
                                )}
                                adjustsFontSizeToFit={false}
                              >
                                {'Rank: '}
                                {fetchCoinGeckoData?.market_cap_rank}
                              </Text>
                            </View>
                            {/* Change Rows */}
                            <View
                              style={StyleSheet.applyWidth(
                                { marginBottom: 10 },
                                dimensions.width
                              )}
                            >
                              {/* Change Row */}
                              <>
                                {!(selectedTimeSpan === '24H') ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Change Label */}
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
                                      adjustsFontSizeToFit={false}
                                    >
                                      {'Change (24H)'}
                                    </Text>
                                    <>
                                      {!(
                                        priceOrPercent === 'percent'
                                      ) ? null : (
                                        <Touchable
                                          onPress={() => {
                                            try {
                                              setPriceOrPercent('price');
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          {/* Price Change Percent 24h */}
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color: theme.colors['Primary'],
                                                fontFamily: 'System',
                                                fontSize: 18,
                                                fontWeight: '400',
                                              },
                                              dimensions.width
                                            )}
                                            adjustsFontSizeToFit={false}
                                          >
                                            {roundToTwo(
                                              fetchCoinGeckoData?.market_data
                                                ?.price_change_percentage_24h
                                            )}
                                            {'%'}
                                          </Text>
                                        </Touchable>
                                      )}
                                    </>
                                    <>
                                      {!(priceOrPercent === 'price') ? null : (
                                        <Touchable
                                          onPress={() => {
                                            try {
                                              setPriceOrPercent('percent');
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          {/* Price Change 24h */}
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color: theme.colors['Primary'],
                                                fontFamily: 'System',
                                                fontSize: 18,
                                                fontWeight: '400',
                                              },
                                              dimensions.width
                                            )}
                                            adjustsFontSizeToFit={false}
                                          >
                                            {'$'}
                                            {roundToTwo(
                                              fetchCoinGeckoData?.market_data
                                                ?.price_change_24h
                                            )}
                                          </Text>
                                        </Touchable>
                                      )}
                                    </>
                                  </View>
                                )}
                              </>
                              {/* Change Row */}
                              <>
                                {!(selectedTimeSpan === '7D') ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Change Label */}
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
                                      adjustsFontSizeToFit={false}
                                    >
                                      {'Change (7D)'}
                                    </Text>
                                    {/* Percent Change 7 Day */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors['Primary'],
                                          fontFamily: 'System',
                                          fontSize: 18,
                                          fontWeight: '400',
                                        },
                                        dimensions.width
                                      )}
                                      adjustsFontSizeToFit={false}
                                    >
                                      {roundToTwo(
                                        fetchCoinGeckoData?.market_data
                                          ?.price_change_percentage_7d
                                      )}
                                      {'%'}
                                    </Text>
                                  </View>
                                )}
                              </>
                              {/* Change Row */}
                              <>
                                {!(selectedTimeSpan === '30D') ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Change Label */}
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
                                      adjustsFontSizeToFit={false}
                                    >
                                      {'Change (30D)'}
                                    </Text>
                                    {/* Percent Change 30D */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors['Primary'],
                                          fontFamily: 'System',
                                          fontSize: 18,
                                          fontWeight: '400',
                                        },
                                        dimensions.width
                                      )}
                                      adjustsFontSizeToFit={false}
                                    >
                                      {roundToTwo(
                                        fetchCoinGeckoData?.market_data
                                          ?.price_change_percentage_30d
                                      )}
                                      {'%'}
                                    </Text>
                                  </View>
                                )}
                              </>
                            </View>
                            {/* Button Row */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  try {
                                    setSelectedTimeSpan('30D');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      height: 42,
                                      justifyContent: 'center',
                                      width: 50,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors['Primary'],
                                        fontFamily: 'System',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'30D'}
                                  </Text>
                                  {/* Button BG */}
                                  <>
                                    {!(selectedTimeSpan === '30D') ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            backgroundColor:
                                              theme.colors['Secondary'],
                                            borderRadius: 5,
                                            bottom: 0,
                                            height: 42,
                                            justifyContent: 'center',
                                            left: 0,
                                            position: 'absolute',
                                            width: 50,
                                            zIndex: -1,
                                          },
                                          dimensions.width
                                        )}
                                      />
                                    )}
                                  </>
                                </View>
                              </Touchable>

                              <Touchable
                                onPress={() => {
                                  try {
                                    setSelectedTimeSpan('7D');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      height: 42,
                                      justifyContent: 'center',
                                      width: 50,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors['Primary'],
                                        fontFamily: 'System',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'7D'}
                                  </Text>
                                  {/* Button BG */}
                                  <>
                                    {!(selectedTimeSpan === '7D') ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            backgroundColor:
                                              theme.colors['Secondary'],
                                            borderRadius: 5,
                                            bottom: 0,
                                            height: 42,
                                            justifyContent: 'center',
                                            left: 0,
                                            position: 'absolute',
                                            width: 50,
                                            zIndex: -1,
                                          },
                                          dimensions.width
                                        )}
                                      />
                                    )}
                                  </>
                                </View>
                              </Touchable>

                              <Touchable
                                onPress={() => {
                                  try {
                                    setSelectedTimeSpan('24H');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      height: 42,
                                      justifyContent: 'center',
                                      width: 50,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors['Primary'],
                                        fontFamily: 'System',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'24H'}
                                  </Text>
                                  {/* Button BG */}
                                  <>
                                    {!(selectedTimeSpan === '24H') ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            backgroundColor:
                                              theme.colors['Secondary'],
                                            borderRadius: 5,
                                            bottom: 0,
                                            height: 42,
                                            justifyContent: 'center',
                                            left: 0,
                                            position: 'absolute',
                                            width: 50,
                                            zIndex: -1,
                                          },
                                          dimensions.width
                                        )}
                                      />
                                    )}
                                  </>
                                </View>
                              </Touchable>
                            </View>
                          </View>
                          {/* S3: About Section */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors['White'],
                                borderRadius: 30,
                                marginBottom: 25,
                                marginLeft: 10,
                                marginRight: 10,
                                paddingBottom: 25,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 15,
                              },
                              dimensions.width
                            )}
                          >
                            {/* About This Crypto */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 20,
                                  fontWeight: '700',
                                  marginBottom: 10,
                                },
                                dimensions.width
                              )}
                              numberOfLines={1}
                              adjustsFontSizeToFit={true}
                            >
                              {'About '}
                              {Constants['cryptoCurrencyName']}
                            </Text>
                            {/* About Content */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 18,
                                  fontWeight: '400',
                                },
                                dimensions.width
                              )}
                              adjustsFontSizeToFit={false}
                            >
                              {removeATags(fetchCoinGeckoData?.description?.en)}
                            </Text>
                          </View>
                        </View>
                      </>
                    );
                  }}
                </CoinGeckoApi.FetchGETCoinDetailsGET>
              </ScrollView>
              {/* Bottom CTAs */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['White'],
                    bottom: 0,
                    height: 215,
                    left: 0,
                    paddingBottom: 50,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 25,
                    position: 'absolute',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  {/* Icon and Name */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Crypto Icon */}
                    <SVG
                      style={StyleSheet.applyWidth(
                        { height: 24, marginRight: 10, width: 24 },
                        dimensions.width
                      )}
                      source={Constants['cryptoCurrencyIcon']}
                    />
                    {/* This Crypto Name */}
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
                      {Constants['cryptoCurrencyName']}
                      {' Wallet'}
                    </Text>
                  </View>
                  {/* This Crypto Holdings */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary-Light-1'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '700',
                      },
                      dimensions.width
                    )}
                  >
                    {roundToFiveOrLess(
                      findBalance(Variables, fetchQuoteData?.cryptoCurrencyCode)
                    )}{' '}
                    {sliceTicker(fetchQuoteData?.cryptoCurrencyCode)}
                  </Text>
                </View>
                {/* Buy Crypto Button */}
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
                      marginTop: 25,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Buy'}
                >
                  {'Sign Up'}
                </Button>
              </View>
            </>
          );
        }}
      </NobaServerApi.FetchTransactionsGetQuoteGET>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(CryptoAboutScreen);
