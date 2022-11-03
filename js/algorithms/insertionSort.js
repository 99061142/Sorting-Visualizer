import { UpdateBoardList } from "../classes/updateBoardList.js"

export class InsertionSort extends UpdateBoardList {
    constructor() {
        super();
        this.lastSortedIndex = null;
    }

    async loop(current) {
        // Set current element as "sorted" when left element is smaller 
        if(!this.previousSmaller(current)) {
            // Delete the last sorted element from the board
            if(this.lastSortedIndex != null) {
                this.standard(this.lastSortedIndex);
            }
            // Set current element as "sorted"
            this.sorted(current);
            this.lastSortedIndex = current;
        }

        // Swap current and left element height if left number is larger
        while(current > 0 && !this.previousSmaller(current)) {
            await this.next(current-1);
            this.swapNumbers(current, current-1);
            current--;
        }
    }

    async run() {
        this.clearBoard();
        this.next(0);

        // For every number in the list
        for(let i = 0; i < this.numbersAmount; i++) {
            await this.loop(i); // Move highest number to the end of the list
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
        await this.fullBoardSorted();
    }
}