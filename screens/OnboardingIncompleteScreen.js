import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, Icon, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const OnboardingIncompleteScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const handlePushToken = pushToken => {
    console.log(pushToken);

    if (pushToken === undefined) {
      // Set the screen variable of tokenError = true
      return true;
    } else {
    }
  };

  const { theme } = props;

  const [tokenError, setTokenError] = React.useState(false);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: theme.colors['White'],
          height: '100%',
          width: '100%',
        },
        dimensions.width
      )}
      hasSafeArea={false}
      scrollable={false}
    >
      {/* Center View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Top View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 300,
              paddingLeft: 15,
              paddingRight: 15,
            },
            dimensions.width
          )}
        >
          <Icon
            style={StyleSheet.applyWidth({ bottom: 65 }, dimensions.width)}
            color={theme.colors['Primary']}
            size={120}
            name={'MaterialIcons/assignment-ind'}
          />
          {/* Finish onboarding header */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Primary'],
                fontFamily: 'System',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 10,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {"Let's get to know you so you can start building wealth!"}
          </Text>
          {/* Finish onboarding text */}
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
            {
              'Finish onboarding in a few minutes to gain access to the financial tools you need for a prosperous future.'
            }
          </Text>
        </View>
        {/* Button View */}
        <View
          style={StyleSheet.applyWidth(
            {
              marginBottom: 65,
              paddingLeft: 15,
              paddingRight: 15,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Continue Button */}
          <>
            {tokenError ? null : (
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
                title={'Continue'}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
        </View>
      </View>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingIncompleteScreen);
