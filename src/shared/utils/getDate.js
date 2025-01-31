function getDate(dateString) {
  if (dateString === null || dateString === undefined) {
    return null;
  }

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const currentDate = date.getDate();
  const currentDay = date.getDay();

  const currentHour =
    date.getHours() > 12 ? `오후 ${date.getHours() - 12}` : `오전 ${date.getHours()}`;
  const currentMinute = date.getMinutes();

  return { year, month, currentDate, currentDay, currentHour, currentMinute };
}

export { getDate };
