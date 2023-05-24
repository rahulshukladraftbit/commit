import React from 'react';

const removeATags = inputString => {
  try {
    return inputString.replaceAll(/<a(.*?)>/g, '').replaceAll(/<\/a>/g, '');
  } catch (error) {
    return;
  }
};

export default removeATags;
