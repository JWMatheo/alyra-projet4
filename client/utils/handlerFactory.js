// Day Left
export const getDayLeft = (endDate) => {
  const today = new Date();
  const endDay = new Date(endDate);

  const difference = today.getHours() - endDay.getHours();

  if (difference === 0) return false;
  if (difference < 0) return 'bid finished';
  return `${difference.toString().slice(1)} day${difference > 1 && 's'} `;
};

export const countdownMidnight = () => {
  const day = new Date();
  const hours = 24 - day.getHours();
  const min = 60 - day.getMinutes();
  const sec = 60 - day.getSeconds();

  // add 0 if min or sec < 10
  const customTime = (params) => {
    if (params < 10) {
      return (params = `0${params}`);
    } else {
      return params;
    }

  };

  return `${hours}:${customTime(min)}:${customTime(sec)}`;
};
