import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import roundToTwo from '../global-functions/roundToTwo';
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
  KeyboardAvoidingView,
  Modal,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const AccountLimitsScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const calculateLimit = (maxAvailable, amountUsed) => {
    return (maxAvailable - amountUsed).toFixed(2);
  };

  const { theme } = props;

  const [
    identityInformationalModalVisible,
    setIdentityInformationalModalVisible,
  ] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAvoidingView
        style={StyleSheet.applyWidth({ height: '100%' }, dimensions.width)}
        enabled={true}
        behavior={'padding'}
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
              {/* Limits Header */}
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
                {'Transaction limits'}
              </Text>
            </View>

            <NobaServerApi.FetchConsumerGetTransactionLimitsGET>
              {({
                loading,
                error,
                data,
                refetchConsumerGetTransactionLimits,
              }) => {
                const fetchData = data;
                if (!fetchData || loading) {
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
                    {/* Center View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 20, zIndex: 1 },
                        dimensions.width
                      )}
                    >
                      {/* Limits Row */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Limits SubHeader */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                              marginBottom: 10,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {'30-day rolling limit'}
                        </Text>
                        {/* Limits Used */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                              marginBottom: 10,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {roundToTwo(fetchData?.monthly?.used)}
                          {'/'}
                          {fetchData?.monthly?.max}
                          {' USD'}
                        </Text>
                      </View>

                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontWeight: '600',
                            marginBottom: 15,
                          },
                          dimensions.width
                        )}
                      >
                        {'Remaining limit: $'}
                        {calculateLimit(
                          fetchData?.monthly?.max,
                          fetchData?.monthly?.used
                        )}
                      </Text>
                      {/* Touchable Informational Row */}
                      <Touchable
                        onPress={() => {
                          try {
                            setIdentityInformationalModalVisible(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Informational Row */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center', flexDirection: 'row' },
                            dimensions.width
                          )}
                        >
                          {/* Eye Icon */}
                          <Icon
                            style={StyleSheet.applyWidth(
                              { height: 20, width: 20 },
                              dimensions.width
                            )}
                            name={'MaterialCommunityIcons/eye'}
                            color={theme.colors['Primary-Light-1']}
                            size={20}
                          />
                          {/* Informational Text */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Primary-Light-1'],
                                marginLeft: 5,
                              },
                              dimensions.width
                            )}
                          >
                            {'Why do I have a limit?'}
                          </Text>
                        </View>
                      </Touchable>
                    </View>
                  </>
                );
              }}
            </NobaServerApi.FetchConsumerGetTransactionLimitsGET>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Personal Data Informational Modal Popup */}
      <>
        {!identityInformationalModalVisible ? null : (
          <Modal
            visible={identityInformationalModalVisible}
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
                  name={'MaterialIcons/remove-red-eye'}
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
                {'How do transaction limits work?'}
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
                  'Transaction limits are in place for your protection. The current transaction limit is $2,000 USD in a 30-day rolling period. A "30-day rolling period” is a time window from today to 30 days ago. If your remaining limit is less than the minimum account, you may have to wait a few days to make another purchase. We may raise your limits as you transact.'
                }
              </Text>
              {/* Close Info Modal Button */}
              <Button
                onPress={() => {
                  try {
                    setIdentityInformationalModalVisible(false);
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

export default withTheme(AccountLimitsScreen);
