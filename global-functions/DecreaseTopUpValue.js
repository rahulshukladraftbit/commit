import React from 'react';

const DecreaseTopUpValue = topUpValue => {
  if (topUpValue < 1) return topUpValue;
  else return topUpValue - 1;
};

export default DecreaseTopUpValue;
