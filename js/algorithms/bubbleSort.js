import { UpdateBoardList } from "../classes/updateBoardList.js"

export class BubbleSort extends UpdateBoardList {
    constructor() {
        super();
    }

    async loop(current) {
        /*
        Length of numbers minus the checked numbers
        It gets decreased by 1 so that it doesn't check the last number, because it's already the highest number
        */
        let end = this.numbersAmount - current - 1;

        // Make list lowest to highest
        for(let i = 0; i < end; i++) {
            await this.next(i); 

            // Switch current and right element height if right number is smaller
            if(this.nextSmallest(i)) { 
                this.swapNumbers(i, i+1); 
            } 
            this.selected(i+1);
        }
        this.sorted(end);
    }

    async run() {
        this.clearBoard(); // Clear the whole board before sorting

        for(let i = 0; i < this.numbersAmount; i++) {
            await this.loop(i); // Move highest number to the end of the list
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
    }
}