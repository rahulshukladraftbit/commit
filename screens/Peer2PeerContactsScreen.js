import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
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
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

const Peer2PeerContactsScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;

  const [searchInput, setSearchInput] = React.useState('');
  const [userContacts, setUserContacts] = React.useState([
    {
      id: '177C371E-701D-42F8-A03B-C61CA31627F6',
      name: 'Kate Bell',
      image: {
        uri: 'file:///var/mobile/Containers/Data/Application/[...]thumbnailImageData.png',
        width: 320,
        height: 320,
      },
      emails: [
        {
          id: '93D6F4AF-5C10-43FC-8405-A8BB02F2F9F7',
          email: 'kate-bell@mac.com',
          label: 'work',
        },
      ],
      company: 'CreativeConsulting',
      birthday: { day: 20, year: 1978, month: 0, format: 'gregorian' },
      jobTitle: 'Producer',
      lastName: 'Bell',
      addresses: [
        {
          id: '8A2633AE-0400-48A4-AD83-49DBCE07CEAF',
          city: 'Hillsborough',
          label: 'work',
          region: 'CA',
          street: '165 Davis Street',
          country: '',
          postalCode: '94010',
          isoCountryCode: 'us',
        },
      ],
      firstName: 'Kate',
      contactType: 'person',
      phoneNumbers: [
        {
          id: 'EF48385D-28C2-48DE-AAB3-A81BC5F16981',
          label: 'mobile',
          digits: '5555648583',
          number: '(555)564-8583',
          countryCode: 'us',
        },
      ],
      imageAvailable: true,
    },
  ]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAvoidingView
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
        enabled={true}
        behavior={'padding'}
      >
        {/* Center View */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['White'],
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              height: '100%',
              justifyContent: 'space-between',
              paddingBottom: 65,
              paddingLeft: 15,
              paddingRight: 15,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Top View */}
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
              {/* Header */}
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
                {'Contacts'}
              </Text>
            </View>
            {/* Search View */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              {/* Contacts Input */}
              <TextInput
                onChangeText={newContactsInputValue => {
                  try {
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
                    marginBottom: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
                placeholder={'Name, $username, email, phone'}
                editable={true}
                placeholderTextColor={theme.colors['Primary-Light-1']}
                returnKeyType={'done'}
                textContentType={'countryName'}
                autoFocus={true}
              />
              {/* Search Icon */}
              <Icon
                style={StyleSheet.applyWidth(
                  { position: 'absolute', right: 15, top: 11, zIndex: -1 },
                  dimensions.width
                )}
                size={20}
                color={theme.colors['Primary-Light-1']}
                name={'MaterialIcons/search'}
              />
            </View>
            {/* Contact List View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['White'],
                  borderColor: theme.colors['Primary-Light-1'],
                  marginBottom: 20,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 10,
                  width: '100%',
                  zIndex: 1,
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Primary'],
                    fontFamily: 'System',
                    fontWeight: '700',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                {'Phone contacts'}
              </Text>

              <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
                {/* Contact List */}
                <FlatList
                  data={Constants['USER_CONTACTS']}
                  listKey={'6skylQUP'}
                  keyExtractor={contactListData => 'id'}
                  renderItem={({ item }) => {
                    const contactListData = item;
                    return (
                      <>
                        {/* Touchable Contact Option */}
                        <Touchable
                          onPress={() => {
                            try {
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          {/* Contact Option View */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 70,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Contact Image */}
                            <>
                              {!contactListData?.imageAvailable ? null : (
                                <Image
                                  style={StyleSheet.applyWidth(
                                    {
                                      borderRadius: 100,
                                      height: 50,
                                      width: 50,
                                    },
                                    dimensions.width
                                  )}
                                  resizeMode={'cover'}
                                  source={{
                                    uri: `${contactListData?.image?.uri}`,
                                  }}
                                />
                              )}
                            </>
                            {/* Contact No Image */}
                            <>
                              {contactListData?.imageAvailable ? null : (
                                <Image
                                  style={StyleSheet.applyWidth(
                                    { height: 50, width: 50 },
                                    dimensions.width
                                  )}
                                  source={Images.Face}
                                  resizeMode={'contain'}
                                />
                              )}
                            </>
                            {/* Contact Name */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.strong,
                                  fontFamily: 'System',
                                  fontWeight: '600',
                                  marginLeft: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {contactListData?.name}
                            </Text>
                          </View>
                        </Touchable>
                      </>
                    );
                  }}
                  contentContainerStyle={StyleSheet.applyWidth(
                    { flex: 1 },
                    dimensions.width
                  )}
                  numColumns={1}
                />
              </ScrollView>
            </View>
          </View>
          {/* Access Contacts Button */}
          <>
            {Constants['USER_CONTACTS_PERMISSION'] ? null : (
              <Button
                onPress={() => {
                  const handler = async () => {
                    try {
                      const userContacts = await getContacts(
                        Variables,
                        setGlobalVariableValue
                      );
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
                    borderLeftWidth: 1,
                    borderRadius: 100,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors['Secondary'],
                    fontFamily: 'System',
                    fontWeight: '700',
                    height: 42,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Access contacts'}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
        </View>
      </KeyboardAvoidingView>
      {/* Toast Component */}
      <Utils.CustomCodeErrorBoundary>
        <GenerateToast.generateToast />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(Peer2PeerContactsScreen);
