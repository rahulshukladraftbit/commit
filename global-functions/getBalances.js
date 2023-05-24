import React from 'react';

const getBalances = async (Variables, setGlobalVariableValue) => {
  const url = `${Variables.BASE_URL}/v1/consumers/balances`;

  const options = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: Variables.AUTHORIZATION_HEADER,
      'x-noba-api-key': Variables.X_NOBA_API_KEY,
    }),
  };

  response = await fetch(url, options).then(response => response.json());

  if (!response) {
    setGlobalVariableValue({ key: 'USER_BALANCES', value: [] });
  } else {
    setGlobalVariableValue({ key: 'USER_BALANCES', value: response });
  }
};

export default getBalances;
