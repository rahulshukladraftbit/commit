import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import sliceTicker from '../global-functions/sliceTicker';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  LinearGradient,
  SVG,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const CryptoOrderSubmittedScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const orderObject = await NobaServerApi.transactionsGetTransactionGET(
          Constants,
          { transactionID: props.route?.params?.orderID ?? '' }
        );
        setOrderObject(orderObject);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [orderObject, setOrderObject] = React.useState({
    _id: 'string',
    status: 'string',
    userID: 'string',
    amounts: {
      nobaFee: 0,
      baseAmount: 0,
      fiatAmount: 0,
      networkFee: 0,
      fiatCurrency: 'string',
      processingFee: 0,
      conversionRate: 0,
      cryptocurrency: 'string',
      totalFiatPrice: 0,
      cryptoAmountSettled: 0,
      cryptoQuantityExpected: 0,
    },
    partnerID: 'string',
    transactionID: 'string',
    paymentMethodID: 'string',
    transactionHash: 'string',
    transactionTimestamp: 'string',
    destinationWalletAddress: 'string',
  });
  const [quotedAmount, setQuotedAmount] = React.useState('');
  const [thisCrypto, setThisCrypto] = React.useState('Ethereum');
  const [thisCryptoIcon, setThisCryptoIcon] = React.useState(
    'https://dj61eezhizi5l.cloudfront.net/assets/images/currency-logos/crypto/eth.svg'
  );
  const [thisCryptoTicker, setThisCryptoTicker] = React.useState('ETH');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: theme.colors['Secondary 4'],
          height: '100%',
          width: '100%',
        },
        dimensions.width
      )}
      hasSafeArea={false}
      scrollable={false}
    >
      {/* Center Container */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: '100%',
            paddingBottom: 125,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Background Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['White'],
              borderRadius: 15,
              height: '100%',
              marginLeft: 15,
              marginRight: 15,
              marginTop: 15,
            },
            dimensions.width
          )}
        >
          {/* Top View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', marginTop: 120 },
              dimensions.width
            )}
          >
            {/* Icon View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: theme.colors['Secondary 4'],
                  borderRadius: 100,
                  height: 100,
                  justifyContent: 'center',
                  marginBottom: 30,
                  width: 100,
                },
                dimensions.width
              )}
            >
              <SVG
                style={StyleSheet.applyWidth(
                  { height: 70, width: 70 },
                  dimensions.width
                )}
                source={Constants['cryptoCurrencyIcon']}
              />
            </View>
            {/* Crypto Amount */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Primary'],
                  fontFamily: 'System',
                  fontSize: 20,
                  fontWeight: '700',
                  marginBottom: 15,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {props.route?.params?.cryptoAmount ?? ''}{' '}
              {sliceTicker(Constants['cryptoCurrencyCode'])}
            </Text>
          </View>
          {/* Padded View */}
          <View
            style={StyleSheet.applyWidth(
              { marginTop: 50, paddingLeft: 15, paddingRight: 15 },
              dimensions.width
            )}
          >
            {/* Header */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Primary'],
                  fontFamily: 'System',
                  fontSize: 20,
                  fontWeight: '700',
                  marginBottom: 15,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'Order submitted!'}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', marginBottom: 15 },
                dimensions.width
              )}
            >
              {/* Summary button */}
              <Button
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Primary-Light-1'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    height: 30,
                    textAlign: 'center',
                    width: 150,
                  },
                  dimensions.width
                )}
                title={'See order summary'}
              >
                {'Sign Up'}
              </Button>
            </View>
            {/* Subtext */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Primary'],
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  marginBottom: 20,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'You will receive a confirmation email once it is complete.'}
            </Text>
          </View>
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

export default withTheme(CryptoOrderSubmittedScreen);
