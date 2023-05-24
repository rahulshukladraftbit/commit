import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import cryptoLookup from '../global-functions/cryptoLookup';
import formatDate from '../global-functions/formatDate';
import sliceTicker from '../global-functions/sliceTicker';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Icon,
  IconButton,
  SVG,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const AccountHistoryScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const ImportGlobalVariables = (Variables, setGlobalVariableValue) => {
    //To access global variables, even in a global function, a screen must have a global function that uses them... this imports them. Definitely a feature bug.
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setPageOffset(0);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [pageOffset, setPageOffset] = React.useState(0);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
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
        enabled={true}
        behavior={'padding'}
      >
        {/* Fetch User Order History */}
        <NobaServerApi.FetchTransactionsGetConsumersTransactionsGET
          pageOffset={pageOffset}
        >
          {({
            loading,
            error,
            data,
            refetchTransactionsGetConsumersTransactions,
          }) => {
            const fetchUserOrderHistoryData = data;
            if (!fetchUserOrderHistoryData || loading) {
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
                {/* Center Container */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: '100%' },
                    dimensions.width
                  )}
                >
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
                    {/* History header */}
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
                      {'Recent activity'}
                    </Text>
                  </View>
                  {/* No History Alert View */}
                  <>
                    {!(fetchUserOrderHistoryData?.totalItems === 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: theme.colors['Yellow Alert BG'],
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
                          {'No recent activity found'}
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
                            'You have no recent activity to display! Deposit money and hold your cash in dollars. Watch your money grow with investments in a variety of assets.'
                          }
                        </Text>
                      </View>
                    )}
                  </>
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    bounces={true}
                  >
                    {/* Order List */}
                    <FlatList
                      data={fetchUserOrderHistoryData?.items}
                      listKey={'ZSTy1ytj'}
                      keyExtractor={orderListData =>
                        orderListData?.id ||
                        orderListData?.uuid ||
                        JSON.stringify(orderListData)
                      }
                      renderItem={({ item }) => {
                        const orderListData = item;
                        return (
                          <>
                            {/* Touchable Order */}
                            <Touchable>
                              {/* Order Row */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    justifyContent: 'space-between',
                                    marginBottom: 30,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Order Row 1 */}
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
                                  {/* Order Type */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors['Primary'],
                                        fontFamily: 'System',
                                        fontSize: 14,
                                        fontWeight: '600',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Buy - ['}
                                    {orderListData?.status}
                                    {']'}
                                  </Text>
                                  {/* Right Row */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <SVG
                                      style={StyleSheet.applyWidth(
                                        {
                                          height: 15,
                                          marginRight: 5,
                                          width: 15,
                                        },
                                        dimensions.width
                                      )}
                                      source={cryptoLookup(
                                        Variables,
                                        setGlobalVariableValue,
                                        orderListData?.amounts?.cryptocurrency,
                                        'iconPath'
                                      )}
                                    />
                                    {/* Amount */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors['Primary'],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {
                                        orderListData?.amounts
                                          ?.cryptoQuantityExpected
                                      }{' '}
                                      {sliceTicker(
                                        orderListData?.amounts?.cryptocurrency
                                      )}
                                    </Text>
                                  </View>
                                </View>
                                {/* Order Row 2 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Order Date */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors['Primary-Light-1'],
                                        fontFamily: 'System',
                                        fontWeight: '400',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {formatDate(
                                      orderListData?.transactionTimestamp
                                    )}
                                  </Text>
                                  {/* Right Row */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        {
                                          borderRadius: 100,
                                          height: 15,
                                          marginRight: 5,
                                          width: 15,
                                        },
                                        dimensions.width
                                      )}
                                      resizeMode={'cover'}
                                      source={Images.UnitedStatesOfAmericaFlag}
                                    />
                                    {/* Second Amount */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors['Primary-Light-1'],
                                          fontFamily: 'System',
                                          fontWeight: '400',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'$'}
                                      {orderListData?.amounts?.fiatAmount}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </Touchable>
                          </>
                        );
                      }}
                      style={StyleSheet.applyWidth(
                        { height: '90%' },
                        dimensions.width
                      )}
                      contentContainerStyle={StyleSheet.applyWidth(
                        { flex: 1, marginBottom: 65 },
                        dimensions.width
                      )}
                      numColumns={1}
                    />
                  </ScrollView>
                  {/* Pagination View */}
                  <>
                    {!(fetchUserOrderHistoryData?.totalItems > 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: 65,
                            justifyContent: 'center',
                            marginBottom: 65,
                            paddingBottom: 15,
                            paddingTop: 15,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Previous Page */}
                        <>
                          {!(pageOffset > 0) ? null : (
                            <IconButton
                              onPress={() => {
                                try {
                                  setPageOffset(pageOffset - 1);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              style={StyleSheet.applyWidth(
                                { left: 0, position: 'absolute' },
                                dimensions.width
                              )}
                              size={32}
                              icon={'MaterialIcons/keyboard-arrow-left'}
                              color={theme.colors['Primary']}
                            />
                          )}
                        </>
                        {/* Page Counter */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary-Light-1'],
                              fontFamily: 'System',
                              fontWeight: '400',
                            },
                            dimensions.width
                          )}
                        >
                          {'Page '}
                          {fetchUserOrderHistoryData?.page}
                          {' / '}
                          {fetchUserOrderHistoryData?.totalPages}
                        </Text>
                        {/* Next Page */}
                        <>
                          {!fetchUserOrderHistoryData?.hasNextPage ? null : (
                            <IconButton
                              onPress={() => {
                                console.log('Next Page ON_PRESS Start');
                                let error = null;
                                try {
                                  console.log(
                                    'Start ON_PRESS:0 SET_SCREEN_LOCAL_STATE'
                                  );
                                  const valueoJsGtG6I = pageOffset + 1;
                                  setPageOffset(valueoJsGtG6I);
                                  const newoffset = valueoJsGtG6I;
                                  console.log(
                                    'Complete ON_PRESS:0 SET_SCREEN_LOCAL_STATE'
                                  );
                                  console.log('Start ON_PRESS:1 CONSOLE_LOG');
                                  console.log(newoffset);
                                  console.log(
                                    'Complete ON_PRESS:1 CONSOLE_LOG'
                                  );
                                } catch (err) {
                                  console.error(err);
                                  error = err.message ?? err;
                                }
                                console.log(
                                  'Next Page ON_PRESS Complete',
                                  error ? { error } : 'no error'
                                );
                              }}
                              style={StyleSheet.applyWidth(
                                { position: 'absolute', right: 0 },
                                dimensions.width
                              )}
                              size={32}
                              icon={'MaterialIcons/keyboard-arrow-right'}
                              color={theme.colors['Primary']}
                            />
                          )}
                        </>
                      </View>
                    )}
                  </>
                </View>
              </>
            );
          }}
        </NobaServerApi.FetchTransactionsGetConsumersTransactionsGET>
      </KeyboardAvoidingView>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AccountHistoryScreen);
