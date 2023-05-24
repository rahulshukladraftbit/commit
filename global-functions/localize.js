import React from 'react';

const localize = (Variables, setGlobalVariableValue, input) => {
  setGlobalVariableValue({ key: 'LANGUAGE', value: input });
};

export default localize;
