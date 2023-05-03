import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, useWindowDimensions } from 'react-native';

const BlankScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const getLocation = async () => {
    const { status } =
      await CustomCode.Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('please check browser permissions for location');
    }

    const { coords } = await CustomCode.Location.getCurrentPositionAsync({});
    return coords;
  };
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  const { theme } = props;

  const [error, setError] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [textInput2Value, setTextInput2Value] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <Button
        onPress={() => {
          const handler = async () => {
            try {
              const a = await getLocation();
              setLocation(JSON.stringify(a));
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
        style={StyleSheet.applyWidth(
          GlobalStyles.ButtonStyles(theme)['Button'],
          dimensions.width
        )}
        title={'Get Started'}
      />
      <Text
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text'],
          dimensions.width
        )}
      >
        {location}
      </Text>

      <Text
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text'],
          dimensions.width
        )}
      >
        {error}
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
