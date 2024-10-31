function abbreviateMoney(value = 0) {
    const units = ["", "K", "M", "B", "T"];
    let money = Number(value);
    let index = 0;
    const lastIndex = units.length - 1;

    while (money >= 1000 && index < lastIndex) {
        money /= 1000;
        index++;
    }
    return money.toFixed(2) + units[index];
}

export { abbreviateMoney };