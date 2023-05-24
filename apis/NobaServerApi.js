import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const assetsCheckBINGETStatusAndText = (Constants, { bin }) =>
  fetch(`https://api-dev.noba.com/v1/creditcardmetadata/${bin ?? ''}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const assetsCheckBINGET = (Constants, { bin }) =>
  assetsCheckBINGETStatusAndText(Constants, { bin }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useAssetsCheckBINGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['asset', args], () => assetsCheckBINGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['assets']),
  });
};

export const FetchAssetsCheckBINGET = ({
  children,
  onData = () => {},
  refetchInterval,
  bin,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useAssetsCheckBINGET(
    { bin },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchAssetsCheckBIN: refetch });
};

export const assetsGetCountrySubdivisionsGETStatusAndText = (
  Constants,
  { countryCode }
) =>
  fetch(`https://api-dev.noba.com/v1/countries/${countryCode ?? ''}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const assetsGetCountrySubdivisionsGET = (Constants, { countryCode }) =>
  assetsGetCountrySubdivisionsGETStatusAndText(Constants, { countryCode }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useAssetsGetCountrySubdivisionsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['asset', args],
    () => assetsGetCountrySubdivisionsGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['assets']),
    }
  );
};

export const FetchAssetsGetCountrySubdivisionsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  countryCode,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useAssetsGetCountrySubdivisionsGET(
    { countryCode },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchAssetsGetCountrySubdivisions: refetch,
  });
};

export const assetsSupportedCountriesGETStatusAndText = (
  Constants,
  { includeSubdivisions }
) =>
  fetch(
    `https://api-dev.noba.com/v1/countries?includeSubdivisions=${
      includeSubdivisions ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const assetsSupportedCountriesGET = (
  Constants,
  { includeSubdivisions }
) =>
  assetsSupportedCountriesGETStatusAndText(Constants, {
    includeSubdivisions,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useAssetsSupportedCountriesGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['asset', args],
    () => assetsSupportedCountriesGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['assets']),
    }
  );
};

export const FetchAssetsSupportedCountriesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  includeSubdivisions,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useAssetsSupportedCountriesGET(
    { includeSubdivisions },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchAssetsSupportedCountries: refetch,
  });
};

export const assetsSupportedCryptocurrenciesGETStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/cryptocurrencies`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const assetsSupportedCryptocurrenciesGET = Constants =>
  assetsSupportedCryptocurrenciesGETStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useAssetsSupportedCryptocurrenciesGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['assets', args],
    () => assetsSupportedCryptocurrenciesGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchAssetsSupportedCryptocurrenciesGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useAssetsSupportedCryptocurrenciesGET({}, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchAssetsSupportedCryptocurrencies: refetch,
  });
};

