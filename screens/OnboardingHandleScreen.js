import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import validateForm from '../global-functions/validateForm';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, IconButton, ScreenContainer, withTheme } from '@draftbit/ui';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const OnboardingHandleScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const filterCountries = (inputCountries, inputText) => {
    var filteredCountries = inputCountries.filter(function (country) {
      return (
        country.countryName.toLowerCase().includes(inputText.toLowerCase()) ||
        country.countryISOCode.toLowerCase().includes(inputText.toLowerCase())
      );
    });

    return filteredCountries;
  };

  const filterRegions = (inputRegions, inputText) => {
    var filteredRegions = inputRegions.filter(function (region) {
      return (
        (region.name.toLowerCase().includes(inputText.toLowerCase()) ||
          region.code.toLowerCase().includes(inputText.toLowerCase())) &&
        region.supported != false
      );
    });

    return filteredRegions;
  };

  const generateHandle = setGlobalVariableValue => {
    const first = Variables.firstName;
    const last = Variables.lastName;

    const thisHandle =
      '$' +
      first +
      '-' +
      last[0] +
      last[last.length - 1] +
      String(Math.floor(Math.random() * 1001 + 1));

    return thisHandle;
  };

  const validateHandle = handle => {
    try {
      const thisHandleValid = handle.match(/^\${1}[a-zñáéíóúü0-9_-]{1,20}$/i);

      //TODO: Fix validation regex
      if (thisHandleValid) {
        setHandleValid(true);
        if (handleAvailable) {
          setFormValid(true);
        }
      } else {
        setHandleValid(false);
        setFormValid(false);
      }

      //TODO: Add API call to check availability
      if (true) {
        setHandleAvailable(true);
        if (thisHandleValid) {
          setFormValid(true);
        }
      } else {
        setHandleAvailable(false);
        setformValid(false);
      }
    } catch (error) {}
  };

  const { theme } = props;
  const { navigation } = props;

  const [formValid, setFormValid] = React.useState(true);
  const [handle, setHandle] = React.useState(generateHandle());
  const [handleAvailable, setHandleAvailable] = React.useState(true);
  const [handleValid, setHandleValid] = React.useState(true);

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
              {/* Handle Header */}
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
                {'Handle'}
              </Text>
            </View>
            {/* Center View */}
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 20, zIndex: 1 },
                dimensions.width
              )}
            >
              {/* Handle Header */}
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
                {'Choose your Noba handle!'}
              </Text>
              {/* Handle Explainer */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary-Light-1'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    marginBottom: 20,
                  },
                  dimensions.width
                )}
              >
                {'Your very own Noba identity to get paid by anyone anytime.'}
              </Text>
              {/* Handle Input */}
              <TextInput
                onChangeText={newHandleInputValue => {
                  try {
                    setHandle(newHandleInputValue);
                    validateHandle(newHandleInputValue);
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
                    color: theme.colors['Primary-Light-1'],
                    fontFamily: 'System',
                    fontWeight: '400',
                    height: 42,
                    marginBottom: 5,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
                value={handle}
                editable={true}
                placeholder={'Enter a value...'}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                textContentType={'givenName'}
              />
              {/* Handle Invalid Alert Text */}
              <>
                {handleValid ? null : (
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Red'],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        marginLeft: 15,
                        marginRight: 15,
                      },
                      dimensions.width
                    )}
                  >
                    {'Please enter a valid handle starting with "$"'}
                  </Text>
                )}
              </>
              {/* Handle Exists Alert Text */}
              <>
                {handleAvailable ? null : (
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Red'],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        marginLeft: 15,
                        marginRight: 15,
                      },
                      dimensions.width
                    )}
                  >
                    {'This handle is already in use.'}
                  </Text>
                )}
              </>
            </View>
          </View>
          {/* Button View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 65 },
              dimensions.width
            )}
          >
            {/* Next */}
            <>
              {!formValid ? null : (
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
                      height: 42,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  disabled={false}
                  title={'Next'}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
            {/* Next Invalid */}
            <>
              {formValid ? null : (
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
                      height: 42,
                      textAlign: 'center',
                      zIndex: -1,
                    },
                    dimensions.width
                  )}
                  title={'Next'}
                  disabled={true}
                >
                  {'Sign Up'}
                </Button>
              )}
            </>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingHandleScreen);
