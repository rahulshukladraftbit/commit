import React from 'react';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const MedicineDeliveredSuccessScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Primary'], justifyContent: 'center' },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
    >
      <Touchable
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
        activeOpacity={0.8}
        disabledOpacity={0.8}
      >
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1, justifyContent: 'center' },
            dimensions.width
          )}
        >
          {/* Logo */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <Image
              style={StyleSheet.applyWidth(
                { height: 100, marginBottom: 30, width: 100 },
                dimensions.width
              )}
              resizeMode={'cover'}
              source={Images.MedDelivered}
            />
          </View>
          {/* msg */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Custom Color'],
                fontFamily: 'Inter_500Medium',
                fontSize: 18,
                lineHeight: 25,
                opacity: 0.95,
                paddingLeft: 25,
                paddingRight: 25,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'Yeeay your Medicine has been delivered, Thank you for ordering.'}
          </Text>
        </View>
      </Touchable>
    </ScreenContainer>
  );
};

export default withTheme(MedicineDeliveredSuccessScreen);
