import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import cryptoLookup from '../global-functions/cryptoLookup';
import parseNetwork from '../global-functions/parseNetwork';
import sliceTicker from '../global-functions/sliceTicker';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Icon,
  IconButton,
  LinearGradient,
  SVG,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const AccountOrderHistoryDetailedScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const handleOrderType = orderObject => {
    try {
      const walletAddress = orderObject.destinationWalletAddress;

      if (walletAddress === 'nobaWallet') {
        setIsSelfCustody(false);
        return;
      }
      setIsSelfCustody(true);
    } catch (error) {}
  };

  const handlePaymentMethodType = (
    Variables,
    setGlobalVariableValue,
    paymentMethodsList,
    orderPaymentToken
  ) => {
    const pm = paymentMethodsList.find(
      paymentMethod => paymentMethod.paymentToken === orderPaymentToken
    );

    if (!pm) {
      setPaymentMethodNumber('Deleted');
    } else {
      if (pm.type === 'Card') {
        setPaymentMethodNumber(pm.cardData.last4Digits);
      } else {
        setPaymentMethodNumber(pm.achData.accountMask);
      }
    }
  };

  const handleCryptoAmount = orderObject => {
    try {
      const expected = orderObject.amounts.cryptoQuantityExpected;
      const settled = orderObject.amounts.cryptoAmountSettled;

      if (orderObject.amounts.cryptoAmountSettled) {
        setCryptoAmount(settled);
        return;
      }

      setCryptoAmount(expected);
    } catch (error) {}
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }

        const value0jqyZtCE = props.route?.params?.order ?? '';
        setOrder(value0jqyZtCE);
        const order = value0jqyZtCE;
        handleCryptoAmount(order);
        const cryptoObject = cryptoLookup(
          Variables,
          setGlobalVariableValue,
          order?.amounts.cryptocurrency,
          'object'
        );
        setCryptoObject(cryptoObject);
        const consumerData = await NobaServerApi.consumerGetDataGET(Constants);
        handleOrderType(order);
        handlePaymentMethodType(
          Variables,
          setGlobalVariableValue,
          consumerData?.paymentMethods,
          order?.paymentMethodID
        );
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [cryptoAmount, setCryptoAmount] = React.useState('');
  const [cryptoObject, setCryptoObject] = React.useState({
    name: 'string',
    type: 'string',
    ticker: 'string',
    iconPath: 'string',
    provider: 'string',
    precision: 0,
  });
  const [isSelfCustody, setIsSelfCustody] = React.useState(false);
  const [order, setOrder] = React.useState({
    _id: ' string',
    status: 'string',
    userID: 'string',
    amounts: {
      nobaFee: 0.1,
      baseAmount: 50,
      fiatAmount: 50,
      networkFee: 0.1,
      fiatCurrency: 'string',
      processingFee: 0.1,
      conversionRate: 0.1,
      cryptocurrency: 'string',
      totalFiatPrice: 50,
      cryptoAmountSettled: 0.1,
      cryptoQuantityExpected: 0.1,
    },
    partnerID: 'string',
    transactionID: ' string',
    paymentMethodID: 'string',
    transactionTimestamp: 'string',
    destinationWalletAddress: 'string',
  });
  const [paymentMethodNumber, setPaymentMethodNumber] = React.useState('');

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
              style={StyleSheet.applyWidth(
                { left: 0, position: 'absolute' },
                dimensions.width
              )}
              size={32}
              icon={'Ionicons/chevron-back-sharp'}
              color={theme.colors['Primary']}
            />
            {/* Order Header */}
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
              {cryptoObject?.ticker}
              {' order'}
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
              {'Order summary'}
            </Text>
            {/* Center View */}
            <View
              style={StyleSheet.applyWidth({ zIndex: 1 }, dimensions.width)}
            >
              {/* Order ID View */}
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
                  {'Order ID'}
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
                  {order?.transactionID}
                </Text>
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
                      color: theme.colors['Primary-Light-1'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Pay'}
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
                    {order && order['amounts']['fiatAmount']}{' '}
                    {order && order['amounts']['fiatCurrency']}
                  </Text>
                </View>
              </View>
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
                      color: theme.colors['Primary-Light-1'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Get'}
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
                    source={cryptoObject?.iconPath}
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
                    {cryptoAmount}{' '}
                    {sliceTicker(order && order['amounts']['cryptocurrency'])}
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
                  {sliceTicker(order && order['amounts']['cryptocurrency'])}
                  {' = '}
                  {order && order['amounts']['conversionRate']}{' '}
                  {order && order['amounts']['fiatCurrency']}
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
                  {null}
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
                  {order && order['amounts']['processingFee']}
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
                  {order && order['amounts']['nobaFee']}
                </Text>
              </View>
              {/* Fee Row 3 */}
              <>
                {!isSelfCustody ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Touchable Network Fee */}
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
                      {'$'}
                      {order && order['amounts']['networkFee']}
                    </Text>
                  </View>
                )}
              </>
              {/* Network Fee Disclosure */}
              <>
                {!isSelfCustody ? null : (
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
                )}
              </>
              {/* Status View */}
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
                  {'Order status'}
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
                  {order?.status}
                </Text>
              </View>
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
                  {order?.transactionTimestamp}
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
              {/* Wallet View */}
              <>
                {!isSelfCustody ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-4'],
                        justifyContent: 'center',
                        paddingBottom: 15,
                        paddingTop: 15,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Wallet View Row */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 5,
                          width: '100%',
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
                        {'Wallet'}
                      </Text>
                    </View>
                    {/* Wallet Address */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-end',
                          color: theme.colors['Strong'],
                          fontFamily: 'System',
                          fontWeight: '600',
                          textAlign: 'right',
                        },
                        dimensions.width
                      )}
                      numberOfLines={1}
                      adjustsFontSizeToFit={true}
                    >
                      {order?.destinationWalletAddress}
                    </Text>
                  </View>
                )}
              </>
              {/* Network View */}
              <>
                {!isSelfCustody ? null : (
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
                      {'Network'}
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
                      {parseNetwork(
                        Variables,
                        order && order['amounts']['cryptocurrency'],
                        undefined
                      )}
                    </Text>
                  </View>
                )}
              </>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* Bottom Linear Gradient Nav */}
      <LinearGradient
        style={StyleSheet.applyWidth(
          {
            bottom: 0,
            height: 100,
            justifyContent: 'center',
            left: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 0,
          },
          dimensions.width
        )}
        color1={theme.colors['White']}
        startX={50}
        endX={50}
        endY={20}
        startY={100}
        color2={theme.colors['White']}
        color3={theme.colors['Secondary 4']}
      >
        {/* Button Row */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 25,
              marginRight: 25,
              paddingLeft: 15,
              paddingRight: 15,
            },
            dimensions.width
          )}
        >
          {/* Touchable Cash Button */}
          <Touchable
            style={StyleSheet.applyWidth(
              { height: 32, width: 32 },
              dimensions.width
            )}
          >
            {/* Cash Icon */}
            <Icon
              style={StyleSheet.applyWidth(
                { left: 4, position: 'absolute', top: 4 },
                dimensions.width
              )}
              size={24}
              name={'MaterialIcons/attach-money'}
              color={theme.colors['Primary']}
            />
          </Touchable>
          {/* Touchable Invest Button */}
          <Touchable
            style={StyleSheet.applyWidth(
              { height: 32, width: 32 },
              dimensions.width
            )}
          >
            {/* Invest Icon */}
            <Icon
              style={StyleSheet.applyWidth(
                { left: 4, position: 'absolute', top: 4 },
                dimensions.width
              )}
              size={24}
              color={theme.colors['Primary']}
              name={'MaterialCommunityIcons/finance'}
            />
          </Touchable>
          {/* Touchable Noba N Button */}
          <Touchable
            style={StyleSheet.applyWidth(
              { borderRadius: 100, height: 50, width: 50 },
              dimensions.width
            )}
          >
            {/* Noba N BG */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: theme.colors['Primary'],
                  borderRadius: 100,
                  height: 50,
                  justifyContent: 'center',
                  width: 50,
                },
                dimensions.width
              )}
            >
              {/* Noba N */}
              <Image
                style={StyleSheet.applyWidth(
                  { height: 17.14, width: 24 },
                  dimensions.width
                )}
                resizeMode={'cover'}
                source={Images.NWhite}
              />
            </View>
          </Touchable>
          {/* Touchable Card Button */}
          <Touchable
            style={StyleSheet.applyWidth(
              { height: 32, width: 32 },
              dimensions.width
            )}
          >
            {/* Card Icon */}
            <Icon
              style={StyleSheet.applyWidth(
                { left: 4, position: 'absolute', top: 4 },
                dimensions.width
              )}
              size={24}
              color={theme.colors['Primary']}
              name={'MaterialIcons/credit-card'}
            />
          </Touchable>
          {/* Touchable Account Button */}
          <Touchable
            style={StyleSheet.applyWidth(
              { height: 32, width: 32 },
              dimensions.width
            )}
          >
            {/* Account Icon */}
            <Icon
              style={StyleSheet.applyWidth(
                { left: 4, position: 'absolute', top: 4 },
                dimensions.width
              )}
              size={24}
              color={theme.colors['Primary']}
              name={'MaterialCommunityIcons/account-circle'}
            />
          </Touchable>
        </View>
      </LinearGradient>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AccountOrderHistoryDetailedScreen);
