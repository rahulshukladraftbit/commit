import React from 'react';
import * as showToastFunction from '../custom-files/showToastFunction';

const copyToClipboard = (
  Variables,
  setGlobalVariableValue,
  inputString,
  inputType
) => {
  clipBoard.copyToClipboard(inputString);

  showToastFunction.showToast(
    Variables,
    setGlobalVariableValue,
    `${inputType} succesfully copied to clipboard.`,
    'success'
  );
};

export default copyToClipboard;
