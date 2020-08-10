// Shuffle array.
interface Array<T> {
    shuffle(): Array<T>
}

Array.prototype.shuffle = function () {
    let currentIndex = this.length;
    let temp, randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap it with the current element.
        temp = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temp;
    }

    return this
}
