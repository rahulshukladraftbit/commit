import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as GenerateToast from '../custom-files/GenerateToast';
import getContacts from '../global-functions/getContacts';
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
import { Text, View, useWindowDimensions } from 'react-native';

const ContactsPermissionsScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

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
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
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
                paddingLeft: 15,
                paddingRight: 15,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Back Button */}
            <IconButton
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { left: 15, position: 'absolute', top: -5 },
                dimensions.width
              )}
              size={32}
              icon={'Ionicons/chevron-back-sharp'}
              color={theme.colors['Primary']}
            />
          </View>
          {/* Top View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                alignSelf: 'center',
                paddingLeft: 15,
                paddingRight: 15,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* FaceID Icon */}
            <Icon
              style={StyleSheet.applyWidth({ marginTop: 65 }, dimensions.width)}
              color={theme.colors['Primary']}
              size={120}
              name={'AntDesign/contacts'}
            />
          </View>
        </View>
        {/* Bottom View */}
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
          {/* Turn on contacts */}
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
            {'Access your contacts?'}
          </Text>
          {/* Why contacts */}
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
              'Providing access to your contacts list will make it easy to send and request money from your friends, family, and colleagues.'
            }
          </Text>
          {/* Allow Button */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  setGlobalVariableValue({
                    key: 'USER_CONTACTS_REQUESTED',
                    value: true,
                  });
                  const granted = await getContacts(
                    Variables,
                    setGlobalVariableValue
                  );
                  if (!granted) {
                    return;
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
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
                marginBottom: 20,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={'Allow'}
          >
            {'Sign Up'}
          </Button>
          {/* Not now Button */}
          <Button
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'USER_CONTACTS_REQUESTED',
                  value: true,
                });
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderBottomWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0)',
                borderLeftWidth: 1,
                borderRadius: 100,
                borderRightWidth: 1,
                borderTopWidth: 1,
                color: theme.colors['Primary'],
                fontFamily: 'System',
                fontWeight: '700',
                height: 42,
                textAlign: 'center',
                zIndex: -1,
              },
              dimensions.width
            )}
            disabled={false}
            title={'Not now'}
          >
            {'Sign Up'}
          </Button>
        </View>
      </View>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(ContactsPermissionsScreen);
