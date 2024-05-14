import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as DemoApi from '../apis/DemoApi.js';
import * as CustomCode from '../custom-files/CustomCode';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, SimpleStyleFlatList, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const BlankScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <DemoApi.FetchListGET limit={5}>
        {({ loading, error, data, refetchList }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <SimpleStyleFlatList
              data={fetchData}
              horizontal={false}
              inverted={false}
              keyExtractor={(listData, index) =>
                listData?.id ?? listData?.uuid ?? index.toString()
              }
              keyboardShouldPersistTaps={'never'}
              listKey={'M4MbCilV'}
              nestedScrollEnabled={false}
              numColumns={1}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => {
                const listData = item;
                return (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      dimensions.width
                    )}
                  >
                    {listData?.placeOfBirth}
                  </Text>
                );
              }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
            />
          );
        }}
      </DemoApi.FetchListGET>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
