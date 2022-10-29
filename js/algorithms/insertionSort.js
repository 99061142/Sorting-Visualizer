import { UpdateBoardList } from "../classes/updateBoardList.js"

export class InsertionSort extends UpdateBoardList {
    constructor() {
        super();
        this.lastSortedIndex = null;
    }

    async loop(current) {
        // Set current element as "sorted" when left element is smaller 
        if(this.previousSmaller(current)) {
            // Delete the sorted element from the board
            if(this.lastSortedIndex != null) {
                this.standard(this.lastSortedIndex);
            }
            // Set current element to the board as "sorted"
            this.sorted(current);
            this.lastSortedIndex = current;
        }

        // While the left element is smaller than the current element
        while(current > 0 && this.previousSmaller(current)) {
            await this.next(current-1);
            await this.switchHeight(current, current-1);
            current--;
        }
    }

    async run() {
        this.clearBoard();
        this.next(0); // Set first element as "next"

        // For every number in the list
        for(let i = 0; i < this.elementsAmount; i++) {
            await this.loop(i); // Move highest number to the end of the list
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
        await this.fullBoardSorted(); // Set all elements to "sorted"
    }
}