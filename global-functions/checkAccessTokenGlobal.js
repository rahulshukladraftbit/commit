import React from 'react';

// A global function to check the validity of the access token.
const checkAccessTokenGlobal = (Variables, setGlobalVariableValue, userId) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  if (userId === undefined) {
    console.log('test');
    setGlobalVariableValue({ key: 'AUTHORIZATION_HEADER', value: '' });
    console.log(Variables.AUTHORIZATION_HEADER);
    //props.navigation.navigate("LoginScreen")
    return;
  } else return;
};

export default checkAccessTokenGlobal;
