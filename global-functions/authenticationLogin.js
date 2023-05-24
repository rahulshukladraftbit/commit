import React from 'react';

const authenticationLogin = async (
  Variables,
  setGlobalVariableValue,
  emailOrPhone,
  autoCreate,
  identityType
) => {
  const url = `${Variables.BASE_URL}/v1/auth/login`;

  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: Variables.AUTHORIZATION_HEADER,
      'x-noba-api-key': Variables.X_NOBA_API_KEY,
    }),
    body: JSON.stringify({
      emailOrPhone: emailOrPhone,
      identityType: identityType,
      autoCreate: autoCreate,
    }),
  };

  //Some of our endpoints return strings, others JSON objects.
  response = await fetch(url, options).then(response => response.text());

  //Try to parse a JSON object
  let responseJSON;
  try {
    responseJSON = JSON.parse(response);
  } catch (error) {
    responseJSON = null;
  }

  //If it exists, return it. If not, return the string.
  if (responseJSON) {
    // console.log(responseJSON)
    return responseJSON;
  } else {
    // console.log(response)
    return response;
  }
};

export default authenticationLogin;
