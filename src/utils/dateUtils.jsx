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

function formatDateToDdMmYy(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
}

export { formatDate, formattedDate, formatDateToDdMmYy }