export const authenticationRequestOTPPOSTStatusAndText = (
  Constants,
  { autoCreate, emailOrPhone, identityType }
) =>
  fetch(`https://api-dev.noba.com/v1/auth/login`, {
    body: JSON.stringify({
      emailOrPhone: emailOrPhone,
      identityType: identityType,
      autoCreate: autoCreate,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const authenticationRequestOTPPOST = (
  Constants,
  { autoCreate, emailOrPhone, identityType }
) =>
  authenticationRequestOTPPOSTStatusAndText(Constants, {
    autoCreate,
    emailOrPhone,
    identityType,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useAuthenticationRequestOTPPOST = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['authentication', args],
    () => authenticationRequestOTPPOST(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['authentications']),
    }
  );
};

export const FetchAuthenticationRequestOTPPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  autoCreate,
  emailOrPhone,
  identityType,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useAuthenticationRequestOTPPOST(
    { autoCreate, emailOrPhone, identityType },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchAuthenticationRequestOTP: refetch,
  });
};

export const authenticationVerifyOTPPOSTStatusAndText = (
  Constants,
  { emailOrPhone, identityType, otp }
) =>
  fetch(`https://api-dev.noba.com/v1/auth/verifyotp`, {
    body: JSON.stringify({
      emailOrPhone: emailOrPhone,
      identityType: identityType,
      otp: otp,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const authenticationVerifyOTPPOST = (
  Constants,
  { emailOrPhone, identityType, otp }
) =>
  authenticationVerifyOTPPOSTStatusAndText(Constants, {
    emailOrPhone,
    identityType,
    otp,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useAuthenticationVerifyOTPPOST = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['authentication', args],
    () => authenticationVerifyOTPPOST(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['authentications']),
    }
  );
};

export const FetchAuthenticationVerifyOTPPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  emailOrPhone,
  identityType,
  otp,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useAuthenticationVerifyOTPPOST(
    { emailOrPhone, identityType, otp },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchAuthenticationVerifyOTP: refetch,
  });
};

export const consumerAddPaymentMethodPOSTStatusAndText = (
  Constants,
  { cardName, cardNumber, cvv, expiryMonth, expiryYear }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers/paymentmethods`, {
    body: JSON.stringify({
      cardName: cardName,
      cardNumber: cardNumber,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
      cvv: cvv,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerAddPaymentMethodPOST = (
  Constants,
  { cardName, cardNumber, cvv, expiryMonth, expiryYear }
) =>
  consumerAddPaymentMethodPOSTStatusAndText(Constants, {
    cardName,
    cardNumber,
    cvv,
    expiryMonth,
    expiryYear,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useConsumerAddPaymentMethodPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      consumerAddPaymentMethodPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const FetchConsumerAddPaymentMethodPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  cardName,
  cardNumber,
  cvv,
  expiryMonth,
  expiryYear,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useConsumerAddPaymentMethodPOST(
    { cardName, cardNumber, cvv, expiryMonth, expiryYear },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumerAddPaymentMethod: refetch,
  });
};

export const consumerAddWalletPOSTStatusAndText = (
  Constants,
  { address, chainType, isEVMCompatible, walletName }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers/wallets`, {
    body: JSON.stringify({
      walletName: walletName,
      address: address,
      chainType: chainType,
      isEVMCompatible: isEVMCompatible,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerAddWalletPOST = (
  Constants,
  { address, chainType, isEVMCompatible, walletName }
) =>
  consumerAddWalletPOSTStatusAndText(Constants, {
    address,
    chainType,
    isEVMCompatible,
    walletName,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useConsumerAddWalletPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => consumerAddWalletPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const FetchConsumerAddWalletPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  address,
  chainType,
  isEVMCompatible,
  walletName,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useConsumerAddWalletPOST(
    { address, chainType, isEVMCompatible, walletName },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchConsumerAddWallet: refetch });
};

export const consumerConfirmWalletAddOTPPOSTStatusAndText = (
  Constants,
  { address, otp }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers/wallets/confirm`, {
    body: JSON.stringify({ address: address, otp: otp }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerConfirmWalletAddOTPPOST = (Constants, { address, otp }) =>
  consumerConfirmWalletAddOTPPOSTStatusAndText(Constants, {
    address,
    otp,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useConsumerConfirmWalletAddOTPPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      consumerConfirmWalletAddOTPPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const FetchConsumerConfirmWalletAddOTPPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  address,
  otp,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useConsumerConfirmWalletAddOTPPOST({ address, otp }, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumerConfirmWalletAddOTP: refetch,
  });
};

export const consumerDeleteWalletDELETEStatusAndText = (
  Constants,
  { walletAddress }
) =>
  fetch(
    `https://api-dev.noba.com/v1/consumers/wallets/${walletAddress ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
      method: 'DELETE',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerDeleteWalletDELETE = (Constants, { walletAddress }) =>
  consumerDeleteWalletDELETEStatusAndText(Constants, { walletAddress }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumerDeleteWalletDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => consumerDeleteWalletDELETE(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const consumerGetDataGETStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/consumers`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerGetDataGET = Constants =>
  consumerGetDataGETStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumerGetDataGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['consumer', args],
    () => consumerGetDataGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['consumers']),
    }
  );
};

export const FetchConsumerGetDataGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useConsumerGetDataGET(
    {},
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchConsumerGetData: refetch });
};

export const consumerGetTransactionLimitsGETStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/consumers/limits`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerGetTransactionLimitsGET = Constants =>
  consumerGetTransactionLimitsGETStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumerGetTransactionLimitsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['consumer', args],
    () => consumerGetTransactionLimitsGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['consumers']),
    }
  );
};

export const FetchConsumerGetTransactionLimitsGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useConsumerGetTransactionLimitsGET(
    {},
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumerGetTransactionLimits: refetch,
  });
};

export const consumerPatchDetailsPATCHStatusAndText = (
  Constants,
  {
    city,
    countryCode,
    dateOfBirth,
    firstName,
    lastName,
    postalCode,
    regionCode,
    streetLine1,
    streetLine2,
  }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers`, {
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      address: {
        streetLine1: streetLine1,
        streetLine2: streetLine2,
        countryCode: countryCode,
        city: city,
        regionCode: regionCode,
        postalCode: postalCode,
      },
      dateOfBirth: dateOfBirth,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'PATCH',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerPatchDetailsPATCH = (
  Constants,
  {
    city,
    countryCode,
    dateOfBirth,
    firstName,
    lastName,
    postalCode,
    regionCode,
    streetLine1,
    streetLine2,
  }
) =>
  consumerPatchDetailsPATCHStatusAndText(Constants, {
    city,
    countryCode,
    dateOfBirth,
    firstName,
    lastName,
    postalCode,
    regionCode,
    streetLine1,
    streetLine2,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useConsumerPatchDetailsPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => consumerPatchDetailsPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const consumerPatchPhoneOTPRequestPOSTStatusAndText = (
  Constants,
  { phone }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers/phone/verify`, {
    body: JSON.stringify({ phone: phone }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumerPatchPhoneOTPRequestPOST = (Constants, { phone }) =>
  consumerPatchPhoneOTPRequestPOSTStatusAndText(Constants, { phone }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumerPatchPhoneOTPRequestPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      consumerPatchPhoneOTPRequestPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const FetchConsumerPatchPhoneOTPRequestPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  phone,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useConsumerPatchPhoneOTPRequestPOST({ phone }, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumerPatchPhoneOTPRequest: refetch,
  });
};

export const consumersDeletePaymentMethodDELETEStatusAndText = (
  Constants,
  { paymentToken }
) =>
  fetch(
    `https://api-dev.noba.com/v1/consumers/paymentmethods/${
      paymentToken ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
      method: 'DELETE',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumersDeletePaymentMethodDELETE = (
  Constants,
  { paymentToken }
) =>
  consumersDeletePaymentMethodDELETEStatusAndText(Constants, {
    paymentToken,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useConsumersDeletePaymentMethodDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      consumersDeletePaymentMethodDELETE(Constants, {
        ...initialArgs,
        ...args,
      }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const consumersGetBalancesGETStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/consumers/balances`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumersGetBalancesGET = Constants =>
  consumersGetBalancesGETStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumersGetBalancesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['consumer', args],
    () => consumersGetBalancesGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['consumers']),
    }
  );
};

export const FetchConsumersGetBalancesGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useConsumersGetBalancesGET(
    {},
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumersGetBalances: refetch,
  });
};

export const consumersGetPlaidTokenForModalGETStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/consumers/paymentmethods/plaid/token`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumersGetPlaidTokenForModalGET = Constants =>
  consumersGetPlaidTokenForModalGETStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumersGetPlaidTokenForModalGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['consumer', args],
    () => consumersGetPlaidTokenForModalGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['consumers']),
    }
  );
};

export const FetchConsumersGetPlaidTokenForModalGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useConsumersGetPlaidTokenForModalGET({}, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumersGetPlaidTokenForModal: refetch,
  });
};

export const consumersPatchEmailPATCHStatusAndText = (
  Constants,
  { email, otp }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers/email`, {
    body: JSON.stringify({ email: email, otp: otp }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'PATCH',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumersPatchEmailPATCH = (Constants, { email, otp }) =>
  consumersPatchEmailPATCHStatusAndText(Constants, { email, otp }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumersPatchEmailPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => consumersPatchEmailPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const consumersPatchEmailOTPPOSTStatusAndText = (Constants, { email }) =>
  fetch(`https://api-dev.noba.com/v1/consumers/email/verify`, {
    body: JSON.stringify({ email: email }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumersPatchEmailOTPPOST = (Constants, { email }) =>
  consumersPatchEmailOTPPOSTStatusAndText(Constants, { email }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumersPatchEmailOTPPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => consumersPatchEmailOTPPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const FetchConsumersPatchEmailOTPPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useConsumersPatchEmailOTPPOST({ email }, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumersPatchEmailOTP: refetch,
  });
};

export const consumersPatchPhonePATCHStatusAndText = (
  Constants,
  { otp, phone }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers/phone`, {
    body: JSON.stringify({ phone: phone, otp: otp }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'PATCH',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumersPatchPhonePATCH = (Constants, { otp, phone }) =>
  consumersPatchPhonePATCHStatusAndText(Constants, { otp, phone }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumersPatchPhonePATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => consumersPatchPhonePATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const consumersPatchPhoneOTPRequestPOSTStatusAndText = (
  Constants,
  { phone }
) =>
  fetch(`https://api-dev.noba.com/v1/consumers/phone/verify`, {
    body: JSON.stringify({ phone: phone }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const consumersPatchPhoneOTPRequestPOST = (Constants, { phone }) =>
  consumersPatchPhoneOTPRequestPOSTStatusAndText(Constants, { phone }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useConsumersPatchPhoneOTPRequestPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      consumersPatchPhoneOTPRequestPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('consumers', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('consumer');
        queryClient.invalidateQueries('consumers');
      },
    }
  );
};

export const FetchConsumersPatchPhoneOTPRequestPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  phone,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useConsumersPatchPhoneOTPRequestPOST({ phone }, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchConsumersPatchPhoneOTPRequest: refetch,
  });
};

export const healthCheckGETStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/health`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const healthCheckGET = Constants =>
  healthCheckGETStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useHealthCheckGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['health', args], () => healthCheckGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['health']),
  });
};

export const FetchHealthCheckGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useHealthCheckGET(
    {},
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchHealthCheck: refetch });
};

export const transactionsGetConsumersTransactionsGETStatusAndText = (
  Constants,
  { pageOffset }
) =>
  fetch(
    `https://api-dev.noba.com/v1/transactions?pageOffset=${pageOffset ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const transactionsGetConsumersTransactionsGET = (
  Constants,
  { pageOffset }
) =>
  transactionsGetConsumersTransactionsGETStatusAndText(Constants, {
    pageOffset,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useTransactionsGetConsumersTransactionsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['transaction', args],
    () => transactionsGetConsumersTransactionsGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['transactions']),
    }
  );
};

export const FetchTransactionsGetConsumersTransactionsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  pageOffset,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useTransactionsGetConsumersTransactionsGET(
      { pageOffset },
      { refetchInterval }
    );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchTransactionsGetConsumersTransactions: refetch,
  });
};

export const transactionsGetQuoteGETStatusAndText = (
  Constants,
  {
    cryptoCurrencyCode,
    fiatCurrencyCode,
    fixedAmount,
    fixedSide,
    transactionType,
  }
) =>
  fetch(
    `https://api-dev.noba.com/v1/transactions/quote?cryptoCurrencyCode=${
      cryptoCurrencyCode ?? ''
    }&fiatCurrencyCode=${fiatCurrencyCode ?? ''}&fixedAmount=${
      fixedAmount ?? ''
    }&fixedSide=${fixedSide ?? ''}&transactionType=${transactionType ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const transactionsGetQuoteGET = (
  Constants,
  {
    cryptoCurrencyCode,
    fiatCurrencyCode,
    fixedAmount,
    fixedSide,
    transactionType,
  }
) =>
  transactionsGetQuoteGETStatusAndText(Constants, {
    cryptoCurrencyCode,
    fiatCurrencyCode,
    fixedAmount,
    fixedSide,
    transactionType,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useTransactionsGetQuoteGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['transaction', args],
    () => transactionsGetQuoteGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['transactions']),
    }
  );
};

export const FetchTransactionsGetQuoteGET = ({
  children,
  onData = () => {},
  refetchInterval,
  cryptoCurrencyCode,
  fiatCurrencyCode,
  fixedAmount,
  fixedSide,
  transactionType,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useTransactionsGetQuoteGET(
    {
      cryptoCurrencyCode,
      fiatCurrencyCode,
      fixedAmount,
      fixedSide,
      transactionType,
    },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchTransactionsGetQuote: refetch,
  });
};

export const transactionsGetTransactionGETStatusAndText = (
  Constants,
  { transactionID }
) =>
  fetch(`https://api-dev.noba.com/v1/transactions/${transactionID ?? ''}`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const transactionsGetTransactionGET = (Constants, { transactionID }) =>
  transactionsGetTransactionGETStatusAndText(Constants, { transactionID }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useTransactionsGetTransactionGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['transaction', args],
    () => transactionsGetTransactionGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['transactions']),
    }
  );
};

