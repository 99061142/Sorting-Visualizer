import Algorithm from './algorithm';

class BubbleSort extends Algorithm {
    async loop(startIndex) {
        // Move highest number to the right side of the board
        const END = this.boardSize - startIndex - 1;
        for(let i = 0; i < END; i++) {
            // Show the cell that gets moved
            if(i >= 1) { 
                this.next(i-1); 
            }
            await this.selected(i);

            // If the right number is smaller than the current number, swap numbers
            if(this.nextSmallest(i)) { 
                this.swapNumbers(i, i+1);
            }
        }
        this.sorted(END);
    }
    
    async run() {
        await this.clearBoard();

        // For every number in the list
        for(let i = 0; i < this.boardSize; i++) {
            // Move highest number to the right side of the board
            await this.loop(i);
            // Clear board except elements that are already sorted
            this.clearBoardExceptSorted();
        }
    }
}

export default BubbleSort;