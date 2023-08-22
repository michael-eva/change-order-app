//if date is in dd-mmmm/yyyy: will remove the first 2 numbers in the
//year and will remove preceding 0's in the month and day
function formatDate(date) {

    const year = date.split("-")[2].slice(-2)
    const month = parseInt(date.split("-")[1], 10);
    const day = parseInt(date.split("-")[0], 10);
    const formattedDate = `${day}-${month}-${year}`

    return formattedDate
}

export { formatDate }