export const FetchTransactionsGetTransactionGET = ({
  children,
  onData = () => {},
  refetchInterval,
  transactionID,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useTransactionsGetTransactionGET(
    { transactionID },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchTransactionsGetTransaction: refetch,
  });
};

export const transactionsSubmitOrderPOSTStatusAndText = (
  Constants,
  {
    destinationWalletAddress,
    fixedSide,
    leg1,
    leg1Amount,
    leg2,
    leg2Amount,
    paymentToken,
    sessionKey,
    type,
  }
) =>
  fetch(
    `https://api-dev.noba.com/v1/transactions?sessionKey=${sessionKey ?? ''}`,
    {
      body: JSON.stringify({
        paymentToken: paymentToken,
        type: type,
        leg1: leg1,
        leg2: leg2,
        leg1Amount: leg1Amount,
        leg2Amount: leg2Amount,
        fixedSide: fixedSide,
        destinationWalletAddress: destinationWalletAddress,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const transactionsSubmitOrderPOST = (
  Constants,
  {
    destinationWalletAddress,
    fixedSide,
    leg1,
    leg1Amount,
    leg2,
    leg2Amount,
    paymentToken,
    sessionKey,
    type,
  }
) =>
  transactionsSubmitOrderPOSTStatusAndText(Constants, {
    destinationWalletAddress,
    fixedSide,
    leg1,
    leg1Amount,
    leg2,
    leg2Amount,
    paymentToken,
    sessionKey,
    type,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useTransactionsSubmitOrderPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => transactionsSubmitOrderPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('transactions', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('transaction');
        queryClient.invalidateQueries('transactions');
      },
    }
  );
};

export const FetchTransactionsSubmitOrderPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  destinationWalletAddress,
  fixedSide,
  leg1,
  leg1Amount,
  leg2,
  leg2Amount,
  paymentToken,
  sessionKey,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useTransactionsSubmitOrderPOST(
    {
      destinationWalletAddress,
      fixedSide,
      leg1,
      leg1Amount,
      leg2,
      leg2Amount,
      paymentToken,
      sessionKey,
      type,
    },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchTransactionsSubmitOrder: refetch,
  });
};

export const verificationCheckServiceGETStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/verify`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const verificationCheckServiceGET = Constants =>
  verificationCheckServiceGETStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useVerificationCheckServiceGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['verification', args],
    () => verificationCheckServiceGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['verifications']),
    }
  );
};

export const FetchVerificationCheckServiceGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useVerificationCheckServiceGET(
    {},
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchVerificationCheckService: refetch,
  });
};

export const verificationCreateNewSessionPOSTStatusAndText = Constants =>
  fetch(`https://api-dev.noba.com/v1/verify/session`, {
    body: JSON.stringify({}),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      'x-noba-api-key': Constants['X_NOBA_API_KEY'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const verificationCreateNewSessionPOST = Constants =>
  verificationCreateNewSessionPOSTStatusAndText(Constants).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useVerificationCreateNewSessionPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      verificationCreateNewSessionPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('verification', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('verification');
        queryClient.invalidateQueries('verifications');
      },
    }
  );
};

