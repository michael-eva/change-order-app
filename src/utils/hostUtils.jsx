function tableFormat(index) {
    return index % 2 === 0 ? "table-striped" : "table-striped-grey";
}
const changeStatus = (item) => {
    return item.status === "pending" ? "pending" : "packed"
}

export { tableFormat, changeStatus }

