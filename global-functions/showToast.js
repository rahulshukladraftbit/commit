import React from 'react';
import * as GenerateToast from '../custom-files/GenerateToast';

const showToast = (Variables, setGlobalVariableValue, inputText, type) => {
  try {
    clearInterval(Variables.toastIntervalID);
  } catch {}
  setGlobalVariableValue({ key: 'TOAST_VISIBLE', value: false });

  setGlobalVariableValue({ key: 'TOAST_TEXT', value: inputText });
  setGlobalVariableValue({ key: 'TOAST_TYPE', value: type });
  setGlobalVariableValue({ key: 'TOAST_VISIBLE', value: true });
  clearInterval(Variables.toastIntervalID);
};

export default showToast;
