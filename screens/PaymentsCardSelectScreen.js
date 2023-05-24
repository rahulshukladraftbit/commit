import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import maskCardNumber from '../global-functions/maskCardNumber';
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
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const PaymentsCardSelectScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const navigateBasedOnOrigin = (
    Variables,
    setGlobalVariableValue,
    originScreen
  ) => {
    if (originScreen === 'deposit') {
      props.navigation.navigate('DepositAmountScreen');
    } else {
      props.navigation.navigate('CryptoOrderSummaryScreen');
    }
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setCardSelectorVisible(false);
      setOriginScreen(props.route?.params?.originScreen ?? '');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [cardMask, setCardMask] = React.useState('');
  const [cardName, setCardName] = React.useState('Select a card');
  const [cardSelected, setCardSelected] = React.useState(false);
  const [cardSelectorVisible, setCardSelectorVisible] = React.useState(false);
  const [firstSix, setFirstSix] = React.useState('');
  const [lastFour, setLastFour] = React.useState('');
  const [originScreen, setOriginScreen] = React.useState(
    props.route?.params?.originScreen ?? ''
  );

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { borderColor: theme.colors['Primary-Light-1'] },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
    >
      {/* Center Container */}
      <View
        style={StyleSheet.applyWidth(
          {
            height: '100%',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15,
          },
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
                marginBottom: 20,
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
            {/* Select Card */}
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
              {'Select card'}
            </Text>
          </View>
          {/* Your Payment Cards View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 20, zIndex: 1 },
              dimensions.width
            )}
          >
            {/* Your Payment Cards Header */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Primary'],
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 10,
                  marginTop: 16,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Your cards'}
            </Text>
            {/* Fetch User Data */}
            <NobaServerApi.FetchConsumerGetDataGET>
              {({ loading, error, data, refetchConsumerGetData }) => {
                const fetchUserDataData = data;
                if (!fetchUserDataData || loading) {
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
                    {/* Payment Selector */}
                    <Touchable
                      onPress={() => {
                        try {
                          setCardSelectorVisible(true);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      {/* Payment Selector */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: theme.colors['Primary-Light-1'],
                            borderLeftWidth: 1,
                            borderRadius: 100,
                            borderRightWidth: 1,
                            borderTopWidth: 1,
                            flexDirection: 'row',
                            height: 42,
                            justifyContent: 'space-between',
                            paddingLeft: 15,
                            paddingRight: 15,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Payment selection */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary-Light-1'],
                              fontFamily: 'System',
                              fontWeight: '600',
                            },
                            dimensions.width
                          )}
                        >
                          {cardName} {cardMask}
                        </Text>
                        {/* Open Icon */}
                        <>
                          {cardSelectorVisible ? null : (
                            <Icon
                              size={18}
                              color={theme.colors['Primary-Light-1']}
                              name={'MaterialIcons/keyboard-arrow-down'}
                            />
                          )}
                        </>
                        {/* Close Icon */}
                        <>
                          {!cardSelectorVisible ? null : (
                            <Icon
                              size={18}
                              color={theme.colors['Primary-Light-1']}
                              name={'MaterialIcons/keyboard-arrow-up'}
                            />
                          )}
                        </>
                      </View>
                    </Touchable>
                  </>
                );
              }}
            </NobaServerApi.FetchConsumerGetDataGET>
          </View>
          {/* Informational Alert View */}
          <>
            {!(
              (props.route?.params?.originScreen ?? '') === 'cryptoflow'
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
          style={StyleSheet.applyWidth({ marginBottom: 65 }, dimensions.width)}
        >
          {/* Next Button */}
          <>
            {!cardSelected ? null : (
              <Button
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Primary'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary'],
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
                title={'Next'}
                loading={false}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
          {/* Next Invalid */}
          <>
            {cardSelected ? null : (
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
        </View>
      </View>
      {/* Payment Selector Modal Popup */}
      <>
        {!cardSelectorVisible ? null : (
          <Modal
            visible={cardSelectorVisible}
            animationType={'slide'}
            transparent={true}
          >
            {/* Modal View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['White'],
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  bottom: 0,
                  justifyContent: 'flex-end',
                  left: 0,
                  paddingBottom: 65,
                  paddingLeft: 15,
                  paddingRight: 15,
                  position: 'absolute',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Modal Header */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 10,
                    marginTop: 30,
                  },
                  dimensions.width
                )}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {'Pick your card'}
              </Text>
              {/* Fetch User Data */}
              <NobaServerApi.FetchConsumerGetDataGET>
                {({ loading, error, data, refetchConsumerGetData }) => {
                  const fetchUserDataData = data;
                  if (!fetchUserDataData || loading) {
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
                      {/* Card List View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: theme.colors['White'],
                            borderColor: theme.colors['Primary-Light-1'],
                            marginBottom: 20,
                            maxHeight: 400,
                            paddingBottom: 10,
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 10,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <ScrollView
                          showsVerticalScrollIndicator={true}
                          bounces={true}
                        >
                          {/* Card List */}
                          <FlatList
                            data={fetchUserDataData?.paymentMethods}
                            listKey={'B3uvpnBU'}
                            keyExtractor={cardListData =>
                              cardListData?.id ||
                              cardListData?.uuid ||
                              JSON.stringify(cardListData)
                            }
                            renderItem={({ item }) => {
                              const cardListData = item;
                              return (
                                <>
                                  {/* Touchable Card Option */}
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setGlobalVariableValue({
                                          key: 'paymentMethod',
                                          value: cardListData,
                                        });
                                        setCardName(cardListData?.name);
                                        setCardMask(
                                          maskCardNumber(
                                            cardListData?.cardData?.last4Digits
                                          )
                                        );
                                        setCardSelected(true);
                                        setCardSelectorVisible(false);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    {/* Card Option View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          height: 70,
                                          justifyContent: 'space-between',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Card Name */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.strong,
                                            fontFamily: 'System',
                                            fontWeight: '600',
                                            marginLeft: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {cardListData?.name}
                                      </Text>
                                      {/* Card Number */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.strong,
                                            fontFamily: 'System',
                                            fontWeight: '600',
                                            marginRight: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'••• '}
                                        {cardListData?.cardData?.last4Digits}
                                      </Text>
                                      {/* Card Option BG */}
                                      <>
                                        {!(
                                          cardName === cardListData?.name
                                        ) ? null : (
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  theme.colors['Secondary 4'],
                                                borderRadius: 100,
                                                bottom: 14,
                                                height: 42,
                                                left: 0,
                                                position: 'absolute',
                                                width: '100%',
                                                zIndex: -1,
                                              },
                                              dimensions.width
                                            )}
                                          />
                                        )}
                                      </>
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
                          {/* Touchable Add Card */}
                          <Touchable
                            onPress={() => {
                              try {
                                setCardSelectorVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            {/* Add Card View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  height: 70,
                                  justifyContent: 'center',
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Add new card */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.strong,
                                    fontFamily: 'System',
                                    fontWeight: '700',
                                    paddingBottom: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'+ Add new card'}
                              </Text>
                            </View>
                          </Touchable>
                          {/* Touchable Clear Selection */}
                          <>
                            {!cardMask ? null : (
                              <Touchable
                                onPress={() => {
                                  try {
                                    setCardName('Select a card');
                                    setCardSelectorVisible(false);
                                    setCardMask('');
                                    setLastFour('');
                                    setFirstSix('');
                                    setCardSelected(false);
                                    setGlobalVariableValue({
                                      key: 'paymentMethod',
                                      value: '',
                                    });
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                {/* Clear Selection View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      height: 70,
                                      justifyContent: 'center',
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Clear selection */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors['Red'],
                                        fontFamily: 'System',
                                        fontWeight: '700',
                                        paddingBottom: 10,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'- Clear selection'}
                                  </Text>
                                </View>
                              </Touchable>
                            )}
                          </>
                        </ScrollView>
                      </View>
                    </>
                  );
                }}
              </NobaServerApi.FetchConsumerGetDataGET>
              {/* Close Card Selection Modal Button */}
              <Button
                onPress={() => {
                  try {
                    setCardSelectorVisible(false);
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

export default withTheme(PaymentsCardSelectScreen);
