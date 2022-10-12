import { UpdateBoardList } from "../classes/updateBoardList.js";

export class SelectionSort extends UpdateBoardList {
    constructor() {
        super();
        this.smallestNumber = null;
    }

    async smallest(start) {
        for(let i = start; i < this.listSize; i++) {
            await this.next(i);

            if(this.smallestNumber == null || this.number(i) < this.smallestNumber) {
                // If there is an element "smallest" on the board, set it as "next"
                if(this.smallestNumber != null) { 
                    this.setCurrentAsNext();
                }
                // Set the current element as "smallest"
                this.current(i);

                // Set the current number as the smallest number
                this.smallestNumber = this.number(i);
            }
        }
        // Switch "smallest" element with the current element
        await this.switch(start, this.currentIndex);
        
        // Set smallest number to null
        this.smallestNumber = null;

        // Set the current element as "found"
        this.found(start);
    }

    async run() {
        for(let i = 0; i < this.listSize; i++) {
            await this.smallest(i); // Switch current element with smallest element
            this.clearBoardExceptFound(); // Clear board except elements that are already sorted
        }
        return this.numbers;
    }
}