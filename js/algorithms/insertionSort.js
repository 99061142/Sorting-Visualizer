import { UpdateBoardList } from "../classes/updateBoardList.js"

export class InsertionSort extends UpdateBoardList {
    constructor() {
        super();
    }

    async smallest(checked) {
        while(checked > 0 && this.previousSmallest(checked)) {
            this.current(checked-1);
            await this.switch(checked, checked-1);
            checked--;
        }
    }

    async run() {
        this.clearBoard();
        this.found(0); // Always set the first element to found

        // For every number in the list
        for(let i = 1; i < this.listSize; i++) {
            await this.smallest(i); // Move highest number to the end of the list
        }
        await this.fullBoardFound(); // Set all elements to found
        return this.dict;
    }
}