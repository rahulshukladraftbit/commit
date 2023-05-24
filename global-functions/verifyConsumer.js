import React from 'react';

const verifyConsumer = async (
  Variables,
  addressLine1,
  addressLine2,
  addressCity,
  addressCountryISOCode,
  addressRegionCode,
  addressPostalCode,
  firstName,
  lastName,
  taxID,
  dateOfBirth,
  phoneNumber,
  sessionKey
) => {
  try {
    const url = `${Variables.BASE_URL}/v1/verify/consumerinfo?sessionKey=${sessionKey}`;

    if (addressCountryISOCode === 'US') {
      const options = {
        method: 'POST',
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
          nationalID: {
            type: 'SocialSecurity',
            number: taxID,
          },
        }),
      };

      response = await fetch(url, options).then(response => response.json());
      return response;
    } else {
      const options = {
        method: 'POST',
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
  } catch (error) {}
};

export default verifyConsumer;
