export const formatDate = (inputDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const parts = inputDate.split("-");
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const formattedDate = `${day} ${months[month - 1]}`;
  return formattedDate;
};
