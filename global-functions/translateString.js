import React from 'react';

const translateString = (Variables, string) => {
  // TEMPORARY TO TEST LANGUAGES
  Language.translate.locale = Variables.LANGUAGE;
  return Language.translate.t(string);
};

export default translateString;
