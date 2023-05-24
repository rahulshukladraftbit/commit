import React from 'react';

const patchConsumer = async (
  Variables,
  setGlobalVariableValue,
  firstName,
  lastName,
  addressLine1,
  addressLine2,
  addressCountryISOCode,
  addressCity,
  addressRegionCode,
  addressPostalCode,
  dateOfBirth
) => {
  const url = `${Variables.BASE_URL}/v1/consumer`;

  if (!addressLine2) {
    const options = {
      method: 'PATCH',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Variables.AUTHORIZATION_HEADER,
        'x-noba-api-key': Variables.X_NOBA_API_KEY,
      }),
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: {
          streetLine1: addressLine1,
          countryCode: addressCountryISOCode,
          city: addressCity,
          regionCode: addressRegionCode,
          postalCode: addressPostalCode,
        },
        dateOfBirth: dateOfBirth,
      }),
    };

    response = await fetch(url, options).then(response => response.json());
    return response;
  } else {
    const options = {
      method: 'PATCH',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Variables.AUTHORIZATION_HEADER,
        'x-noba-api-key': Variables.X_NOBA_API_KEY,
      }),
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: {
          streetLine1: addressLine1,
          streetLine2: addressLine2,
          countryCode: addressCountryISOCode,
          city: addressCity,
          regionCode: addressRegionCode,
          postalCode: addressPostalCode,
        },
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
      }),
    };

    response = await fetch(url, options).then(response => response.json());
    return response;
  }
};

export default patchConsumer;
