import React from 'react';

const addPaymentMethod = async (
  Variables,
  setGlobalVariableValue,
  name,
  type,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvv,
  achToken,
  imageUri
) => {
  const url = `${Variables.BASE_URL}/v1/consumers/paymentmethods`;

  if (type === 'Card') {
    const options = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Variables.AUTHORIZATION_HEADER,
        'x-noba-api-key': Variables.X_NOBA_API_KEY,
      }),
      body: JSON.stringify({
        name: name,
        type: type,
        cardDetails: {
          cardNumber: String(cardNumber),
          expiryMonth: expiryMonth,
          expiryYear: expiryYear,
          cvv: String(cvv),
        },
        imageUri: imageUri,
      }),
    };

    response = await fetch(url, options).then(response => response.json());
    return response;
  } else if (type === 'ACH') {
    const options = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Variables.AUTHORIZATION_HEADER,
        'x-noba-api-key': Variables.X_NOBA_API_KEY,
      }),
      body: JSON.stringify({
        name: name,
        type: type,
        achDetails: {
          token: String(achToken),
        },
        imageUri: imageUri,
      }),
    };

    response = await fetch(url, options).then(response => response.json());
    return response;
  }
};

export default addPaymentMethod;