export const FetchVerificationCreateNewSessionPOST = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useVerificationCreateNewSessionPOST({}, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchVerificationCreateNewSession: refetch,
  });
};

export const verificationDocumentVerificationWeblinkGETStatusAndText = (
  Constants,
  { requestBack, requestPOA, requestSelfie, sessionKey }
) =>
  fetch(
    `https://api-dev.noba.com/v1/verify/document/url?requestBack=${
      requestBack ?? ''
    }&requestPOA=${requestPOA ?? ''}&requestSelfie=${
      requestSelfie ?? ''
    }&sessionKey=${sessionKey ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const verificationDocumentVerificationWeblinkGET = (
  Constants,
  { requestBack, requestPOA, requestSelfie, sessionKey }
) =>
  verificationDocumentVerificationWeblinkGETStatusAndText(Constants, {
    requestBack,
    requestPOA,
    requestSelfie,
    sessionKey,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useVerificationDocumentVerificationWeblinkGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['verification', args],
    () => verificationDocumentVerificationWeblinkGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['verifications']),
    }
  );
};

export const FetchVerificationDocumentVerificationWeblinkGET = ({
  children,
  onData = () => {},
  refetchInterval,
  requestBack,
  requestPOA,
  requestSelfie,
  sessionKey,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useVerificationDocumentVerificationWeblinkGET(
      { requestBack, requestPOA, requestSelfie, sessionKey },
      { refetchInterval }
    );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchVerificationDocumentVerificationWeblink: refetch,
  });
};

export const verificationVerifyConsumerProvidedInfoPOSTStatusAndText = (
  Constants,
  {
    city,
    countryCode,
    dateOfBirth,
    firstName,
    lastName,
    nationalID,
    phoneNumber,
    postalCode,
    regionCode,
    sessionKey,
    streetLine1,
    streetLine2,
  }
) =>
  fetch(
    `https://api-dev.noba.com/v1/verify/consumerinfo?sessionKey=${
      sessionKey ?? ''
    }`,
    {
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: {
          streetLine1: streetLine1,
          streetLine2: streetLine2,
          countryCode: countryCode,
          city: city,
          regionCode: regionCode,
          postalCode: postalCode,
        },
        nationalID: nationalID,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        'x-noba-api-key': Constants['X_NOBA_API_KEY'],
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const verificationVerifyConsumerProvidedInfoPOST = (
  Constants,
  {
    city,
    countryCode,
    dateOfBirth,
    firstName,
    lastName,
    nationalID,
    phoneNumber,
    postalCode,
    regionCode,
    sessionKey,
    streetLine1,
    streetLine2,
  }
) =>
  verificationVerifyConsumerProvidedInfoPOSTStatusAndText(Constants, {
    city,
    countryCode,
    dateOfBirth,
    firstName,
    lastName,
    nationalID,
    phoneNumber,
    postalCode,
    regionCode,
    sessionKey,
    streetLine1,
    streetLine2,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        [
          'Failed to parse response text as JSON.',
          `Error: ${e.message}`,
          `Text: ${JSON.stringify(text)}`,
        ].join('\n\n')
      );
    }
  });

export const useVerificationVerifyConsumerProvidedInfoPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      verificationVerifyConsumerProvidedInfoPOST(Constants, {
        ...initialArgs,
        ...args,
      }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('verification', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('verification');
        queryClient.invalidateQueries('verifications');
      },
    }
  );
};

export const FetchVerificationVerifyConsumerProvidedInfoPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  city,
  countryCode,
  dateOfBirth,
  firstName,
  lastName,
  nationalID,
  phoneNumber,
  postalCode,
  regionCode,
  sessionKey,
  streetLine1,
  streetLine2,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useVerificationVerifyConsumerProvidedInfoPOST(
    {
      city,
      countryCode,
      dateOfBirth,
      firstName,
      lastName,
      nationalID,
      phoneNumber,
      postalCode,
      regionCode,
      sessionKey,
      streetLine1,
      streetLine2,
    },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchVerificationVerifyConsumerProvidedInfo: refetch,
  });
};
