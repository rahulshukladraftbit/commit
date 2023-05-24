import React from 'react';

const validateForm = (
  input1,
  input2,
  input3,
  input4,
  input5,
  input6,
  input7,
  input8
) => {
  //Format boolean array
  inputs = [input1, input2, input3, input4, input5, input6, input7, input8];

  //Filter out any nulls
  const filterInputs = inputs.filter(element => element != null);

  //Is form entirely valid?
  valid = filterInputs.every(element => element === true);

  //console.log(inputs, filterInputs, valid)

  return valid;
};

export default validateForm;
