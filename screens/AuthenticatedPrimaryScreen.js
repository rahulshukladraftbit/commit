import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import cryptoLookup from '../global-functions/cryptoLookup';
import getBalances from '../global-functions/getBalances';
import handleBalances from '../global-functions/handleBalances';
import handleSessionKey from '../global-functions/handleSessionKey';
import isEmptyArray from '../global-functions/isEmptyArray';
import isEmptyObject from '../global-functions/isEmptyObject';
import parseNetwork from '../global-functions/parseNetwork';
import resetVariables from '../global-functions/resetVariables';
import roundToFiveOrLess from '../global-functions/roundToFiveOrLess';
import showToast from '../global-functions/showToast';
import sliceTicker from '../global-functions/sliceTicker';
import sortBalancesByName from '../global-functions/sortBalancesByName';
import sortCryptoByName from '../global-functions/sortCryptoByName';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  LinearGradient,
  Link,
  SVG,
  ScreenContainer,
  Switch,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const AuthenticatedPrimaryScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const checkAccessTokenScreen = (
    Variables,
    setGlobalVariableValue,
    userId
  ) => {
    if (userId === undefined) {
      setGlobalVariableValue({ key: 'AUTHORIZATION_HEADER', value: '' });
      //console.log(Variables.AUTHORIZATION_HEADER)
      //props.navigation.navigate("UnauthenticatedPrimaryScreen")
      return;
    } else return;
  };

  const checkOriginPage = (Variables, setGlobalVariableValue, originPage) => {
    accountPages = [
      'profile',
      'status',
      'limits',
      'wallets',
      'status',
      'profileButton',
      'history',
      'promos',
      'payments',
    ];

    if (accountPages.includes(originPage)) {
      setAccountModalVisible(true);
    }

    if (
      originPage === 'cashView' ||
      originPage === 'profileButton' ||
      originPage === 'nobaButton'
    ) {
      setSelectedView('cashView');
    } else if (originPage === 'investView') {
      setSelectedView('investView');
    } else if (originPage === 'cardView') {
      setSelectedView('cardView');
    }
  };

  const transferNavigation = Variables => {
    try {
      if (Variables.USER_CONTACTS_REQUESTED) {
        props.navigation.navigate('Peer2PeerContactsScreen');
      } else {
        props.navigation.navigate('ContactsPermissionsScreen');
      }
    } catch (error) {}
  };

  const handleNotificationsPermission = () => {
    if (Variables.NOTIFICATIONS_PERMISSION) {
      setGlobalVariableValue({ key: NOTIFICATIONS_PERMISSION, value: false });
    } else {
      setGlobalVariableValue({ key: NOTIFICATIONS_PERMISSION, value: true });
    }
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }

        const valuexLidbMwT = props.route?.params?.originPage ?? '';
        setOriginPage(valuexLidbMwT);
        const originPage = valuexLidbMwT;
        checkOriginPage(Variables, setGlobalVariableValue, originPage);
        await handleSessionKey(Variables, setGlobalVariableValue);
        await getBalances(Variables, setGlobalVariableValue);
        handleBalances(Variables, setGlobalVariableValue);
        const cryptoCurrencies =
          await NobaServerApi.assetsSupportedCryptocurrenciesGET(Constants);
        setGlobalVariableValue({
          key: 'CRYPTOCURRENCY_LIST',
          value: cryptoCurrencies,
        });
        resetVariables(Variables, setGlobalVariableValue);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [accountModalVisible, setAccountModalVisible] = React.useState(false);
  const [cardsEligible, setCardsEligible] = React.useState(false);
  const [faceIdSwitch, setFaceIdSwitch] = React.useState(false);
  const [hasPysicalCard, setHasPysicalCard] = React.useState(false);
  const [hasVirtualCard, setHasVirtualCard] = React.useState(false);
  const [menuModalVisible, setMenuModalVisible] = React.useState(false);
  const [originPage, setOriginPage] = React.useState('');
  const [pushNotificationsSwitch, setPushNotificationsSwitch] =
    React.useState(false);
  const [selectedView, setSelectedView] = React.useState('cashView');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Secondary 4'] },
        dimensions.width
      )}
      hasSafeArea={false}
      hasTopSafeArea={false}
      hasBottomSafeArea={true}
      scrollable={false}
    >
      {/* Fetch Consumer Data */}
      <NobaServerApi.FetchConsumerGetDataGET>
        {({ loading, error, data, refetchConsumerGetData }) => {
          const fetchConsumerDataData = data;
          if (!fetchConsumerDataData || loading) {
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
              {/* Top Nav Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['White'],
                    borderRadius: 30,
                    justifyContent: 'center',
                    marginBottom: 15,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 50,
                    paddingBottom: 25,
                    paddingTop: 25,
                  },
                  dimensions.width
                )}
              >
                {/* Top Nav Row */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 25,
                      marginRight: 25,
                    },
                    dimensions.width
                  )}
                >
                  {/* Menu Button */}
                  <IconButton
                    onPress={() => {
                      try {
                        setMenuModalVisible(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    icon={'MaterialIcons/menu'}
                    size={24}
                    color={theme.colors['Primary']}
                  />
                  {/* Top Right Nav Row */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: 100,
                      },
                      dimensions.width
                    )}
                  >
                    {/* QR Button */}
                    <IconButton
                      size={24}
                      color={theme.colors['Primary']}
                      icon={'Ionicons/qr-code'}
                    />
                  </View>
                </View>
              </View>
              {/* Sroll Center Frame */}
              <ScrollView
                contentContainerStyle={StyleSheet.applyWidth(
                  { paddingBottom: 125 },
                  dimensions.width
                )}
                bounces={true}
              >
                {/* Cash View */}
                <>
                  {!(selectedView === 'cashView') ? null : (
                    <View>
                      {/* S1: Cash Balance */}
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
                        {/* USD Cash Balance Amount */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 30,
                              fontWeight: '700',
                            },
                            dimensions.width
                          )}
                        >
                          {'$'}
                          {Constants['CASH_BALANCE']}
                        </Text>
                        {/* Cash Balance Header */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                              marginBottom: 5,
                            },
                            dimensions.width
                          )}
                        >
                          {'Dollar balance'}
                        </Text>
                        {/* Action Items */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingLeft: 15,
                              paddingRight: 15,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Deposit View */}
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: 'center', minWidth: 60 },
                              dimensions.width
                            )}
                          >
                            <IconButton
                              onPress={() => {
                                try {
                                  setGlobalVariableValue({
                                    key: 'cryptoCurrencyCode',
                                    value: 'USDC.ETH',
                                  });
                                  setGlobalVariableValue({
                                    key: 'cryptoCurrencyIcon',
                                    value:
                                      'https://dj61eezhizi5l.cloudfront.net/assets/images/currency-logos/crypto/usdc.eth.svg',
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              size={42}
                              color={theme.colors['Primary']}
                              icon={'MaterialIcons/arrow-circle-up'}
                            />
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '700',
                                  marginTop: 5,
                                },
                                dimensions.width
                              )}
                            >
                              {'Deposit'}
                            </Text>
                          </View>
                          {/* Transfer View */}
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: 'center', minWidth: 60 },
                              dimensions.width
                            )}
                          >
                            <IconButton
                              onPress={() => {
                                try {
                                  transferNavigation(Variables);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              size={42}
                              icon={'MaterialCommunityIcons/bank-transfer'}
                              color={theme.colors['Primary']}
                            />
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '700',
                                  marginTop: 5,
                                },
                                dimensions.width
                              )}
                            >
                              {'Transfer'}
                            </Text>
                          </View>
                          {/* Invest View */}
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: 'center', minWidth: 60 },
                              dimensions.width
                            )}
                          >
                            <IconButton
                              onPress={() => {
                                try {
                                  setSelectedView('investView');
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              size={42}
                              color={theme.colors['Primary']}
                              icon={'MaterialCommunityIcons/finance'}
                            />
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '700',
                                  marginTop: 5,
                                },
                                dimensions.width
                              )}
                            >
                              {'Invest'}
                            </Text>
                          </View>
                          {/* Withdraw View */}
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: 'center', minWidth: 60 },
                              dimensions.width
                            )}
                          >
                            <IconButton
                              onPress={() => {
                                try {
                                  showToast(
                                    Variables,
                                    setGlobalVariableValue,
                                    'Coming soon, including on-chain, off-ramping, and direct-to-bank withdrawals.',
                                    'neutral'
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              size={42}
                              color={theme.colors['Primary']}
                              icon={'MaterialIcons/arrow-circle-down'}
                            />
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '700',
                                  marginTop: 5,
                                },
                                dimensions.width
                              )}
                            >
                              {'Withdraw'}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* S2: No Balance Alert */}
                      <>
                        {!(Constants['CASH_BALANCE'] === '0.00') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors['Secondary'],
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
                            <Icon
                              style={StyleSheet.applyWidth(
                                { marginBottom: 10 },
                                dimensions.width
                              )}
                              size={24}
                              name={'Foundation/dollar-bill'}
                              color={theme.colors['Primary']}
                            />
                            {/* Add Balance Header */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 16,
                                  fontWeight: '700',
                                  marginBottom: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {'Deposit funds to get started'}
                            </Text>
                            {/* Add Balance Text */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 14,
                                  fontWeight: '600',
                                  marginBottom: 20,
                                },
                                dimensions.width
                              )}
                            >
                              {
                                'Harness the power of the US dollar and start building wealth today. Withdraw and spend at any time.'
                              }
                            </Text>
                            {/* Deposit */}
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
                                },
                                dimensions.width
                              )}
                              title={'Deposit'}
                            >
                              {'Sign Up'}
                            </Button>
                          </View>
                        )}
                      </>
                      {/* S3: Connected Accounts */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: theme.colors['White'],
                            borderRadius: 30,
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
                        {/* Payment Methods Header */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 24,
                              fontWeight: '700',
                              marginBottom: 15,
                            },
                            dimensions.width
                          )}
                          adjustsFontSizeToFit={true}
                          numberOfLines={1}
                        >
                          {'Payment methods'}
                        </Text>
                        {/* Payment Methods List */}
                        <FlatList
                          data={fetchConsumerDataData?.paymentMethods}
                          listKey={'ruL0WCeC'}
                          keyExtractor={paymentMethodsListData =>
                            paymentMethodsListData?.id ||
                            paymentMethodsListData?.uuid ||
                            JSON.stringify(paymentMethodsListData)
                          }
                          renderItem={({ item }) => {
                            const paymentMethodsListData = item;
                            return (
                              <>
                                {/* Payment Method Row */}
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
                                  {/* Payment Method Left Group */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        marginRight: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Payment Method Icons */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { marginRight: 10 },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Card Icon */}
                                      <>
                                        {!(
                                          paymentMethodsListData?.cardType ===
                                          'CREDIT'
                                        ) ? null : (
                                          <Icon
                                            size={24}
                                            name={'MaterialIcons/credit-card'}
                                            color={theme.colors['Primary']}
                                          />
                                        )}
                                      </>
                                    </View>
                                    {/* Payment Method Info Column */}
                                    <View>
                                      {/* Payment Method Nickname */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Primary'],
                                            fontFamily: 'System',
                                            fontSize: 16,
                                            fontWeight: '700',
                                            marginBottom: 5,
                                          },
                                          dimensions.width
                                        )}
                                        adjustsFontSizeToFit={true}
                                        numberOfLines={1}
                                      >
                                        {paymentMethodsListData?.name}
                                      </Text>
                                      {/* Account Number Last 4 */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors['Primary-Light-1'],
                                            fontFamily: 'System',
                                            fontSize: 16,
                                            fontWeight: '400',
                                          },
                                          dimensions.width
                                        )}
                                        adjustsFontSizeToFit={true}
                                        numberOfLines={1}
                                      >
                                        {'••• '}
                                        {
                                          paymentMethodsListData?.cardData
                                            ?.last4Digits
                                        }
                                      </Text>
                                    </View>
                                  </View>
                                  {/* Payment Method Limit */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors['Primary-Light-1'],
                                        fontFamily: 'System',
                                        fontSize: 18,
                                        fontWeight: '700',
                                        marginBottom: 5,
                                        marginRight: 15,
                                      },
                                      dimensions.width
                                    )}
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={1}
                                  >
                                    {'$5,000 limit'}
                                  </Text>
                                </View>
                              </>
                            );
                          }}
                          contentContainerStyle={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                          numColumns={1}
                        />
                        {/* No Payment Methods Alert View */}
                        <>
                          {!isEmptyObject(
                            fetchConsumerDataData?.paymentMethods
                          ) ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    theme.colors['Yellow Alert BG'],
                                  borderRadius: 10,
                                  marginBottom: 20,
                                  paddingBottom: 10,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  paddingTop: 10,
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
                                    paddingBottom: 5,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'No payment methods found'}
                              </Text>
                              {/* Alert Text */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Primary'],
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    lineHeight: 18,
                                    paddingBottom: 5,
                                  },
                                  dimensions.width
                                )}
                              >
                                {
                                  'You have no payment methods linked to your account. Please add a payment method to start depositing US dollars.'
                                }
                              </Text>
                            </View>
                          )}
                        </>
                        {/* Add payment method */}
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
                          title={'Add payment method'}
                        >
                          {'Sign Up'}
                        </Button>
                      </View>
                    </View>
                  )}
                </>
                {/* Invest View */}
                <>
                  {!(selectedView === 'investView') ? null : (
                    <View>
                      {/* S1: Investment Balance */}
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
                        {/* Investment Balance */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 30,
                              fontWeight: '700',
                            },
                            dimensions.width
                          )}
                        >
                          {'$'}
                          {Constants['INVESTMENT_BALANCE']}
                        </Text>
                        {/* Investment Balance Header */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                              marginBottom: 5,
                            },
                            dimensions.width
                          )}
                          numberOfLines={1}
                          adjustsFontSizeToFit={true}
                        >
                          {'Investments'}
                        </Text>
                        {/* Balance Change */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Green'],
                              fontFamily: 'System',
                              fontSize: 18,
                              fontWeight: '600',
                            },
                            dimensions.width
                          )}
                        >
                          {'▴$250,00 (+10,04%)'}
                          {/* Balance Change */}
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
                          >
                            {' Today'}
                          </Text>
                        </Text>
                        <Divider
                          style={StyleSheet.applyWidth(
                            {
                              height: 1,
                              marginBottom: 15,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 5,
                            },
                            dimensions.width
                          )}
                          color={theme.colors['Primary-Light-1']}
                        />
                        {/* Touchable Buying Power */}
                        <Touchable>
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingLeft: 15,
                                paddingRight: 15,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Buying Power */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 18,
                                  fontWeight: '700',
                                },
                                dimensions.width
                              )}
                            >
                              {' Buying power'}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                  paddingLeft: 15,
                                  paddingRight: 15,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Buying Power Amount */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Primary'],
                                    fontFamily: 'System',
                                    fontSize: 18,
                                    fontWeight: '700',
                                  },
                                  dimensions.width
                                )}
                              >
                                {' $'}
                                {Constants['BUYING_POWER']}
                              </Text>
                              <Icon
                                style={StyleSheet.applyWidth(
                                  { marginLeft: 15 },
                                  dimensions.width
                                )}
                                size={24}
                                name={'MaterialCommunityIcons/chevron-right'}
                                color={theme.colors['Primary-Light-1']}
                              />
                            </View>
                          </View>
                        </Touchable>
                      </View>
                      {/* S2: Portfolio */}
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
                        {/* Portfolio Header */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 24,
                              fontWeight: '700',
                              marginBottom: 15,
                            },
                            dimensions.width
                          )}
                        >
                          {'Portfolio'}
                        </Text>
                        {/* Portfolio List */}
                        <FlatList
                          data={sortBalancesByName(Constants['USER_BALANCES'])}
                          listKey={'K2hSirgJ'}
                          keyExtractor={portfolioListData =>
                            portfolioListData?.id ||
                            portfolioListData?.uuid ||
                            JSON.stringify(portfolioListData)
                          }
                          renderItem={({ item }) => {
                            const portfolioListData = item;
                            return (
                              <>
                                {/* Touchable Holding */}
                                <Touchable
                                  onPress={() => {
                                    try {
                                      setGlobalVariableValue({
                                        key: 'selectedCrypto',
                                        value: cryptoLookup(
                                          Variables,
                                          setGlobalVariableValue,
                                          portfolioListData?.asset,
                                          undefined
                                        ),
                                      });
                                      setGlobalVariableValue({
                                        key: 'cryptoCurrencyCode',
                                        value: portfolioListData?.asset,
                                      });
                                      setGlobalVariableValue({
                                        key: 'cryptoCurrencyName',
                                        value: cryptoLookup(
                                          Variables,
                                          setGlobalVariableValue,
                                          portfolioListData?.asset,
                                          'name'
                                        ),
                                      });
                                      setGlobalVariableValue({
                                        key: 'cryptoCurrencyIcon',
                                        value: cryptoLookup(
                                          Variables,
                                          setGlobalVariableValue,
                                          portfolioListData?.asset,
                                          'iconPath'
                                        ),
                                      });
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  {/* Portfolio Holding */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'flex-start',
                                        borderBottomWidth: 1,
                                        borderColor:
                                          theme.colors['Primary-Light-4'],
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: 10,
                                        paddingBottom: 7,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Left Column */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { justifyContent: 'center' },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Asset Row */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            flexDirection: 'row',
                                            marginBottom: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Asset Icon */}
                                        <SVG
                                          style={StyleSheet.applyWidth(
                                            {
                                              height: 24,
                                              marginRight: 10,
                                              width: 24,
                                            },
                                            dimensions.width
                                          )}
                                          source={cryptoLookup(
                                            Variables,
                                            setGlobalVariableValue,
                                            portfolioListData?.asset,
                                            'iconPath'
                                          )}
                                        />
                                        {/* Asset Name */}
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors['Primary'],
                                              fontFamily: 'System',
                                              fontSize: 18,
                                              fontWeight: '600',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {cryptoLookup(
                                            Variables,
                                            setGlobalVariableValue,
                                            portfolioListData?.asset,
                                            'name'
                                          )}
                                        </Text>
                                      </View>
                                      {/* Asset Ticker */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors['Primary-Light-1'],
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {sliceTicker(portfolioListData?.asset)}
                                      </Text>
                                    </View>
                                    {/* Right Column */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-end',
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Holding Value */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Primary'],
                                            fontFamily: 'System',
                                            fontSize: 18,
                                            fontWeight: '600',
                                            marginBottom: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'$122.46'}
                                      </Text>
                                      {/* Holding Amount */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors['Primary-Light-1'],
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {roundToFiveOrLess(
                                          portfolioListData?.balance
                                        )}{' '}
                                        {sliceTicker(portfolioListData?.asset)}
                                      </Text>
                                    </View>
                                  </View>
                                </Touchable>
                              </>
                            );
                          }}
                          contentContainerStyle={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                          numColumns={1}
                        />
                        {/* No Holdings Alert */}
                        <>
                          {!isEmptyArray(Constants['USER_BALANCES']) ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['Secondary'],
                                  borderRadius: 10,
                                  marginBottom: 20,
                                  paddingBottom: 10,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  paddingTop: 10,
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
                                color={theme.colors['Primary']}
                                name={'MaterialCommunityIcons/finance'}
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
                                    paddingBottom: 5,
                                  },
                                  dimensions.width
                                )}
                              >
                                {
                                  'It looks like you have no holdings at this time.'
                                }
                              </Text>
                              {/* Alert Text */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Primary'],
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    lineHeight: 18,
                                    paddingBottom: 5,
                                  },
                                  dimensions.width
                                )}
                              >
                                {
                                  'To learn more about the assets available to you on Noba, check out the watchlist below. More to come soon!'
                                }
                              </Text>
                            </View>
                          )}
                        </>
                      </View>
                      {/* S3: Watchlists */}
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
                            paddingTop: 25,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Watchlists Header */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 24,
                              fontWeight: '700',
                              marginBottom: 25,
                            },
                            dimensions.width
                          )}
                        >
                          {'Watchlists'}
                        </Text>
                        {/* Crypto View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { paddingLeft: 5, paddingRight: 5 },
                            dimensions.width
                          )}
                        >
                          {/* Fetch Supported Crypto */}
                          <NobaServerApi.FetchAssetsSupportedCryptocurrenciesGET>
                            {({
                              loading,
                              error,
                              data,
                              refetchAssetsSupportedCryptocurrencies,
                            }) => {
                              const fetchSupportedCryptoData = data;
                              if (!fetchSupportedCryptoData || loading) {
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
                                  {/* Supported Crypto List */}
                                  <FlatList
                                    data={sortCryptoByName(
                                      fetchSupportedCryptoData
                                    )}
                                    listKey={'TgnfN6ew'}
                                    keyExtractor={supportedCryptoListData =>
                                      supportedCryptoListData?.id ||
                                      supportedCryptoListData?.uuid ||
                                      JSON.stringify(supportedCryptoListData)
                                    }
                                    renderItem={({ item }) => {
                                      const supportedCryptoListData = item;
                                      return (
                                        <>
                                          {/* Crypto Touchable */}
                                          <Touchable
                                            onPress={() => {
                                              try {
                                                setGlobalVariableValue({
                                                  key: 'selectedCrypto',
                                                  value:
                                                    supportedCryptoListData,
                                                });
                                                setGlobalVariableValue({
                                                  key: 'cryptoCurrencyCode',
                                                  value:
                                                    supportedCryptoListData?.ticker,
                                                });
                                                setGlobalVariableValue({
                                                  key: 'cryptoCurrencyIcon',
                                                  value:
                                                    supportedCryptoListData?.iconPath,
                                                });
                                                setGlobalVariableValue({
                                                  key: 'cryptoCurrencyName',
                                                  value:
                                                    supportedCryptoListData?.name,
                                                });
                                              } catch (err) {
                                                console.error(err);
                                              }
                                            }}
                                          >
                                            {/* Crypto Container */}
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
                                              {/* Crypto Icon */}
                                              <SVG
                                                style={StyleSheet.applyWidth(
                                                  { height: 24, width: 24 },
                                                  dimensions.width
                                                )}
                                                source={
                                                  supportedCryptoListData?.iconPath
                                                }
                                              />
                                              {/* Crypto Identities */}
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  { marginLeft: 12 },
                                                  dimensions.width
                                                )}
                                              >
                                                {/* Ticker */}
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors['Primary'],
                                                      fontFamily: 'System',
                                                      fontSize: 14,
                                                      fontWeight: '700',
                                                      marginBottom: 5,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {sliceTicker(
                                                    supportedCryptoListData?.ticker
                                                  )}
                                                </Text>
                                                {/* Name */}
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors['Primary'],
                                                      fontFamily: 'System',
                                                      fontSize: 14,
                                                      fontWeight: '400',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {
                                                    supportedCryptoListData?.name
                                                  }
                                                </Text>
                                              </View>
                                              {/* Network Bubble */}
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    backgroundColor:
                                                      theme.colors[
                                                        'Primary-Light-4'
                                                      ],
                                                    borderRadius: 100,
                                                    paddingBottom: 2,
                                                    paddingLeft: 7,
                                                    paddingRight: 7,
                                                    paddingTop: 2,
                                                    position: 'absolute',
                                                    right: 5,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {/* Network */}
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors['Primary'],
                                                      fontFamily: 'System',
                                                      fontSize: 14,
                                                      fontWeight: '600',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {parseNetwork(
                                                    Variables,
                                                    supportedCryptoListData?.ticker,
                                                    supportedCryptoListData?.name
                                                  )}
                                                </Text>
                                              </View>
                                            </View>
                                          </Touchable>
                                        </>
                                      );
                                    }}
                                    contentContainerStyle={StyleSheet.applyWidth(
                                      { flex: 1 },
                                      dimensions.width
                                    )}
                                    numColumns={1}
                                  />
                                </>
                              );
                            }}
                          </NobaServerApi.FetchAssetsSupportedCryptocurrenciesGET>
                        </View>
                      </View>
                    </View>
                  )}
                </>
                {/* Card View */}
                <>
                  {!(selectedView === 'cardView') ? null : (
                    <View>
                      {/* Ineligible View */}
                      <>
                        {cardsEligible ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: theme.colors['White'],
                                borderRadius: 30,
                                marginBottom: 15,
                                marginLeft: 10,
                                marginRight: 10,
                                paddingBottom: 60,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 40,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Earth Icon */}
                            <Icon
                              style={StyleSheet.applyWidth(
                                { marginBottom: 30, marginTop: 30 },
                                dimensions.width
                              )}
                              color={theme.colors['Primary']}
                              name={'Entypo/globe'}
                              size={120}
                            />
                            {/* Ineligible Header */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 16,
                                  fontWeight: '700',
                                  marginBottom: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {'We are working to serve you soon!'}
                            </Text>
                            {/* Ineligible Text */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 14,
                                  fontWeight: '400',
                                },
                                dimensions.width
                              )}
                            >
                              {
                                'Noba cards are currently not available in your region. We are working hard to expand our availability and will notify you as soon as your region is eligible.'
                              }
                            </Text>
                          </View>
                        )}
                      </>
                      {/* Eligible View */}
                      <>
                        {!cardsEligible ? null : (
                          <View>
                            {/* Get Physical Card Touchable */}
                            <>
                              {hasPysicalCard ? null : (
                                <Touchable>
                                  {/* Get Physical Card Bubble */}
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
                                    {/* Get Card View */}
                                    <View>
                                      {/* Get Card Header */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Primary'],
                                            fontFamily: 'System',
                                            fontSize: 18,
                                            fontWeight: '700',
                                            marginBottom: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Get a physical card'}
                                      </Text>
                                      {/* Card Balance Row */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                            marginBottom: 15,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Card Image */}
                                        <Image
                                          style={StyleSheet.applyWidth(
                                            {
                                              borderRadius: 5,
                                              height: 72,
                                              marginRight: 15,
                                              width: 114,
                                            },
                                            dimensions.width
                                          )}
                                          resizeMode={'cover'}
                                          source={Images.DarkCardNoName}
                                        />
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.strong,
                                              flex: 1,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {
                                            'Get your physical card today and start earning rewards on all your purchases.'
                                          }
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </Touchable>
                              )}
                            </>
                            {/* Get Digital Card Touchable */}
                            <>
                              {hasVirtualCard ? null : (
                                <Touchable>
                                  {/* Get Digital Card Bubble */}
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
                                    {/* Get Card View */}
                                    <View>
                                      {/* Get Card Header */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Primary'],
                                            fontFamily: 'System',
                                            fontSize: 18,
                                            fontWeight: '700',
                                            marginBottom: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Get a digital card'}
                                      </Text>
                                      {/* Card Balance Row */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                            marginBottom: 15,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Card Image */}
                                        <Image
                                          style={StyleSheet.applyWidth(
                                            {
                                              borderRadius: 5,
                                              height: 72,
                                              marginRight: 15,
                                              width: 114,
                                            },
                                            dimensions.width
                                          )}
                                          resizeMode={'cover'}
                                          source={Images.LightCardNoName}
                                        />
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.strong,
                                              flex: 1,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {
                                            'Get your free virtual card today and start earning rewards on online and in-app purchases.'
                                          }
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </Touchable>
                              )}
                            </>
                          </View>
                        )}
                      </>
                    </View>
                  )}
                </>
              </ScrollView>
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
                    onPress={() => {
                      try {
                        setSelectedView('cashView');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { height: 32, width: 32 },
                      dimensions.width
                    )}
                  >
                    {/* Cash Button BG */}
                    <>
                      {!(selectedView === 'cashView') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: theme.colors['Secondary'],
                              borderRadius: 100,
                              height: 32,
                              justifyContent: 'center',
                              width: 32,
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
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
                    onPress={() => {
                      try {
                        setSelectedView('investView');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { height: 32, width: 32 },
                      dimensions.width
                    )}
                  >
                    {/* Invest Button BG */}
                    <>
                      {!(selectedView === 'investView') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: theme.colors['Secondary'],
                              borderRadius: 100,
                              height: 32,
                              justifyContent: 'center',
                              width: 32,
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
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
                    onPress={() => {
                      try {
                        transferNavigation(Variables);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
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
                    onPress={() => {
                      try {
                        setSelectedView('cardView');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { height: 32, width: 32 },
                      dimensions.width
                    )}
                  >
                    {/* Card Button BG */}
                    <>
                      {!(selectedView === 'cardView') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: theme.colors['Secondary'],
                              borderRadius: 100,
                              height: 32,
                              justifyContent: 'center',
                              width: 32,
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
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
                    onPress={() => {
                      try {
                        setAccountModalVisible(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { height: 32, width: 32 },
                      dimensions.width
                    )}
                  >
                    {/* Account Button BG */}
                    <>
                      {!(selectedView === 'accountView') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: theme.colors['Secondary'],
                              borderRadius: 100,
                              height: 32,
                              justifyContent: 'center',
                              width: 32,
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
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
              {/* Account Modal Popup */}
              <>
                {!accountModalVisible ? null : (
                  <Modal
                    visible={accountModalVisible}
                    animationType={'slide'}
                    transparent={true}
                  >
                    {/* S1: Consumer Data */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['White'],
                          borderColor: theme.colors['Secondary 4'],
                          borderTopLeftRadius: 30,
                          borderTopRightRadius: 30,
                          borderTopWidth: 5,
                          bottom: 0,
                          height: '90%',
                          left: 0,
                          paddingBottom: 65,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 45,
                          position: 'absolute',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Close Account Modal Icon */}
                      <IconButton
                        onPress={() => {
                          try {
                            setAccountModalVisible(false);
                            setOriginPage('');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          { position: 'absolute', right: 20, top: 20 },
                          dimensions.width
                        )}
                        size={32}
                        icon={'Ionicons/close-sharp'}
                        color={theme.colors['Primary-Light-1']}
                      />
                      {/* Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 30,
                            fontWeight: '700',
                            marginBottom: 5,
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                      >
                        {fetchConsumerDataData?.firstName}{' '}
                        {fetchConsumerDataData?.lastName}
                      </Text>
                      {/* Email */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 18,
                            fontWeight: '400',
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                      >
                        {fetchConsumerDataData?.email}
                      </Text>
                      {/* Scroll Profile View */}
                      <ScrollView
                        showsVerticalScrollIndicator={true}
                        bounces={true}
                      >
                        {/* Account Submenu Buttons */}
                        <View
                          style={StyleSheet.applyWidth(
                            { marginTop: 20 },
                            dimensions.width
                          )}
                        >
                          {/* Touchable Profile */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'MaterialCommunityIcons/account'}
                                />
                                {/* Profile */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Profile'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable Redeem Promo */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'MaterialCommunityIcons/party-popper'}
                                />
                                {/* Redeem Promo */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Redeem promo'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable User Status */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  name={'MaterialIcons/security'}
                                  color={theme.colors['Primary']}
                                />
                                {/* User status */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'User status'}
                                </Text>
                              </View>
                              {/* Status Bubble View */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    height: 26,
                                    justifyContent: 'center',
                                    minWidth: 100,
                                    paddingBottom: 5,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.strong,
                                      fontFamily: 'System',
                                      fontSize: 11,
                                      fontWeight: '700',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {fetchConsumerDataData?.status}
                                </Text>
                                {/* Status Bubble BG */}
                                <>
                                  {!(
                                    fetchConsumerDataData?.status === 'Approved'
                                  ) ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor:
                                            theme.colors['Green BG'],
                                          borderRadius: 100,
                                          bottom: 0,
                                          height: 26,
                                          left: 0,
                                          minWidth: 100,
                                          position: 'absolute',
                                          zIndex: -1,
                                        },
                                        dimensions.width
                                      )}
                                    />
                                  )}
                                </>
                                {/* Status Bubble BG */}
                                <>
                                  {!(
                                    fetchConsumerDataData?.status === 'Pending'
                                  ) ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor:
                                            theme.colors['Yellow Alert BG'],
                                          borderRadius: 100,
                                          bottom: 0,
                                          height: 26,
                                          left: 0,
                                          minWidth: 100,
                                          position: 'absolute',
                                          zIndex: -1,
                                        },
                                        dimensions.width
                                      )}
                                    />
                                  )}
                                </>
                                {/* Status Bubble BG */}
                                <>
                                  {!(
                                    fetchConsumerDataData?.status ===
                                    'ActionRequired'
                                  ) ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor:
                                            theme.colors['Secondary 4'],
                                          borderRadius: 100,
                                          bottom: 0,
                                          height: 26,
                                          left: 0,
                                          minWidth: 100,
                                          position: 'absolute',
                                          zIndex: -1,
                                        },
                                        dimensions.width
                                      )}
                                    />
                                  )}
                                </>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable Recent Activity */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'MaterialCommunityIcons/history'}
                                />
                                {/* Recent activity */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Recent activity'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable Payment Methods */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  name={'MaterialCommunityIcons/bank-transfer'}
                                  color={theme.colors['Primary']}
                                />
                                {/* Payment Methods */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Payment methods'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable Crypto Wallets */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'MaterialCommunityIcons/wallet'}
                                />
                                {/* Crypto wallets */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Crypto wallets'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable Transaction Limits */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'AntDesign/shoppingcart'}
                                />
                                {/* Account limits */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Account limits'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Notifications Row */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 70,
                                justifyContent: 'space-between',
                                paddingLeft: 20,
                                paddingRight: 20,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row' },
                                dimensions.width
                              )}
                            >
                              <Icon
                                size={24}
                                color={theme.colors['Primary']}
                                name={'MaterialCommunityIcons/bell-outline'}
                              />
                              {/* Toggle Notifications */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Primary'],
                                    fontFamily: 'System',
                                    fontSize: 18,
                                    fontWeight: '400',
                                    marginLeft: 10,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Enable notifications'}
                              </Text>
                            </View>
                            {/* Push Notification Switch */}
                            <Switch
                              onValueChange={newPushNotificationSwitchValue => {
                                try {
                                  setPushNotificationsSwitch(
                                    newPushNotificationSwitchValue
                                  );
                                  showAlertUtil({
                                    title: 'Notifications Toggled',
                                    message:
                                      newPushNotificationSwitchValue.toString(),
                                    buttonText: 'Go back',
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              value={pushNotificationsSwitch}
                              inactiveTrackColor={
                                theme.colors['Primary-Light-3']
                              }
                              activeThumbColor={theme.colors['Secondary 4']}
                              activeTrackColor={theme.colors['Secondary']}
                              inactiveThumbColor={theme.colors['Primary']}
                            />
                          </View>
                          {/* FaceID Row */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 70,
                                justifyContent: 'space-between',
                                paddingLeft: 20,
                                paddingRight: 20,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row' },
                                dimensions.width
                              )}
                            >
                              <Icon
                                size={24}
                                color={theme.colors['Primary']}
                                name={'MaterialCommunityIcons/face-recognition'}
                              />
                              {/* FaceID */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Primary'],
                                    fontFamily: 'System',
                                    fontSize: 18,
                                    fontWeight: '400',
                                    marginLeft: 10,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Sign in with FaceID'}
                              </Text>
                            </View>
                            {/* FaceID Switch */}
                            <Switch
                              onValueChange={newFaceIDSwitchValue => {
                                try {
                                  const valuelpb09Z5c = newFaceIDSwitchValue;
                                  setFaceIdSwitch(valuelpb09Z5c);
                                  const faceIdSwitch = valuelpb09Z5c;
                                  showAlertUtil({
                                    title: 'FaceID Toggled',
                                    message: faceIdSwitch.toString(),
                                    buttonText: 'Go back',
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              value={faceIdSwitch}
                              activeTrackColor={theme.colors['Secondary']}
                              inactiveTrackColor={
                                theme.colors['Primary-Light-3']
                              }
                              activeThumbColor={theme.colors['Secondary 4']}
                              inactiveThumbColor={theme.colors['Primary']}
                            />
                          </View>
                          {/* Touchable Close Account */}
                          <Touchable>
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'Ionicons/sad-outline'}
                                />
                                {/* Close account */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Close account'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable Logout */}
                          <Touchable
                            onPress={() => {
                              try {
                                setAccountModalVisible(false);
                                setGlobalVariableValue({
                                  key: 'AUTHORIZATION_HEADER',
                                  value: '',
                                });
                                setGlobalVariableValue({
                                  key: 'sessionKey',
                                  value: '',
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'MaterialIcons/logout'}
                                />
                                {/* Log out */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Log out\n'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                        </View>
                      </ScrollView>
                      {/* Referral Touchable */}
                      <Touchable
                        style={StyleSheet.applyWidth(
                          { marginTop: 25 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: theme.colors['Primary'],
                              borderBottomWidth: 1,
                              borderColor: theme.colors['Primary'],
                              borderLeftWidth: 1,
                              borderRadius: 100,
                              borderRightWidth: 1,
                              borderTopWidth: 1,
                              flexDirection: 'row',
                              height: 42,
                              justifyContent: 'center',
                              paddingLeft: 10,
                              paddingRight: 10,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Secondary'],
                                fontFamily: 'System',
                                fontWeight: '600',
                                marginRight: 5,
                              },
                              dimensions.width
                            )}
                          >
                            {'Refer Noba and get a $5 reward!*'}
                          </Text>
                          <Icon
                            name={'Entypo/share-alternative'}
                            color={theme.colors['Secondary']}
                            size={20}
                          />
                        </View>
                      </Touchable>
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
              {/* Hamburger Menu Actions Modal Popup */}
              <>
                {!menuModalVisible ? null : (
                  <Modal
                    visible={menuModalVisible}
                    animationType={'slide'}
                    transparent={true}
                  >
                    {/* S1: Menu Header */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['White'],
                          borderColor: theme.colors['Secondary 4'],
                          borderTopLeftRadius: 30,
                          borderTopRightRadius: 30,
                          borderTopWidth: 5,
                          bottom: 0,
                          height: '90%',
                          left: 0,
                          paddingBottom: 65,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 45,
                          position: 'absolute',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Close Hamburger Menu Icon Button */}
                      <IconButton
                        onPress={() => {
                          try {
                            setMenuModalVisible(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          { position: 'absolute', right: 20, top: 20 },
                          dimensions.width
                        )}
                        size={32}
                        icon={'Ionicons/close-sharp'}
                        color={theme.colors['Primary-Light-1']}
                      />
                      {/* Noba Logo View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center' },
                          dimensions.width
                        )}
                      >
                        {/* Noba Logo */}
                        <Image
                          style={StyleSheet.applyWidth(
                            { height: 70, width: 160 },
                            dimensions.width
                          )}
                          source={Images.NobaLogoDeepGreen}
                          resizeMode={'contain'}
                        />
                      </View>
                      {/* Tagline */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 18,
                            fontWeight: '400',
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                      >
                        {'Liberate your finances'}
                      </Text>
                      {/* Referral Touchable */}
                      <Touchable
                        style={StyleSheet.applyWidth(
                          { marginTop: 10 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: theme.colors['Primary'],
                              borderRadius: 100,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              paddingBottom: 7,
                              paddingLeft: 10,
                              paddingRight: 10,
                              paddingTop: 7,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Secondary'],
                                fontFamily: 'System',
                                fontWeight: '600',
                                marginRight: 5,
                              },
                              dimensions.width
                            )}
                          >
                            {'Refer Noba and get a $5 reward!*'}
                          </Text>
                          <Icon
                            name={'Entypo/share-alternative'}
                            color={theme.colors['Secondary']}
                            size={20}
                          />
                        </View>
                      </Touchable>
                      {/* Scroll Hamburger Menu Actions View */}
                      <ScrollView
                        showsVerticalScrollIndicator={true}
                        bounces={true}
                      >
                        {/* Hamburger Menu Buttons */}
                        <View
                          style={StyleSheet.applyWidth(
                            { marginTop: 20 },
                            dimensions.width
                          )}
                        >
                          {/* Touchable Button */}
                          <Touchable
                            onPress={() => {
                              try {
                                setMenuModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'MaterialIcons/feedback'}
                                />
                                {/* Feedback */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Give feedback'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                          {/* Touchable Button */}
                          <Touchable
                            onPress={() => {
                              try {
                                setMenuModalVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  height: 70,
                                  justifyContent: 'space-between',
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors['Primary']}
                                  name={'MaterialCommunityIcons/lightbulb-on'}
                                />
                                {/* Feature Request */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Primary'],
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '400',
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Feature request'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                        </View>
                      </ScrollView>
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
            </>
          );
        }}
      </NobaServerApi.FetchConsumerGetDataGET>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AuthenticatedPrimaryScreen);
