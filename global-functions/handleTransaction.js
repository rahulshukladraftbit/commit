import React from 'react';

const handleTransaction = async (
  Variables,
  setGlobalVariableValue,
  fixedSide,
  destinationWallet,
  paymentToken,
  leg1,
  leg2,
  leg1Amount,
  leg2Amount,
  type,
  sessionKey
) => {
  const url = `${Variables.BASE_URL}/v1/transactions?sessionKey=${sessionKey}`;

  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: Variables.AUTHORIZATION_HEADER,
      'x-noba-api-key': Variables.X_NOBA_API_KEY,
    }),
    body: JSON.stringify({
      fixedSide: fixedSide,
      destinationWalletAddress: destinationWallet,
      leg1: leg1,
      leg2: leg2,
      leg1Amount: leg1Amount,
      leg2Amount: leg2Amount,
      type: type,
      paymentToken: paymentToken,
    }),
  };

  console.log(options.body);

  const transactionResponse = await fetch(url, options).then(response =>
    response.text()
  );

  let transactionJSON;
  try {
    transactionJSON = JSON.parse(transactionResponse);
  } catch (error) {
    transactionJSON = null;
  }

  if (transactionJSON) {
    // console.log(transactionJSON)
    return transactionJSON;
  } else {
    // console.log(JSON.parse(`{"id":"${transactionResponse}"}`))
    return JSON.parse(`{"id":"${transactionResponse}"}`);
  }
};

export default handleTransaction;
