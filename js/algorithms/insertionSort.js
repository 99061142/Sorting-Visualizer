import { UpdateBoardList } from "../classes/updateBoardList.js"

export class InsertionSort extends UpdateBoardList {
    constructor() {
        super();
    }

    async smallest(current) {
        // While the left element is smaller than the "current" element
        while(current > 0 && this.previousSmallest(current)) {
            // Set element left from current as "next"
            if(current-1 >= 0) { 
                await this.next(current-1); 
            }
            this.current(current); // Set current element as "current"
            await this.switch(current, current-1); // Switch left and right element
            
            // Set element left from current and current element as "found"
            await this.found(current);
            this.found(current-1);
            current--;
        }
    }

    async run() {
        this.clearBoard();
        this.found(0); // Always set the first element to found

        // For every number in the list
        for(let i = 0; i < this.listSize; i++) {
            await this.smallest(i); // Move highest number to the end of the list
        }
        await this.fullBoardFound(); // Set all elements to found
        return this.numbers;
    }
}