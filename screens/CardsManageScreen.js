import React from 'react';
import * as NobaServerApi from '../apis/NobaServerApi.js';
import Images from '../config/Images';
import * as GenerateToast from '../custom-files/GenerateToast';
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
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const CardsManageScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

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
        {/* Fetch User Date */}
        <NobaServerApi.FetchConsumerGetDataGET>
          {({ loading, error, data, refetchConsumerGetData }) => {
            const fetchUserDateData = data;
            if (!fetchUserDateData || loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return (
                <Text style={{ textAlign: 'center' }}>
                  There was a problem fetching this data
                </Text>
              );
            }

            return (
              <>
                {/* Center Container */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: '100%' },
                    dimensions.width
                  )}
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
                    {/* Manage card */}
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
                      {'Card settings'}
                    </Text>
                  </View>
                  {/* Scroll Manage Card View */}
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    bounces={true}
                  >
                    {/* Manage Card Submenu Buttons */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 20 },
                        dimensions.width
                      )}
                    >
                      {/* Touchable Show Details */}
                      <Touchable>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              height: 70,
                              justifyContent: 'space-between',
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row' },
                              dimensions.width
                            )}
                          >
                            <Icon
                              size={24}
                              color={theme.colors['Primary']}
                              name={'MaterialIcons/calendar-today'}
                            />
                            {/* Current cycle */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 18,
                                  fontWeight: '400',
                                  marginLeft: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {'Current cycle'}
                            </Text>
                          </View>
                        </View>
                      </Touchable>
                      {/* Touchable Freeze Card */}
                      <Touchable>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              height: 70,
                              justifyContent: 'space-between',
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row' },
                              dimensions.width
                            )}
                          >
                            <Icon
                              size={24}
                              color={theme.colors['Primary']}
                              name={'Ionicons/document-text-outline'}
                            />
                            {/* Statements */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 18,
                                  fontWeight: '400',
                                  marginLeft: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {'Statements'}
                            </Text>
                          </View>
                        </View>
                      </Touchable>
                      {/* Touchable Manage Card */}
                      <Touchable>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              height: 70,
                              justifyContent: 'space-between',
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row' },
                              dimensions.width
                            )}
                          >
                            <Icon
                              size={24}
                              color={theme.colors['Primary']}
                              name={'MaterialIcons/format-list-bulleted'}
                            />
                            {/* Legal Terms */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Primary'],
                                  fontFamily: 'System',
                                  fontSize: 18,
                                  fontWeight: '400',
                                  marginLeft: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {'Legal terms'}
                            </Text>
                          </View>
                        </View>
                      </Touchable>
                    </View>
                  </ScrollView>
                </View>
              </>
            );
          }}
        </NobaServerApi.FetchConsumerGetDataGET>
      </KeyboardAvoidingView>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(CardsManageScreen);
