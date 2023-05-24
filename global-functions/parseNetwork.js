import React from 'react';

const parseNetwork = (Variables, ticker, name) => {
  try {
    let cryptoCurrencyName;

    if (!name) {
      const thisCryptoObject = Variables.CRYPTOCURRENCY_LIST.find(
        item => item.ticker === ticker
      );

      cryptoCurrencyName = thisCryptoObject['name'];
    } else {
      cryptoCurrencyName = name;
    }

    const networkNameString = cryptoCurrencyName.split(' ')[0];
    const networkNamePascal =
      networkNameString[0].toUpperCase() + networkNameString.slice(1);
    const network = ticker.toLowerCase().split('.')[1] ?? networkNamePascal;
    switch (network) {
      case 'eth':
      case 'ethereum':
        return 'Ethereum';
      case 'fantom':
      case 'ftm':
        return 'Fantom';
      case 'polygon':
        return 'Polygon';
      case 'moonbeam':
        return 'Moonbeam';
      case 'Avalanche':
        return 'C-Chain';
      case 'btc':
      case 'Bitcoin':
        return 'Mainnet';
      default:
        return network;
    }
  } catch (error) {
    return;
  }
};

export default parseNetwork;
