// // This import is required if you are defining react components in this module.
// import React, { useState, useEffect} from 'react';

// // Add any other imports you need here. Make sure to add those imports (besides "react"
// // and "react-native") to the Packages section.
// import { Text, View, StyleSheet, Pressable } from 'react-native';

// import * as LocalAuthentication from 'expo-local-authentication';

// // // Check if hardware supports biometrics
// const hasHardwareAsync = async () => {return await LocalAuthentication.hasHardwareAsync()};

// //Authentication

// //Options
// // LocalAuthenticationOptions = {
// //     promptMessage?: string;
// //     cancelLabel?: string;
// //     disableDeviceFallback?: boolean;
// //     fallbackLabel?: string;
// //   }

// const authenticateAsync = async () => {return await LocalAuthentication.authenticateAsync({
//     "cancelLabel":"cancel label",
//     "disableDeviceFallback":false,
//     "fallbackLabel":"fallback label",
//     "promptMessage":"can we use your biometrics?",
//     "requireConfirmation": true,
// })};
// const getEnrolledLevelAsync = async () => {return await LocalAuthentication.getEnrolledLevelAsync()};
// const isEnrolledAsync = async () => {return await LocalAuthentication.isEnrolledAsync()};

// export {hasHardwareAsync as hasHardwareAsync, authenticateAsync as authenticateAsync, getEnrolledLevelAsync as getEnrolledLevelAsync, isEnrolledAsync as isEnrolledAsync};
