import Algorithm from "./algorithm";

class InsertionSort extends Algorithm {
    loop(i) {
        // Move current number to the left until left number is smaller
        while (
            i > 0 && 
            this.numbers[i-1] > this.numbers[i]
        ) {
            this.swapNumbers(i, i-1, true);
            i--;
        }
    }

    async run() {
        for (let i = 1; i < this.props.boardSize; i++) {
            // Move current number to the left until left number is smaller
            this.loop(i);
        }
        // Show that the board is sorted
        this.animations.push({ animation: "board-sorted" });

        // Animate the algorithm
        await this.animate();
    }
}

export default InsertionSort;