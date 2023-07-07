import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, useWindowDimensions } from 'react-native';

const BlankScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <Text
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text'],
          dimensions.width
        )}
      >
        {'Double click me to edit 👀'}
      </Text>
      {/* Text 2 */}
      <Text
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text'],
          dimensions.width
        )}
      >
        {'Double click me to edit 👀'}
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
