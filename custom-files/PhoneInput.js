import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { PhoneNumberUtil } from 'google-libphonenumber';
import PhoneInput from 'react-native-phone-number-input';

export const PhoneNumberInput = ({
  setPhoneNumberScreen,
  setNumberIsFilled,
  setNumberIsValid,
  setAlertVisible,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const phoneUtil = PhoneNumberUtil.getInstance();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderWidth: 1,
      borderRadius: 100,
      borderColor: '4D7B86',
      height: 60,
    },
    textContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    phoneInput: {
      borderWidth: 0,
      padding: 10,
    },
    phoneInputText: {
      color: '#4D7B86',
      fontSize: 14,
      fontFamily: 'System',
    },
    countryPickerButton: {
      color: '#71EBB5',
    },
    codeText: {
      color: '#4D7B86',
      fontSize: 14,
      fontFamily: 'System',
    },
  });

  isValidNumber = (number, countryCode) => {
    try {
      const parsedNumber = phoneUtil.parse(number, countryCode);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    countryCodeNumber = formattedPhoneNumber.slice(
      formattedPhoneNumber.length - phoneNumber.length
    );
    numberIsValid = isValidNumber(formattedPhoneNumber, countryCode);
    numberIsFilled = phoneNumber.length > 0;
    setPhoneNumberScreen(formattedPhoneNumber);
    setNumberIsFilled(numberIsFilled);
    setNumberIsValid(numberIsValid);
    if (numberIsFilled & !numberIsValid) {
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  }, [formattedPhoneNumber]);

  return (
    <PhoneInput
      style={{ flex: 1 }}
      placeholder="Phone number"
      defaultCode="US"
      containerStyle={styles.container}
      textInputStyle={styles.phoneInputText}
      codeTextStyle={styles.codeText}
      textContainerStyle={styles.textContainer}
      textInputProps={{
        returnKeyType: 'done',
        placeholderTextColor: '#4D7B86',
      }}
      countryPickerButtonStyle={styles.countryPickerButtonStyle}
      layout="first"
      onChangeFormattedText={text => {
        setFormattedPhoneNumber(text);
      }}
      onChangeText={text => {
        setPhoneNumber(text);
      }}
    />
  );
};
