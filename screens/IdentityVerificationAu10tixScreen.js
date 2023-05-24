import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import * as verificationWebView from '../custom-files/verificationWebView';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const IdentityVerificationAu10tixScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const getVerificationLink = async (
    sessionKey,
    requestBack,
    requestSelfie,
    requestPOA
  ) => {
    try {
      const options = {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: Variables.AUTHORIZATION_HEADER,
          'x-noba-api-key': Variables.X_NOBA_API_KEY,
        }),
      };

      const url = `https://api-dev.noba.com/v1/verify/document/url?sessionKey=${sessionKey}&requestBack=${requestBack}&requestSelfie=${requestSelfie}&requestPOA=${requestPOA}`;

      //Get User Limits
      const verificationJSON = await fetch(url, options).then(response =>
        response.json()
      );

      const link = verificationJSON.url;

      setVerificationLink(link);
    } catch (error) {}
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }

        const valuekNwZEXaU = props.route?.params?.twoSided ?? '';
        setTwoSided(valuekNwZEXaU);
        const twoSided = valuekNwZEXaU;
        await getVerificationLink('test', twoSided, true, false);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [twoSided, setTwoSided] = React.useState(true);
  const [verificationLink, setVerificationLink] = React.useState('');
  const [verificationLoading, setVerificationLoading] = React.useState(true);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: 'rgba(0, 0, 0, 0)' },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* Au10tix Webview Custom Code */}
      <Utils.CustomCodeErrorBoundary>
        <verificationWebView.verificationWebView
          verificationLink={verificationLink}
          navigation={props.navigation}
          sessionKey={'test'}
          requestBack={true}
          requestPOA={false}
          requestSelfie={true}
          setLoading={setVerificationLoading}
        />
      </Utils.CustomCodeErrorBoundary>
      {/* Temp Loading View */}
      <>
        {!verificationLoading ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                bottom: 0,
                height: '100%',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Primary'],
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '700',
                  paddingBottom: 20,
                },
                dimensions.width
              )}
            >
              {'Verification loading'}
            </Text>
            <ActivityIndicator
              style={StyleSheet.applyWidth(
                { height: 80, width: 80 },
                dimensions.width
              )}
              animating={true}
              hidesWhenStopped={true}
              color={theme.colors['Secondary']}
              size={'large'}
            />
          </View>
        )}
      </>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(IdentityVerificationAu10tixScreen);
