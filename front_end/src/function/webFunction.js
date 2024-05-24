export function renderDate(date) { //date: new Date()
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const StringToDate = (dateString) => { //dateString: dd-mm-YYYY
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`);
};

export function addLeadingZero(dateString) {
  // Use padStart to add leading zero if necessary
  return dateString.toString().padStart(2, '0');
};

export const statusClassName = (status, label) => { //status: {label: string, className: string}
  const getStatusElement = status.filter(item => item.label === label);
  return getStatusElement[0].className;
};