import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as GenerateQR from '../custom-files/GenerateQR';
import * as GenerateToast from '../custom-files/GenerateToast';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openCameraUtil from '../utils/openCamera';
import {
  IconButton,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as Linking from 'expo-linking';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const QRScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const shareQR = inputString => {
    shareFunction.onShare();
  };

  const checkScreenState = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;

  const [qrView, setQrView] = React.useState('scanMe');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Secondary 4'] },
        dimensions.width
      )}
      hasBottomSafeArea={false}
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={false}
    >
      {/* Main Container */}
      <View>
        {/* Sub-Container */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: theme.colors['White'],
              borderRadius: 30,
              marginBottom: 15,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 50,
              paddingBottom: 25,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 25,
            },
            dimensions.width
          )}
        >
          {/* QR Back Button */}
          <IconButton
            style={StyleSheet.applyWidth(
              { left: 30, position: 'absolute', top: 30 },
              dimensions.width
            )}
            size={32}
            icon={'Ionicons/chevron-back-sharp'}
            color={theme.colors['Primary']}
          />
          {/* Top Button Row */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['Secondary 4'],
                borderRadius: 30,
                flexDirection: 'row',
                height: 42,
                justifyContent: 'space-around',
                marginBottom: 25,
                marginLeft: 30,
                marginRight: 30,
                marginTop: 65,
                paddingLeft: 25,
                paddingRight: 25,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  setQrView('scanMe');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Scan Me Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 38,
                    justifyContent: 'center',
                    width: 100,
                  },
                  dimensions.width
                )}
              >
                {/* Scan Me */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'System',
                      fontWeight: '700',
                    },
                    dimensions.width
                  )}
                >
                  {'Scan me'}
                </Text>
                {/* Scan Me BG */}
                <>
                  {!(qrView === 'scanMe') ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['White'],
                          borderBottomWidth: 1,
                          borderColor: theme.colors['Strong'],
                          borderLeftWidth: 1,
                          borderRadius: 30,
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          height: 38,
                          left: 0,
                          position: 'absolute',
                          top: 0,
                          width: 100,
                          zIndex: -1,
                        },
                        dimensions.width
                      )}
                    />
                  )}
                </>
              </View>
            </Touchable>

            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    setQrView('scanCode');
                    await openCameraUtil({});
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* Scan Code Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 38,
                    justifyContent: 'center',
                    width: 100,
                  },
                  dimensions.width
                )}
              >
                {/* Scan Code */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'System',
                      fontWeight: '700',
                    },
                    dimensions.width
                  )}
                >
                  {'Scan code'}
                </Text>
                {/* Scan Code BG */}
                <>
                  {!(qrView === 'scanCode') ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['White'],
                          borderBottomWidth: 1,
                          borderColor: theme.colors['Strong'],
                          borderLeftWidth: 1,
                          borderRadius: 30,
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          height: 38,
                          left: 0,
                          position: 'absolute',
                          top: 0,
                          width: 100,
                          zIndex: -1,
                        },
                        dimensions.width
                      )}
                    />
                  )}
                </>
              </View>
            </Touchable>
          </View>
          {/* Scan Me View */}
          <>
            {!(qrView === 'scanMe') ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', width: '100%' },
                  dimensions.width
                )}
              >
                {/* Name Header */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 30,
                      fontWeight: '700',
                      marginBottom: 5,
                    },
                    dimensions.width
                  )}
                >
                  {Constants['USER_DATA']?.firstName}{' '}
                  {Constants['USER_DATA']?.lastName}
                </Text>
                {/* User Handle */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 20,
                      fontWeight: '700',
                    },
                    dimensions.width
                  )}
                >
                  {'$gal-noba'}
                </Text>
                {/* QR Container */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.colors['White'],
                      borderBottomWidth: 4,
                      borderColor: theme.colors['Secondary-4-Transparent'],
                      borderLeftWidth: 4,
                      borderRadius: 30,
                      borderRightWidth: 4,
                      borderTopWidth: 4,
                      justifyContent: 'center',
                      marginBottom: 20,
                      marginTop: 20,
                      width: 290,
                    },
                    dimensions.width
                  )}
                >
                  {/* User QR */}
                  <Image
                    style={StyleSheet.applyWidth(
                      {
                        height: 230,
                        marginBottom: 10,
                        marginTop: 25,
                        width: 230,
                      },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.QRExample}
                  />
                  {/* Noba Logo */}
                  <Image
                    style={StyleSheet.applyWidth(
                      { height: 24, marginBottom: 25, width: 100 },
                      dimensions.width
                    )}
                    source={Images.NobaLogoDeepGreen}
                    resizeMode={'contain'}
                  />
                </View>
                {/* Action Items */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 25,
                      marginRight: 25,
                      paddingLeft: 80,
                      paddingRight: 80,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* Whatsapp Button */}
                  <IconButton
                    onPress={() => {
                      try {
                        Linking.openURL(
                          'https://wa.me/?text=Hey! Check out this awesome new app that helps you save and invest in dollars! If you use my referral code, you can get $5 in your new Noba account! '
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    size={42}
                    color={theme.colors['Primary']}
                    icon={'FontAwesome/whatsapp'}
                  />
                  {/* Share Button */}
                  <IconButton
                    onPress={() => {
                      try {
                        shareQR(undefined);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    size={42}
                    color={theme.colors['Primary']}
                    icon={'MaterialIcons/ios-share'}
                  />
                </View>
              </View>
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

export default withTheme(QRScreen);
