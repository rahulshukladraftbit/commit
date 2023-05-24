import React from 'react';

const sliceTicker = ticker => {
  return ticker.toUpperCase().split('.')[0];
};

export default sliceTicker;
