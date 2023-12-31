//if date is in dd-mmmm/yyyy: will remove the first 2 numbers in the
//year and will remove preceding 0's in the month and day
function formatDate(date) {

    const year = date.split("-")[2].slice(-2)
    const month = parseInt(date.split("-")[1], 10);
    const day = parseInt(date.split("-")[0], 10);
    const formattedDate = `${day}-${month}-${year}`

    return formattedDate
}

function formattedDate(date) {
    const selectedDate = date.getDate().toString();
    const selectedMonth = date.getMonth() + 1; // Adding 1 since months are 0-indexed
    const selectedYear = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

    const formattedDateString = `${selectedDate}-${selectedMonth}-${selectedYear}`;
    return formattedDateString
}
function formatDateForDatabase(date) {
    const [year, month, day] = date.split('-');
    const formattedDay = parseInt(day, 10).toString(); // Remove leading zero if present
    const formattedMonth = parseInt(month, 10).toString(); // Remove leading zero if present
    const formattedYear = year.slice(-2); // Get the last two digits of the year

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
}

export { formatDate, formattedDate, formatDateForDatabase }