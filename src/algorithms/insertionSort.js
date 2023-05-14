import Algorithm from './algorithm';

class InsertionSort extends Algorithm {
    constructor() {
        super();
        this.sortedIndex = 1;
    }

    async loop(cellIndex) {   
        this.standard(this.sortedIndex);
        await this.sorted(cellIndex);

        while(cellIndex > 0 && !this.previousSmallest(cellIndex)) {
            this.swapNumbers(cellIndex, cellIndex-1);
            await this.next(cellIndex-1);
            cellIndex--;
        }
    }
    
    async run() {
        await this.clearBoard();

        // For every number in the list
        for(let i = 1; i < this.boardSize; i++) {
            // Move current number to the left until left number is smaller
            await this.loop(i);
            // Clear board except elements that are already sorted
            this.clearBoardExceptSorted();
        }
        // Set all cells to sorted
        await this.setBoardSorted();
    }
}

export default InsertionSort;