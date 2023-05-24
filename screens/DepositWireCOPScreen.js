import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
import copyToClipboard from '../global-functions/copyToClipboard';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Icon,
  IconButton,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const DepositWireCOPScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;

  const [accountNumber, setAccountNumber] = React.useState(64895731648);
  const [bankName, setBankName] = React.useState('Bancolombia');
  const [exchangeRate, setExchangeRate] = React.useState(5000);
  const [memo, setMemo] = React.useState(1654897);

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
              style={StyleSheet.applyWidth(
                { left: 0, position: 'absolute' },
                dimensions.width
              )}
              size={32}
              icon={'Ionicons/chevron-back-sharp'}
              color={theme.colors['Primary']}
            />
            {/* Deposit With Wire Header */}
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
              {'Deposit with wire'}
            </Text>
          </View>
          {/* Bank Info View */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['White'],
                borderBottomWidth: 5,
                borderColor: theme.colors['Secondary 4'],
                borderLeftWidth: 5,
                borderRadius: 15,
                borderRightWidth: 5,
                borderTopWidth: 5,
                marginBottom: 20,
                paddingBottom: 25,
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 25,
              },
              dimensions.width
            )}
          >
            {/* Header Row View */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', marginBottom: 20 },
                dimensions.width
              )}
            >
              <Image
                style={StyleSheet.applyWidth(
                  { borderRadius: 100, height: 32, marginRight: 10, width: 32 },
                  dimensions.width
                )}
                source={Images.ColombiaFlag}
                resizeMode={'cover'}
              />
              {/* Deposit Header Right Column */}
              <View>
                {/* Deposit Header */}
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
                  {'Colombia account details'}
                </Text>
                {/* Deposit Subtext */}
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
                  {'Deposit with pesos'}
                </Text>
              </View>
            </View>
            {/* Info Row */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 30,
                },
                dimensions.width
              )}
            >
              {/* Info Name */}
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
                {'Account Number'}
              </Text>
              {/* Touchable Info Value */}
              <Touchable
                onPress={() => {
                  try {
                    copyToClipboard(
                      Variables,
                      setGlobalVariableValue,
                      accountNumber,
                      'Account number'
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Info Right Row */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Info Value */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '600',
                        marginRight: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {accountNumber}
                  </Text>
                  <Icon
                    name={'MaterialIcons/content-copy'}
                    size={16}
                    color={theme.colors['Primary-Light-1']}
                  />
                </View>
              </Touchable>
            </View>
            {/* Info Row */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 30,
                },
                dimensions.width
              )}
            >
              {/* Info Name */}
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
                {'Memo'}
              </Text>
              {/* Touchable Info Value */}
              <Touchable
                onPress={() => {
                  try {
                    copyToClipboard(
                      Variables,
                      setGlobalVariableValue,
                      memo,
                      'Memo'
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Info Right Row */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Info Value */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '600',
                        marginRight: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {memo}
                  </Text>
                  <Icon
                    name={'MaterialIcons/content-copy'}
                    size={16}
                    color={theme.colors['Primary-Light-1']}
                  />
                </View>
              </Touchable>
            </View>
            {/* Info Row */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              {/* Info Name */}
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
                {'Bank'}
              </Text>
              {/* Touchable Info Value */}
              <Touchable
                onPress={() => {
                  try {
                    copyToClipboard(
                      Variables,
                      setGlobalVariableValue,
                      bankName,
                      'Bank name'
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Info Right Row */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Info Value */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Primary'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '600',
                        marginRight: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {bankName}
                  </Text>
                  <Icon
                    name={'MaterialIcons/content-copy'}
                    size={16}
                    color={theme.colors['Primary-Light-1']}
                  />
                </View>
              </Touchable>
            </View>
          </View>
          {/* Exchange Rate View */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['White'],
                borderBottomWidth: 5,
                borderColor: theme.colors['Secondary 4'],
                borderLeftWidth: 5,
                borderRadius: 15,
                borderRightWidth: 5,
                borderTopWidth: 5,
                paddingBottom: 25,
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 25,
              },
              dimensions.width
            )}
          >
            {/* Info Row */}
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
              {/* Info Name */}
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
                {'Rate'}
              </Text>
              {/* Info Right Row */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* Info Value */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '600',
                      marginRight: 10,
                    },
                    dimensions.width
                  )}
                >
                  {'1 USD = '}
                  {exchangeRate}
                  {' COP'}
                </Text>
              </View>
            </View>
            {/* Info Row */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              {/* Touchable Exchange Calculator */}
              <Touchable>
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row', height: 18 },
                    dimensions.width
                  )}
                >
                  {/* Info Name */}
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
                    {'Exchange rate calculator'}
                  </Text>
                  <Icon
                    color={theme.colors['Primary-Light-1']}
                    size={16}
                    name={'Ionicons/chevron-forward-sharp'}
                  />
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(DepositWireCOPScreen);
