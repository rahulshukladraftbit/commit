//A function to be used inside other functions for today's date in a nice format
export const TodaysDateFormatted = () => {
  const currentDate = new Date();

  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  dateString = currentDate.toLocaleDateString('en-us', options);
  timeString = currentDate.toLocaleTimeString('en-us');

  todaysDateFormatted = dateString + ' ' + timeString;

  return todaysDateFormatted;
};
