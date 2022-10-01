import { UpdateBoardList } from "../classes/updateBoardList.js"

export class BubbleSort extends UpdateBoardList {
    constructor() {
        super();
    }

    async smallest(checked) {
        /*
        Length of numbers minus the checked numbers
        It gets decreased by 1 so that it doesn't check the last number, because it's already the highest number
        */
        let end = this.listSize - checked - 1;

        // Make list lowest to highest
        for(let i = 0; i < end; i++) {
            await this.next(i); 

            if(this.nextSmallest(i)) { 
                // If right element is smaller than current element, switch them and set it as found
                await this.switch(i, i+1); 
            } 
            else {
                // If right element is larger than current element, set it as found
                await this.found(i+1);
            }
        }
    }

    async run() {
        this.clearBoard(); // Clear the whole board before sorting

        for(let i = 0; i < this.listSize; i++) {
            await this.smallest(i); // Move highest number to the end of the list
            this.clearBoardExceptFound(); // Clear board except elements that are already sorted
        }
        await this.fullBoardFound(); // Set all elements to found
        return this.dict;
    }
}