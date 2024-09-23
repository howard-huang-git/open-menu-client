function TimestampConverter({ timestamp }) {
    const rawDate = new Date(timestamp)
    let day = rawDate.getDate();
    let month = rawDate.getMonth() + 1;
    let year = rawDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`
    return formattedDate
}

export default TimestampConverter