import React from 'react';
import * as ExampleDataForListsApi from '../apis/ExampleDataForListsApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Checkbox,
  Circle,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const NearbyEventsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [listExists, setListExists] = React.useState(true);
  const [listMissing, setListMissing] = React.useState(false);
  const [menuTab1, setMenuTab1] = React.useState(true);
  const [menuTab2, setMenuTab2] = React.useState(false);
  const [menuTab3, setMenuTab3] = React.useState(false);
  const [noContent, setNoContent] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors.communityWhite },
        dimensions.width
      )}
    >
      {/* Navigation Frame */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            flexGrow: 0,
            flexShrink: 0,
            paddingLeft: 12,
            paddingRight: 12,
          },
          dimensions.width
        )}
      >
        {/* Left Frame */}
        <View
          style={StyleSheet.applyWidth(
            { paddingBottom: 7, paddingTop: 7 },
            dimensions.width
          )}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 1, flexShrink: 0, justifyContent: 'center' },
              dimensions.width
            )}
          >
            <Touchable>
              <Circle bgColor={theme.colors.communityIconBGColor} size={31}>
                <Icon
                  color={theme.colors.communityIconFill}
                  name={'Ionicons/caret-back'}
                  size={18}
                />
              </Circle>
            </Touchable>
          </View>
        </View>
        {/* Middle Frame */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexGrow: 1,
              flexShrink: 0,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 12,
            },
            dimensions.width
          )}
        ></View>
        {/* Right Frame */}
        <View
          style={StyleSheet.applyWidth(
            { paddingBottom: 7, paddingTop: 7 },
            dimensions.width
          )}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 1, flexShrink: 0, justifyContent: 'center' },
              dimensions.width
            )}
          ></View>
        </View>
      </View>
      {/* Headline Only Frame */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexGrow: 0,
            flexShrink: 0,
            paddingBottom: 18,
            paddingLeft: 18,
            paddingRight: 18,
            paddingTop: 18,
          },
          dimensions.width
        )}
      >
        {/* Rubik Headline Style 18/24 Bold */}
        <Text
          accessible={true}
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.communityDarkUI,
              fontFamily: 'Rubik_700Bold',
              fontSize: 24,
              lineHeight: 30,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'Nearby Top 20'}
        </Text>
      </View>
      {/* Scroll Content View */}
      <ScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth({ flexGrow: 1 }, dimensions.width)}
        contentContainerStyle={StyleSheet.applyWidth(
          { flexShrink: 0 },
          dimensions.width
        )}
      >
        <ExampleDataForListsApi.FetchGetSampleDataList10GET>
          {({ loading, error, data, refetchGetSampleDataList10 }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <FlatList
                data={fetchData}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'6E6MdzSK'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <>
                      {/* List Flex Frame */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexGrow: 0, flexShrink: 0 },
                          dimensions.width
                        )}
                      >
                        {/* Touchable Flex Frame */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexGrow: 0,
                              flexShrink: 0,
                              marginBottom: 12,
                              marginTop: 12,
                            },
                            dimensions.width
                          )}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                undefined;
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            {/* Record Frame */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    theme.colors.communityIconBGColor,
                                  borderRadius: 18,
                                  flexDirection: 'row',
                                  flexGrow: 1,
                                  flexShrink: 0,
                                  marginLeft: 12,
                                  marginRight: 12,
                                  paddingBottom: 18,
                                  paddingLeft: 12,
                                  paddingRight: 12,
                                  paddingTop: 18,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Left Side Grow */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    flexGrow: 1,
                                    flexShrink: 0,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Circle Frame */}
                                <View>
                                  <Circle
                                    bgColor={theme.colors.communityWhite}
                                    size={44}
                                  >
                                    {/* Icon Flex Frame */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { flexGrow: 0, flexShrink: 0 },
                                        dimensions.width
                                      )}
                                    >
                                      <Icon
                                        color={theme.colors.communityTrueOption}
                                        name={'MaterialIcons/lunch-dining'}
                                        size={40}
                                      />
                                    </View>
                                  </Circle>
                                </View>
                                {/* Content Frame */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexGrow: 1,
                                      flexShrink: 0,
                                      marginLeft: 6,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Rubik Headline Style 18/24 Bold */}
                                  <Text
                                    accessible={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.communityDarkUI,
                                        fontFamily: 'Rubik_700Bold',
                                        fontSize: 12,
                                        lineHeight: 18,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Promenade Luncheon'}
                                  </Text>
                                  {/* Data Point */}
                                  <Text
                                    accessible={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.communityTrueOption,
                                        fontFamily: 'Rubik_400Regular',
                                        fontSize: 13,
                                        lineHeight: 19,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Irvine, California'}
                                  </Text>
                                </View>
                              </View>
                              {/* Right Side Shrink */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    justifyContent: 'center',
                                    marginLeft: 12,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setCheckboxValue(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  checkedIcon={
                                    'MaterialCommunityIcons/checkbox-marked'
                                  }
                                  color={theme.colors.communityHighlightBlue}
                                  status={checkboxValue}
                                  uncheckedColor={
                                    theme.colors.communityTrueOption
                                  }
                                  uncheckedIcon={
                                    'MaterialCommunityIcons/checkbox-blank-outline'
                                  }
                                />
                              </View>
                            </View>
                          </Touchable>
                        </View>
                      </View>
                    </>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={StyleSheet.applyWidth(
                  { flex: 1 },
                  dimensions.width
                )}
              />
            );
          }}
        </ExampleDataForListsApi.FetchGetSampleDataList10GET>
      </ScrollView>
      {/* Footer Frame */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: theme.colors.communityWhite,
            flexDirection: 'row',
          },
          dimensions.width
        )}
      >
        {/* Left Side */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexGrow: 1,
              flexShrink: 0,
              paddingBottom: 18,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 18,
            },
            dimensions.width
          )}
        >
          {/* Data Point */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.communityTrueOption,
                fontFamily: 'Rubik_400Regular',
                fontSize: 11,
                lineHeight: 17,
                paddingBottom: 3,
              },
              dimensions.width
            )}
          >
            {'Adding events in'}
          </Text>
          {/* Rubik Headline Style 18/24 Bold */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.communityDarkUI,
                fontFamily: 'Rubik_700Bold',
                fontSize: 12,
                lineHeight: 18,
              },
              dimensions.width
            )}
          >
            {'Irvine, Costa'}
          </Text>
        </View>
        {/* Right Side */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexGrow: 0,
              flexShrink: 0,
              justifyContent: 'center',
              paddingLeft: 12,
              paddingRight: 18,
            },
            dimensions.width
          )}
        >
          {/* Flex Frame for Touchable */}
          <View>
            <Touchable>
              {/* Button Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.communityTertiaryGreen,
                    borderRadius: 58,
                    paddingBottom: 12,
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                {/* Button Label */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.communityWhite,
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 12,
                      lineHeight: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Continue'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(NearbyEventsScreen);
