function tableFormat(index) {
    return index % 2 === 0 ? "table-striped" : "table-striped-grey";
}
const changeStatus = (item) => {
    return item.status === "pending" ? "pending" : "packed"
}

const numberToDollar = (number) => {

    return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

}


export { tableFormat, changeStatus, numberToDollar }

