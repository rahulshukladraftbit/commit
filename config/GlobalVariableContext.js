import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeviceVariables = {
  AUTHORIZATION_HEADER: 'some AUTHORIZATION_HEADER',
  BASE_URL: 'some BASE_URL',
  BIOMETRIC_PERMISSION: true,
  BUYING_POWER: 'some BUYING_POWER',
  CASH_BALANCE: 'some CASH_BALANCE',
  CREDIT_BALANCE: 'some CREDIT_BALANCE',
  CRYPTOCURRENCY_LIST: [
    {
      name: 'some name',
      type: 'some type',
      ticker: 'some ticker',
      iconPath: 'some iconPath',
      provider: 'some provider',
      precision: 123,
    },
  ],
  INVESTMENT_BALANCE: 'some INVESTMENT_BALANCE',
  LANGUAGE: 'some LANGUAGE',
  NOTIFICATIONS_PERMISSIONS: true,
  TOAST_TEXT: 'some TOAST_TEXT',
  TOAST_TYPE: 'some TOAST_TYPE',
  TOAST_VISIBLE: true,
  USER_BALANCES: [
    {
      name: 'some name',
      asset: 'some asset',
      balance: 'some balance',
      accountID: 'some accountID',
      lastUpdate: 123,
      accountType: 'some accountType',
    },
  ],
  USER_CONTACTS: [
    {
      id: 'some id',
      name: 'some name',
      image: { uri: 'some uri', width: 123, height: 123 },
      emails: [{ id: 'some id', email: 'some email', label: 'some label' }],
      company: 'some company',
      birthday: { day: 123, year: 123, month: 123, format: 'some format' },
      jobTitle: 'some jobTitle',
      lastName: 'some lastName',
      addresses: [
        {
          id: 'some id',
          city: 'some city',
          label: 'some label',
          region: 'some region',
          street: 'some street',
          country: 'some country',
          postalCode: 'some postalCode',
          isoCountryCode: 'some isoCountryCode',
        },
      ],
      firstName: 'some firstName',
      contactType: 'some contactType',
      phoneNumbers: [
        {
          id: 'some id',
          label: 'some label',
          digits: 'some digit',
          number: 'some number',
          countryCode: 'some countryCode',
        },
      ],
      imageAvailable: true,
    },
  ],
  USER_CONTACTS_PERMISSION: true,
  USER_CONTACTS_REQUESTED: true,
  USER_DATA: {
    _id: 'some _id',
    email: 'some email',
    phone: 'some phone',
    status: 'some status',
    address: {},
    lastName: 'some lastName',
    firstName: 'some firstName',
    dateOfBirth: 'some dateOfBirth',
    walletStatus: 'some walletStatus',
    cryptoWallets: [
      {
        address: 'some address',
        chainType: 'some chainType',
        walletName: 'some walletName',
        isEVMCompatible: true,
      },
    ],
    paymentMethods: [
      {
        name: 'some name',
        type: 'some type',
        achData: {
          accountMask: 'some accountMask',
          accountType: 'some accountType',
        },
        cardData: {
          scheme: 'some scheme',
          cardType: 'some cardType',
          last4Digits: 'some last4Digit',
          first6Digits: 'some first6Digit',
        },
        imageUri: 'some imageUri',
        paymentToken: 'some paymentToken',
      },
    ],
    kycVerificationData: {
      updatedTimestamp: 123,
      kycVerificationStatus: 'some kycVerificationStatus',
    },
    paymentMethodStatus: 'some paymentMethodStatus',
    documentVerificationData: {
      updatedTimestamp: 123,
      documentVerificationStatus: 'some documentVerificationStatus',
      documentVerificationErrorReason: 'some documentVerificationErrorReason',
    },
  },
  X_NOBA_API_KEY: 'some X_NOBA_API_KEY',
};
const AppVariables = {
  MyBalance: 123,
  addressCity: 'some addressCity',
  addressCountry: 'some addressCountry',
  addressCountryISOCode: 'some addressCountryISOCode',
  addressLine1: 'some addressLine1',
  addressLine2: 'some addressLine2',
  addressPostalCode: 'some addressPostalCode',
  addressRegionCode: 'some addressRegionCode',
  cryptoCurrencyCode: 'some cryptoCurrencyCode',
  cryptoCurrencyIcon: 'some cryptoCurrencyIcon',
  cryptoCurrencyName: 'some cryptoCurrencyName',
  cryptoCurrencyNetwork: 'some cryptoCurrencyNetwork',
  dateOfBirth: 'some dateOfBirth',
  destinationWallet: {
    status: 'some status',
    address: 'some address',
    chainType: 'some chainType',
    walletName: 'some walletName',
    isEVMCompatible: true,
  },
  emailAddress: 'some emailAddress',
  fiatCurrencyCode: 'some fiatCurrencyCode',
  firstName: 'some firstName',
  fixedAmount: 123,
  fixedSide: 'some fixedSide',
  idIssuingCountryISOCode: 'some idIssuingCountryISOCode',
  lastName: 'some lastName',
  orderType: 'some orderType',
  paymentMethod: {
    name: 'some name',
    type: 'some type',
    status: 'some status',
    achData: {
      accountMask: 'some accountMask',
      accountType: 'some accountType',
    },
    cardData: {
      cardType: 'some cardType',
      last4Digits: 'some last4Digit',
      first6Digits: 'some first6Digit',
    },
    paymentToken: 'some paymentToken',
  },
  phoneNumber: 'some phoneNumber',
  quoteIntervalID: 'some quoteIntervalID',
  selectedCrypto: {
    name: 'some name',
    type: 'some type',
    ticker: 'some ticker',
    iconPath: 'some iconPath',
    provider: 'some provider',
    precision: 123,
  },
  sessionKey: 'some sessionKey',
  taxCountryISOCode: 'some taxCountryISOCode',
  taxID: 'some taxID',
  toastIntervalID: 'some toastIntervalID',
  updateInterval: true,
  userHandle: 'some userHandle',
};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const entries = await AsyncStorage.multiGet(Object.keys(DeviceVariables));

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key, value]) => [
      key,
      value ? tryParseJson(value) : DeviceVariables[key],
    ]);

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case 'RESET':
        return { values: State.defaultValues, __loaded: true };
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true };
      case 'UPDATE':
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload });
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
