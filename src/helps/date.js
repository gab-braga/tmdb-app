function formatDate(dateStr = "") {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`
}

function formatHour(time = 0) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`;
}

export { formatDate, formatHour };