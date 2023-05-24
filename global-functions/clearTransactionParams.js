import React from 'react';

const clearTransactionParams = (Variables, setGlobalVariableValue) => {
  setGlobalVariableValue({ key: 'cryptoCurrencyName', value: '' });
  setGlobalVariableValue({ key: 'cryptoCurrencyIcon', value: '' });
  setGlobalVariableValue({ key: 'cryptoCurrencyCode', value: '' });
  setGlobalVariableValue({ key: 'fiatCurrencyCode', value: 'USD' });
  setGlobalVariableValue({ key: 'fixedSide', value: 'fiat' });
  setGlobalVariableValue({ key: 'fixedAmount', value: 50 });
  setGlobalVariableValue({ key: 'paymentMethod', value: '' });
  setGlobalVariableValue({ key: 'destinationWallet', value: '' });
  setGlobalVariableValue({ key: 'isSelfCustody', value: '' });
  setGlobalVariableValue({ key: 'updateInterval', value: true });
  clearInterval(Variables.quoteIntervalID);
};

export default clearTransactionParams;
