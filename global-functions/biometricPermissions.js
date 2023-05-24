import React from 'react';

const biometricPermissions = () => {
  compatibile = LocalAuthentication.hasBiometrics();

  console.log(
    compatible ? 'This device is compatible' : 'This device is not compatible'
  );
  // return (LocalAuthentication.isEnrolledAsync);
  //LocalAuthentication.getEnrolledLevelAsync
  //LocalAuthentication.isEnrolledAsync()
  //LocalAuthentication.hasHardwareAsync()
  //LocalAuthentication.runBiometrics()
};

export default biometricPermissions;
