import Algorithm from "./algorithm";

class SelectionSort extends Algorithm {
    loop(leftIndex) {
        let lowestnumber = this.numbers[leftIndex];
        let lowestIndex = leftIndex;
        for (let i = leftIndex + 1; i < this.props.boardSize; i++) {
            // If the number is equal, or higher than the lowestNumber, continue
            const number = this.numbers[i];
            if(number >= lowestnumber) continue

            // Show the user which number is currently the lowest
            if (lowestIndex !== leftIndex)
                this.animations.push({
                    animation: "set-type",
                    type: '',
                    index: lowestIndex
                });
            this.animations.push({
                animation: "set-type",
                type: "selected",
                index: i
            });
            lowestIndex = i;
            lowestnumber = number;
        }

        // Swap the numbers inside the numbers list, and add the swap to the animations list
        if (leftIndex !== lowestIndex) {
            this.swapNumbers(leftIndex, lowestIndex);
            return true;
        }
        return false
    }

    async run() {
        for (let i = 0; i < this.props.boardSize; i++) {
            // Move lowest number to the left side of the board
            const numbersSwitched = this.loop(i);
            
            // If 2 numbers got switched, clear the selected cell
            if (numbersSwitched)
                this.animations.push({ animation: "clear-selected" })
        }
        // Show that the board is sorted
        this.animations.push({ animation: "board-sorted" });

        // Animate the algorithm
        await this.animate();
    }
}

export default SelectionSort;