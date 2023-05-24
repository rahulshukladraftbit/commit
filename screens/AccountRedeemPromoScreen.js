import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import isNotEmptyString from '../global-functions/isNotEmptyString';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  IconButton,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const AccountRedeemPromoScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;

  const [promoFilled, setPromoFilled] = React.useState(false);
  const [promoInput, setPromoInput] = React.useState('');
  const [promoValid, setPromoValid] = React.useState(false);

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
        {/* Center Container */}
        <View
          style={StyleSheet.applyWidth(
            { height: '100%', justifyContent: 'space-between' },
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
              {/* Promo Header */}
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
                {'Promotions'}
              </Text>
            </View>
            {/* Promo view */}
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 30 },
                dimensions.width
              )}
            >
              {/* Promo Header */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 12,
                  },
                  dimensions.width
                )}
              >
                {'Promo code'}
              </Text>
              {/* Promo Input */}
              <TextInput
                onChangeText={newPromoInputValue => {
                  try {
                    setPromoInput(newPromoInputValue);
                    setPromoFilled(isNotEmptyString(newPromoInputValue));
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Primary-Light-1'],
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontWeight: '400',
                    height: 42,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
                value={promoInput}
                placeholder={'noba_rocks!'}
                editable={true}
              />
            </View>
            {/* Promo Bubble */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Secondary'],
                  borderRadius: 15,
                  marginBottom: 15,
                  paddingBottom: 15,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 15,
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
                color={theme.colors['Primary']}
                name={'MaterialCommunityIcons/gift'}
              />
              {/* Promo text */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontWeight: '600',
                  },
                  dimensions.width
                )}
              >
                {
                  'Noba often offers promotions for referral, saving or spending habits, and educational accomplishments! Check back here often or turn on notifications to avoid missing some sweet promos.'
                }
              </Text>
            </View>
          </View>
          {/* Bottom Button View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 65 },
              dimensions.width
            )}
          >
            {/* Submit Button */}
            <>
              {!promoFilled ? null : (
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
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Submit'}
                  disabled={false}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Invalid Submit Button */}
            <>
              {promoFilled ? null : (
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
                      height: 38,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Submit'}
                  disabled={true}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
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

export default withTheme(AccountRedeemPromoScreen);
