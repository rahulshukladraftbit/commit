import React from 'react';

const handleSessionKey = async (Variables, setGlobalVariableValue) => {
  const url = `${Variables.BASE_URL}/v1/verify/session`;

  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: Variables.AUTHORIZATION_HEADER,
      'x-noba-api-key': Variables.X_NOBA_API_KEY,
    }),
  };

  if (!Variables.sessionKey) {
    //Get a sessionKey

    //Check if the response is a string (success) or JSON (error)
    const sessionKey = await fetch(url, options).then(response =>
      response.text()
    );

    let sessionKeyJSON;
    try {
      sessionKeyJSON = JSON.parse(sessionKey);
    } catch (error) {
      sessionKeyJSON = null;
    }

    //If it exists, return it. If not, return the string.
    if (sessionKeyJSON) {
      console.log(sessionKeyJSON);
      return sessionKeyJSON;
    } else {
      console.log('New session key: ', sessionKey);
      setGlobalVariableValue({ key: 'sessionKey', value: sessionKey });
    }
  } else {
    console.log('Already got a session key: ', Variables.sessionKey);
  }
};

export default handleSessionKey;
