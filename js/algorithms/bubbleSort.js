import { UpdateBoardList } from "../classes/updateBoardList.js"

export class BubbleSort extends UpdateBoardList {
    constructor(list) {
        super();
        this.list = list;
        this.listCheck = [...list];
    }

    async smallest() {
        // For every number in the list
        for(let i = 0; i < this.listCheck.length; i++) {
            await this.next(i);
            let nextIndex = i + 1;
            let currentNumber = this.list[i];
            let nextNumber = this.list[i + 1];

            // If the current number is smaller than the next number
            if(currentNumber > nextNumber) {
                this.switch(i, currentNumber, nextIndex, nextNumber); // Move current child to next child position
            }
        }
        this.listCheck.pop();
    }

    async run() {
        this.clearBoard();

        // For every number in the list
        for(let i = 0; i < this.list.length; i++) {
            await this.smallest(); // Move highest number to the end of the list
            await this.found(this.listCheck.length); // Set last checked child to found
            this.clearBoardExceptFound(); // Clear board except found childs
        }
        return this.list;
    }
}