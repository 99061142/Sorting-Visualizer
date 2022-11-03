import { UpdateBoardList } from "../classes/updateBoardList.js";

export class SelectionSort extends UpdateBoardList {
    constructor() {
        super();
    }

    async loop(start) {
        let smallestNumber = null;
        let smallestIndex = null;
        let lastSelectedIndex = null;

        for(let i = start; i < this.elementsAmount; i++) {
            await this.next(i);

            if(smallestNumber == null || this.number(i) < smallestNumber) {
                // Remove the last selected element from the board
                if(lastSelectedIndex != null) {
                    this.next(lastSelectedIndex);
                }
                // Set the current element as the selected element
                this.selected(i);
                lastSelectedIndex = i;

                // Save number and element index
                smallestNumber = this.number(i);
                smallestIndex = i;
            }
        }
        // Switch number of current element with smallest element
        this.swapNumbers(start, smallestIndex);
        
        this.sorted(start);
    }

    async run() {
        this.clearBoard(); // Clear the whole board before sorting

        for(let i = 0; i < this.numbersAmount; i++) {
            await this.loop(i); // Switch current element with smallest element
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
    }
}