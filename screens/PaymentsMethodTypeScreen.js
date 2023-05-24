import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const PaymentsMethodTypeScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const navigateToOrigin = originScreen => {
    if (originScreen === 'manage') {
      props.navigation.navigate('PaymentsManageScreen');
    } else if (originScreen === 'deposit') {
      props.navigation.navigate('PaymentsCardSelectScreen');
    } else if (originScreen === 'cryptoflow') {
      props.navigation.navigate('PaymentsSelectScreen');
    } else if (originScreen === 'home') {
      props.navigation.navigate('AuthenticatedPrimaryScreen');
    }
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setOriginScreen(props.route?.params?.originScreen ?? '');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [originScreen, setOriginScreen] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { borderColor: theme.colors['Primary-Light-1'] },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
    >
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
        {/* Center Container */}
        <View
          style={StyleSheet.applyWidth({ height: '100%' }, dimensions.width)}
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
              onPress={() => {
                try {
                  navigateToOrigin(originScreen);
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
            {/* Add new payment method */}
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
              {'Add new payment method'}
            </Text>
          </View>
          {/* Touchable Bank Account */}
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  const plaidToken =
                    await NobaServerApi.consumersGetPlaidTokenForModalGET(
                      Constants
                    );
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            {/* Bank Account View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Primary-Light-1'],
                  borderLeftWidth: 1,
                  borderRadius: 15,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  flexDirection: 'row',
                  marginBottom: 20,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              {/* Bank Icon */}
              <Icon
                style={StyleSheet.applyWidth(
                  { marginRight: 10 },
                  dimensions.width
                )}
                size={24}
                name={'MaterialCommunityIcons/bank'}
                color={theme.colors['Primary']}
              />
              {/* Back Account Right Column */}
              <View>
                {/* Bank Account Header */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Bank account'}
                </Text>
                {/* Bank Account Icon Row */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* ACH Icon */}
                  <Image
                    style={StyleSheet.applyWidth(
                      { height: 18, marginRight: 5, width: 18 },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.ACHLogo}
                  />
                  {/* ACH */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary-Light-1'],
                        fontFamily: 'System',
                        fontSize: 10,
                        fontWeight: '600',
                      },
                      dimensions.width
                    )}
                  >
                    {'ACH'}
                  </Text>
                </View>
                {/* Bank Account Value Add Row */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Value Add Bubble 1 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors['Secondary 4'],
                        borderRadius: 100,
                        height: 22,
                        justifyContent: 'center',
                        marginRight: 5,
                        paddingBottom: 3,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 3,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Instant */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary-Light-1'],
                          fontFamily: 'System',
                          fontSize: 11,
                          fontWeight: '600',
                        },
                        dimensions.width
                      )}
                    >
                      {'Instant'}
                    </Text>
                  </View>
                  {/* Value Add Bubble 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors['Secondary 4'],
                        borderRadius: 100,
                        height: 22,
                        justifyContent: 'center',
                        paddingBottom: 3,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 3,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Low fees */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary-Light-1'],
                          fontFamily: 'System',
                          fontSize: 11,
                          fontWeight: '600',
                        },
                        dimensions.width
                      )}
                    >
                      {'Low fees'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Touchable>
          {/* Touchable Card */}
          <Touchable>
            {/* Card View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Primary-Light-1'],
                  borderLeftWidth: 1,
                  borderRadius: 15,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  flexDirection: 'row',
                  marginBottom: 20,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              {/* Card Icon */}
              <Icon
                style={StyleSheet.applyWidth(
                  { marginRight: 10 },
                  dimensions.width
                )}
                size={24}
                color={theme.colors['Primary']}
                name={'MaterialIcons/credit-card'}
              />
              {/* Card Right Column */}
              <View>
                {/* Card Header */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Debit/credit card'}
                </Text>
                {/* Card Icon Row */}
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
                  {/* Visa Icon */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 3,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 18,
                        marginRight: 5,
                        width: 28,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.VISA}
                  />
                  {/* Mastercard Icon 1 */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 3,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 18,
                        marginRight: 5,
                        width: 28,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.Mastercard1}
                  />
                  {/* Mastercard Icon 2 */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 3,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 18,
                        marginRight: 5,
                        width: 28,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.Mastercard2}
                  />
                  {/* Diners Club Icon */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 3,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 18,
                        marginRight: 5,
                        width: 28,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.DinersClub}
                  />
                  {/* AMEX Icon */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 3,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 18,
                        marginRight: 5,
                        width: 28,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.AMEX}
                  />
                  {/* Discover Icon */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 3,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 18,
                        marginRight: 5,
                        width: 28,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.Discover}
                  />
                  {/* JCB Icon */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors['Primary-Light-1'],
                        borderLeftWidth: 1,
                        borderRadius: 3,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        height: 18,
                        marginRight: 5,
                        width: 28,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.JCP}
                  />
                </View>
                {/* Card Value Add Row */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Value Add Bubble 1 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors['Secondary 4'],
                        borderRadius: 100,
                        height: 22,
                        justifyContent: 'center',
                        marginRight: 5,
                        paddingBottom: 3,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 3,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Instant */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Primary-Light-1'],
                          fontFamily: 'System',
                          fontSize: 11,
                          fontWeight: '600',
                        },
                        dimensions.width
                      )}
                    >
                      {'Instant'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Touchable>
          {/* Informational Alert View */}
          <>
            {!(originScreen === 'cryptoflow') ? null : (
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
                      paddingBottom: 10,
                    },
                    dimensions.width
                  )}
                >
                  {
                    'ACH transfers and debit cards have the highest success rates!'
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
                      paddingBottom: 5,
                    },
                    dimensions.width
                  )}
                >
                  {
                    'Many of the banks that issue your credit cards have internal policies against processing transactions involving cryptocurrencies and digital assets. Using an ACH transfer or debit card will increase your chances of a successful transaction!'
                  }
                </Text>
              </View>
            )}
          </>
        </View>
      </KeyboardAvoidingView>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(PaymentsMethodTypeScreen);
