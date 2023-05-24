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
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
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

const PaymentsManageScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const resetVariables = setGlobalVariableValue => {
    setConfirmDeleteModalVisible(false);
    setPaymentMask('');
    setPaymentMethodSelected('');
    setPaymentMethodSelectorVisible(false);
    setPaymentName('Select a payment method');
    setGlobalVariableValue({ key: 'paymentMethod', value: '' });
  };

  const handlePaymentMethodType = paymentMethod => {
    try {
      if (paymentMethod.type === 'Card') {
        setPaymentMask(
          paymentMethod.cardData.first6Digits.slice(0, 4) +
            '...' +
            paymentMethod.cardData.last4Digits
        );
      } else {
        setPaymentMask(paymentMethod.achData.accountMask);
      }
    } catch (error) {}
  };

  const handleResponse = (
    Variables,
    setGlobalVariableValue,
    deleteResponse
  ) => {
    try {
      if (deleteResponse.statusCode) {
        showToastFunction.showToast(
          Variables,
          setGlobalVariableValue,
          'A technical error has occured. Please try again.',
          'error'
        );
        return;
      }

      setPaymentMethodSelected(false);
      setConfirmDeleteModalVisible(false);
      setPaymentName('Select a payment method');
      setPaymentMask('');
      setGlobalVariableValue({ key: 'paymentMethod', value: '' });

      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'Card succesfully removed from account.',
        'success'
      );
      return;
    } catch (error) {
      showToastFunction.showToast(
        Variables,
        setGlobalVariableValue,
        'A technical error has occured. Please try again',
        'error'
      );
    }
  };

  const { theme } = props;

  const nobaServerConsumersDeletePaymentMethodDELETE =
    NobaServerApi.useConsumersDeletePaymentMethodDELETE();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setOriginScreen(props.route?.params?.originScreen ?? '');
      resetVariables(setGlobalVariableValue);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    React.useState(false);
  const [firstSix, setFirstSix] = React.useState('');
  const [lastFour, setLastFour] = React.useState('');
  const [originScreen, setOriginScreen] = React.useState(
    props.route?.params?.originScreen ?? ''
  );
  const [paymentMask, setPaymentMask] = React.useState('');
  const [paymentMethodSelected, setPaymentMethodSelected] =
    React.useState(false);
  const [paymentMethodSelectorVisible, setPaymentMethodSelectorVisible] =
    React.useState(false);
  const [paymentName, setPaymentName] = React.useState(
    'Select a payment method'
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
            {/* Payment Methods Header */}
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
              {'Payment methods'}
            </Text>
          </View>
          {/* Your Payment Methods View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 20, zIndex: 1 },
              dimensions.width
            )}
          >
            {/* Your Payment Methods Header */}
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
              {'Your payment methods'}
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
                          setPaymentMethodSelectorVisible(true);
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
                          {paymentName} {paymentMask}
                        </Text>
                        {/* Open Icon */}
                        <>
                          {paymentMethodSelectorVisible ? null : (
                            <Icon
                              size={18}
                              color={theme.colors['Primary-Light-1']}
                              name={'MaterialIcons/keyboard-arrow-down'}
                            />
                          )}
                        </>
                        {/* Close Icon */}
                        <>
                          {!paymentMethodSelectorVisible ? null : (
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
          {/* Delete Button */}
          <>
            {!paymentMethodSelected ? null : (
              <Button
                onPress={() => {
                  try {
                    setConfirmDeleteModalVisible(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['White'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Red'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Red'],
                    fontFamily: 'System',
                    fontWeight: '700',
                    height: 38,
                    marginTop: 25,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Delete payment method'}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
        </View>
      </View>
      {/* Payment Selector Modal Popup */}
      <>
        {!paymentMethodSelectorVisible ? null : (
          <Modal animationType={'slide'} transparent={true}>
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
                {'Your payment methods'}
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
                          {/* Payment Methods List */}
                          <FlatList
                            data={fetchUserDataData?.paymentMethods}
                            listKey={'Bb6oWelH'}
                            keyExtractor={paymentMethodsListData =>
                              paymentMethodsListData?.id ||
                              paymentMethodsListData?.uuid ||
                              JSON.stringify(paymentMethodsListData)
                            }
                            renderItem={({ item }) => {
                              const paymentMethodsListData = item;
                              return (
                                <>
                                  {/* Touchable Payment Method Option */}
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setGlobalVariableValue({
                                          key: 'paymentMethod',
                                          value: paymentMethodsListData,
                                        });
                                        setPaymentMethodSelected(true);
                                        setPaymentName(
                                          paymentMethodsListData?.name
                                        );
                                        handlePaymentMethodType(
                                          paymentMethodsListData
                                        );
                                        setPaymentMethodSelectorVisible(false);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    {/* Payment Method Option View */}
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
                                      {/* Payment Method Name */}
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
                                        {paymentMethodsListData?.name}
                                      </Text>
                                      {/* ACH Mask */}
                                      <>
                                        {!(
                                          paymentMethodsListData?.type === 'ACH'
                                        ) ? null : (
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
                                            {null}
                                          </Text>
                                        )}
                                      </>
                                      {/* Card Number Mask */}
                                      <>
                                        {!(
                                          paymentMethodsListData?.type ===
                                          'Card'
                                        ) ? null : (
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
                                            {maskCardNumber(
                                              paymentMethodsListData?.cardData
                                                ?.first6Digits
                                            )}
                                          </Text>
                                        )}
                                      </>
                                      {/* Payment Method Option BG */}
                                      <>
                                        {!(
                                          paymentMethodsListData ===
                                          Constants['paymentMethod']
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
                          {/* Touchable Add Payment Method */}
                          <Touchable
                            onPress={() => {
                              try {
                                setPaymentMethodSelectorVisible(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            {/* Add Payment MEthod View */}
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
                              {/* Add Payment Method */}
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
                                {'+ Add new payment method'}
                              </Text>
                            </View>
                          </Touchable>
                          {/* Touchable Clear Selection */}
                          <>
                            {!paymentMethodSelected ? null : (
                              <Touchable
                                onPress={() => {
                                  try {
                                    resetVariables(setGlobalVariableValue);
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
                    setPaymentMethodSelectorVisible(false);
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
      {/* Confirm Payment Deleted Modal Popup */}
      <>
        {!confirmDeleteModalVisible ? null : (
          <Modal animationType={'slide'} transparent={true}>
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
                    backgroundColor: theme.colors['Red Alert BG'],
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
                  name={'Feather/alert-circle'}
                  color={theme.colors['Red']}
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
                {'Confirm payment method deletion'}
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
                  "Please confirm that you would like to delete this payment method from your account. You can add it again in the future whenever you'd like."
                }
              </Text>
              {/* Delete Payment Method Button */}
              <Button
                onPress={() => {
                  const handler = async () => {
                    try {
                      const deleteResponse =
                        await nobaServerConsumersDeletePaymentMethodDELETE.mutateAsync(
                          {
                            paymentToken:
                              Constants['paymentMethod']?.paymentToken,
                          }
                        );
                      handleResponse(
                        Variables,
                        setGlobalVariableValue,
                        deleteResponse
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Red Alert BG'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Red Alert BG'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Red'],
                    fontFamily: 'System',
                    fontWeight: '700',
                    height: 38,
                    marginBottom: 20,
                    marginTop: 25,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Delete payment method'}
              >
                {'Sign Up'}
              </Button>
              {/* Close Delete Modal Button */}
              <Button
                onPress={() => {
                  try {
                    setConfirmDeleteModalVisible(false);
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
                title={'Cancel'}
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

export default withTheme(PaymentsManageScreen);
