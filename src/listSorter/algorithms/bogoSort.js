import Algorithm from "./algorithm";

class BogoSort extends Algorithm {
    get boardSorted() {
        // Return if the board is sorted from lowest to highest number
        for (let i = 1; i < this.props.boardSize; i++) {
            if (this.numbers[i] < this.numbers[i-1])
                return false
        }
        return true
    }

    async shuffle() {
        let currentIndex = this.numbers.length;
        while (currentIndex > 0) {
            // Pick a random index and move it to the current index (starting from right side)
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Push the animation to compare 2 numbers with eachother, and the animation to swap them afterwards
            this.animations.push(
                {
                    animation: "comparison",
                    indexes: [currentIndex, randomIndex]
                },
                {
                    animation: "swap-numbers",
                    from: currentIndex, 
                    to: randomIndex
                }
            );
        }

        // Animate the shuffle
        await this.animate();
    }

    async run() {
        while(!this.boardSorted)
            await this.shuffle();

        // Show that the board is sorted
        await this.sortedBoard();
    }
}

export default BogoSort;