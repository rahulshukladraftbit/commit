import React from 'react';

const todaysDateFormatted = () => {
  const currentDate = new Date();

  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  dateString = currentDate.toLocaleDateString('en-us', options);
  timeString = currentDate.toLocaleTimeString('en-us');

  // todaysDateFormatted = dateString + " " + timeString
  // console.log(dateString, timeSTring);

  return 'string';
};

export default todaysDateFormatted;
