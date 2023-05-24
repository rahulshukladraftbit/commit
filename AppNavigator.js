import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/DraftbitTheme.js';
import LinkingConfiguration from './LinkingConfiguration.js';

import AccountHistoryScreen from './screens/AccountHistoryScreen';
import AccountLimitsScreen from './screens/AccountLimitsScreen';
import AccountOrderHistoryDetailedScreen from './screens/AccountOrderHistoryDetailedScreen';
import AccountRedeemPromoScreen from './screens/AccountRedeemPromoScreen';
import AuthenticatedPrimaryScreen from './screens/AuthenticatedPrimaryScreen';
import CardsManageScreen from './screens/CardsManageScreen';
import ContactsPermissionsScreen from './screens/ContactsPermissionsScreen';
import CryptoAboutScreen from './screens/CryptoAboutScreen';
import CryptoBuyScreen from './screens/CryptoBuyScreen';
import CryptoOrderSubmittedScreen from './screens/CryptoOrderSubmittedScreen';
import CryptoOrderSummaryScreen from './screens/CryptoOrderSummaryScreen';
import DepositAmountScreen from './screens/DepositAmountScreen';
import DepositOrderSubmittedScreen from './screens/DepositOrderSubmittedScreen';
import DepositOrderSummaryScreen from './screens/DepositOrderSummaryScreen';
import DepositWireCOPScreen from './screens/DepositWireCOPScreen';
import DepositWireUSDScreen from './screens/DepositWireUSDScreen';
import IdentityVerificationAu10tixScreen from './screens/IdentityVerificationAu10tixScreen';
import IdentityVerificationTaxIDScreen from './screens/IdentityVerificationTaxIDScreen';
import LoginEmailOTPScreen from './screens/LoginEmailOTPScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardingAddressScreen from './screens/OnboardingAddressScreen';
import OnboardingDOBScreen from './screens/OnboardingDOBScreen';
import OnboardingHandleScreen from './screens/OnboardingHandleScreen';
import OnboardingIncompleteScreen from './screens/OnboardingIncompleteScreen';
import OnboardingNameScreen from './screens/OnboardingNameScreen';
import OnboardingPhoneVerificationOTPScreen from './screens/OnboardingPhoneVerificationOTPScreen';
import OnboardingUSSSNScreen from './screens/OnboardingUSSSNScreen';
import PaymentsAddCardScreen from './screens/PaymentsAddCardScreen';
import PaymentsCardSelectScreen from './screens/PaymentsCardSelectScreen';
import PaymentsManageScreen from './screens/PaymentsManageScreen';
import PaymentsMethodTypeScreen from './screens/PaymentsMethodTypeScreen';
import PaymentsSelectScreen from './screens/PaymentsSelectScreen';
import Peer2PeerContactsScreen from './screens/Peer2PeerContactsScreen';
import QRScreen from './screens/QRScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131A2A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#FFF',
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFF' }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}
export default function RootAppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName="LoadingScreen"
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="QRScreen"
          component={QRScreen}
          options={{
            title: 'QR Screen',
          }}
        />
        <Stack.Screen
          name="LoginEmailOTPScreen"
          component={LoginEmailOTPScreen}
          options={{
            title: 'Login Email OTP',
          }}
        />
        <Stack.Screen
          name="AuthenticatedPrimaryScreen"
          component={AuthenticatedPrimaryScreen}
          options={{
            title: 'AuthenticatedPrimary',
          }}
        />
        <Stack.Screen
          name="CryptoAboutScreen"
          component={CryptoAboutScreen}
          options={{
            title: 'Crypto About',
          }}
        />
        <Stack.Screen
          name="PaymentsMethodTypeScreen"
          component={PaymentsMethodTypeScreen}
          options={{
            title: 'Payments Method Type',
          }}
        />
        <Stack.Screen
          name="PaymentsAddCardScreen"
          component={PaymentsAddCardScreen}
          options={{
            title: 'Payments Add Card',
          }}
        />
        <Stack.Screen
          name="OnboardingNameScreen"
          component={OnboardingNameScreen}
          options={{
            title: 'Onboarding Name',
          }}
        />
        <Stack.Screen
          name="OnboardingAddressScreen"
          component={OnboardingAddressScreen}
          options={{
            title: 'Onboarding Address',
          }}
        />
        <Stack.Screen
          name="OnboardingDOBScreen"
          component={OnboardingDOBScreen}
          options={{
            title: 'Onboarding DOB',
          }}
        />
        <Stack.Screen
          name="IdentityVerificationTaxIDScreen"
          component={IdentityVerificationTaxIDScreen}
          options={{
            title: 'Identity Verification Tax ID',
          }}
        />
        <Stack.Screen
          name="OnboardingPhoneVerificationOTPScreen"
          component={OnboardingPhoneVerificationOTPScreen}
          options={{
            title: 'Onboarding Phone Verification OTP',
          }}
        />
        <Stack.Screen
          name="IdentityVerificationAu10tixScreen"
          component={IdentityVerificationAu10tixScreen}
          options={{
            title: 'Identity Verification Au10tix',
          }}
        />
        <Stack.Screen
          name="AccountLimitsScreen"
          component={AccountLimitsScreen}
          options={{
            title: 'Account Limits',
          }}
        />
        <Stack.Screen
          name="CardsManageScreen"
          component={CardsManageScreen}
          options={{
            title: 'Cards Manage',
          }}
        />
        <Stack.Screen
          name="DepositWireCOPScreen"
          component={DepositWireCOPScreen}
          options={{
            title: 'Deposit Wire COP',
          }}
        />
        <Stack.Screen
          name="DepositWireUSDScreen"
          component={DepositWireUSDScreen}
          options={{
            title: 'Deposit Wire USD',
          }}
        />
        <Stack.Screen
          name="PaymentsCardSelectScreen"
          component={PaymentsCardSelectScreen}
          options={{
            title: 'Payments Card Select',
          }}
        />
        <Stack.Screen
          name="CryptoBuyScreen"
          component={CryptoBuyScreen}
          options={{
            title: 'Crypto Buy',
          }}
        />
        <Stack.Screen
          name="CryptoOrderSubmittedScreen"
          component={CryptoOrderSubmittedScreen}
          options={{
            title: 'Crypto Order Submitted',
          }}
        />
        <Stack.Screen
          name="Peer2PeerContactsScreen"
          component={Peer2PeerContactsScreen}
          options={{
            title: 'Peer2Peer Contacts',
          }}
        />
        <Stack.Screen
          name="ContactsPermissionsScreen"
          component={ContactsPermissionsScreen}
          options={{
            title: 'Contacts Permissions',
          }}
        />
        <Stack.Screen
          name="DepositAmountScreen"
          component={DepositAmountScreen}
          options={{
            title: 'Deposit Amount',
          }}
        />
        <Stack.Screen
          name="CryptoOrderSummaryScreen"
          component={CryptoOrderSummaryScreen}
          options={{
            title: 'Crypto Order Summary',
          }}
        />
        <Stack.Screen
          name="OnboardingIncompleteScreen"
          component={OnboardingIncompleteScreen}
          options={{
            title: 'Onboarding Incomplete',
          }}
        />
        <Stack.Screen
          name="DepositOrderSummaryScreen"
          component={DepositOrderSummaryScreen}
          options={{
            title: 'Deposit Order Summary',
          }}
        />
        <Stack.Screen
          name="DepositOrderSubmittedScreen"
          component={DepositOrderSubmittedScreen}
          options={{
            title: 'Deposit Order Submitted',
          }}
        />
        <Stack.Screen
          name="AccountHistoryScreen"
          component={AccountHistoryScreen}
          options={{
            title: 'Account History',
          }}
        />
        <Stack.Screen
          name="AccountOrderHistoryDetailedScreen"
          component={AccountOrderHistoryDetailedScreen}
          options={{
            title: 'Account Order History Detailed',
          }}
        />
        <Stack.Screen
          name="AccountRedeemPromoScreen"
          component={AccountRedeemPromoScreen}
          options={{
            title: 'Account Redeem Promo',
          }}
        />
        <Stack.Screen
          name="PaymentsSelectScreen"
          component={PaymentsSelectScreen}
          options={{
            title: 'Payments Select',
          }}
        />
        <Stack.Screen
          name="PaymentsManageScreen"
          component={PaymentsManageScreen}
          options={{
            title: 'Payments Manage',
          }}
        />
        <Stack.Screen
          name="OnboardingUSSSNScreen"
          component={OnboardingUSSSNScreen}
          options={{
            title: 'Onboarding US SSN',
          }}
        />
        <Stack.Screen
          name="OnboardingHandleScreen"
          component={OnboardingHandleScreen}
          options={{
            title: 'Onboarding Handle',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
