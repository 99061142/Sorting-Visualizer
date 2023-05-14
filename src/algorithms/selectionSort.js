import Algorithm from './algorithm';

class SelectionSort extends Algorithm {
    async loop(startIndex) {
        await this.selected(startIndex);

        let lowestNumber = this.getNumber(startIndex);
        let lowestIndex = startIndex;
        for(let i = startIndex+1; i < this.boardSize; i++) {
            const NUMBER = this.getNumber(i);
            if(NUMBER >= lowestNumber) {
                await this.next(i);
                continue
            }
            await this.next(lowestIndex);
            await this.selected(i);
            lowestIndex = i;
            lowestNumber = NUMBER;
        }
        // If the startIndex number (starting point of the search) isn't the same as the lowest number, swap numbers
        if(startIndex !== lowestIndex) {
            this.swapNumbers(startIndex, lowestIndex);
        }
        await this.sorted(startIndex);
    }
    
    async run() {
        await this.clearBoard();

        // For every number in the list
        for(let i = 0; i < this.boardSize; i++) {
            // Move lowest number to the left of the list
            await this.loop(i);
            // Clear board except elements that are already sorted
            this.clearBoardExceptSorted();
        }
    }
}

export default SelectionSort;