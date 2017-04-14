function BasicCard(front, back) {
    if (typeof front === "string") {
        this.front = front;
    } else {
        console.log('Please use a string');

    }
    if (typeof back === "string") {
        this.back = back;
    } else {
        console.log('Please use a string');
    }

}

module.exports = BasicCard;
