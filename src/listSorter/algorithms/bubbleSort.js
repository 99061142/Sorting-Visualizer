import Algorithm from "./algorithm";

class BubbleSort extends Algorithm {
    loop(startIndex) {
        // Move current number to the right until right number is higher
        const END = this.props.boardSize - startIndex - 1;
        for (let i = 0; i < END; i++) {
            if (this.numbers[i+1] < this.numbers[i]) {
                this.swapNumbers(i, i+1, true);
            }
        }
    }

    async run() {
        for (let i = 0; i < this.props.boardSize; i++) {
            // Move current number to the right until right number is higher
            this.loop(i);
        }
        // Show that the board is sorted
        this.animations.push({ animation: "board-sorted" });

        // Animate the algorithm
        await this.animate();
    }
}

export default BubbleSort;