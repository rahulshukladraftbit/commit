import React from 'react';

const resetVariables = (Variables, setGlobalVariableValue) => {
  setGlobalVariableValue({ key: 'fixedSide', value: 'fiat' });
  setGlobalVariableValue({ key: 'fixedAmount', value: 50 });
  setGlobalVariableValue({ key: 'updateInterval', value: true });
  setGlobalVariableValue({ key: 'cryptoCurrencyCode', value: 'ETH' });
  setGlobalVariableValue({ key: 'fiatCurrencyCode', value: 'USD' });
  setGlobalVariableValue({ key: 'quoteIntervalID', value: '' });
  setGlobalVariableValue({
    key: 'paymentMethod',
    value:
      '{"name":"string","type":"string","status":"string","achData":{"accountMask":"string","accountType":"string"},"cardData":{"cardType":"string","last4Digits":"string","first6Digits":"string"},"paymentToken":"string"}',
  });
  setGlobalVariableValue({
    key: 'destinationWallet',
    value:
      '{"status":"string","address":"string","chainType":"string","walletName":"string","isEVMCompatible":false}',
  });
  setGlobalVariableValue({
    key: 'cryptoCurrencyIcon',
    value:
      'https://dj61eezhizi5l.cloudfront.net/assets/images/currency-logos/crypto/eth.svg',
  });
  setGlobalVariableValue({ key: 'cryptoCurrencyName', value: 'Ethereum' });
  setGlobalVariableValue({
    key: 'selectedCrypto',
    value:
      '{"name":"Ethereum","type":"Base","ticker":"ETH","iconPath":"https://dj61eezhizi5l.cloudfront.net/assets/images/currency-logos/crypto/eth.svg","provider":"ZeroHash","precision":6}',
  });
  setGlobalVariableValue({ key: 'toastIntervalID', value: '' });
  setGlobalVariableValue({ key: 'orderType', value: 'onramp' });
};

export default resetVariables;
